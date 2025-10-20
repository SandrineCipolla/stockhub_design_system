import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../../atoms/icon/sh-icon.js';
import '../status-badge/sh-status-badge.js';
import '../button/sh-button.js';

/**
 * @element sh-stock-item-card
 * @summary Carte de produit pour l'inventaire avec statut, métriques et actions
 *
 * @description
 * Composant de carte pour afficher un produit en stock avec :
 * - Barre de statut colorée selon le niveau de stock
 * - Nom du produit et SKU
 * - Badge de statut (En stock, Stock faible, etc.)
 * - Grid de métriques (quantité, valeur, emplacement)
 * - Actions : Voir/Éditer/Supprimer
 * - Support des thèmes light/dark
 *
 * Inspiré du StockCard de StockHub V2.
 *
 * @slot - Contenu personnalisé additionnel
 *
 * @fires sh-view-click - Émis au clic sur "Voir"
 * @fires sh-edit-click - Émis au clic sur "Éditer"
 * @fires sh-delete-click - Émis au clic sur "Supprimer"
 *
 * @example
 * ```html
 * <sh-stock-item-card
 *   name="Laptop Dell XPS 15"
 *   sku="LAP-001"
 *   quantity="50"
 *   value="€45,000"
 *   location="A-12-3"
 *   status="optimal"
 * ></sh-stock-item-card>
 * ```
 */
@customElement('sh-stock-item-card')
export class ShStockItemCard extends LitElement {
  @property() name = '';
  @property() sku = '';
  @property() quantity: string | number = '0';
  @property() value = '';
  @property() location = '';
  @property() status: 'optimal' | 'low' | 'critical' | 'out-of-stock' | 'overstocked' = 'optimal';
  @property({ type: Boolean }) loading = false;
  @property({ type: String, reflect: true, attribute: 'data-theme' }) theme: 'light' | 'dark' = 'dark';

  static styles = css`
    :host {
      display: block;
      --card-bg: var(--color-neutral-800);
      --card-border: var(--color-neutral-700);
      --card-text: var(--color-neutral-100);
      --card-text-muted: var(--color-neutral-400);
      --status-color: var(--color-success-500);
    }

    :host([data-theme="light"]) {
      --card-bg: rgba(255, 255, 255, 0.8);
      --card-border: var(--color-neutral-200);
      --card-text: var(--color-neutral-900);
      --card-text-muted: var(--color-neutral-600);
    }

    /* Status colors */
    :host([status="optimal"]) {
      --status-color: var(--color-success-500);
    }

    :host([status="low"]) {
      --status-color: var(--color-warning-500);
    }

    :host([status="critical"]) {
      --status-color: var(--color-danger-500);
    }

    :host([status="out-of-stock"]) {
      --status-color: var(--color-neutral-500);
    }

    :host([status="overstocked"]) {
      --status-color: var(--color-primary-500);
    }

    .stock-card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-left: 4px solid var(--status-color);
      border-radius: var(--border-radius-lg);
      overflow: hidden;
      transition: all 0.2s ease;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .stock-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    }

    :host([data-theme="light"]) .stock-card {
      backdrop-filter: blur(10px);
    }

    /* Header */
    .header {
      padding: var(--spacing-lg);
      border-bottom: 1px solid var(--card-border);
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: var(--spacing-md);
    }

    .header-info {
      flex: 1;
      min-width: 0;
    }

    .name {
      font-size: var(--font-fontSize-lg);
      font-weight: var(--font-fontWeight-semibold);
      color: var(--card-text);
      margin-bottom: var(--spacing-xs);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .sku {
      font-size: var(--font-fontSize-sm);
      color: var(--card-text-muted);
      font-family: monospace;
    }

    /* Metrics Grid */
    .metrics {
      padding: var(--spacing-lg);
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: var(--spacing-md);
      flex: 1;
    }

    .metric {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs);
    }

    .metric-value {
      font-size: var(--font-fontSize-xl);
      font-weight: var(--font-fontWeight-bold);
      color: var(--card-text);
      font-variant-numeric: tabular-nums;
    }

    .metric-label {
      font-size: var(--font-fontSize-xs);
      color: var(--card-text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-weight: var(--font-fontWeight-medium);
    }

    /* Actions */
    .actions {
      padding: var(--spacing-md) var(--spacing-lg);
      border-top: 1px solid var(--card-border);
      display: flex;
      gap: var(--spacing-sm);
      justify-content: flex-end;
    }

    .actions sh-button {
      flex-shrink: 0;
    }

    /* Loading state */
    :host([loading]) .stock-card {
      opacity: 0.6;
      pointer-events: none;
    }

    /* Accessibility */
    .stock-card:focus-within {
      outline: 2px solid var(--color-primary-500);
      outline-offset: 2px;
    }

    @media (prefers-reduced-motion: reduce) {
      .stock-card {
        transition: none;
      }
    }

    /* Responsive */
    @media (max-width: 640px) {
      .metrics {
        grid-template-columns: 1fr 1fr;
      }

      .actions {
        flex-direction: column;
      }

      .actions sh-button {
        width: 100%;
      }
    }
  `;


  private _handleView() {
    this.dispatchEvent(new CustomEvent('sh-view-click', {
      bubbles: true,
      composed: true,
      detail: {
        name: this.name,
        sku: this.sku,
        status: this.status
      }
    }));
  }

  private _handleEdit() {
    this.dispatchEvent(new CustomEvent('sh-edit-click', {
      bubbles: true,
      composed: true,
      detail: {
        name: this.name,
        sku: this.sku,
        status: this.status
      }
    }));
  }

  private _handleDelete() {
    this.dispatchEvent(new CustomEvent('sh-delete-click', {
      bubbles: true,
      composed: true,
      detail: {
        name: this.name,
        sku: this.sku,
        status: this.status
      }
    }));
  }

  render() {
    return html`
      <div class="stock-card" role="article" aria-label="Carte produit ${this.name}">
        <!-- Header -->
        <div class="header">
          <div class="header-info">
            <div class="name">${this.name}</div>
            <div class="sku">${this.sku}</div>
          </div>
          <sh-status-badge
            status="${this.status}"
            size="sm"
          ></sh-status-badge>
        </div>

        <!-- Metrics Grid -->
        <div class="metrics">
          <div class="metric">
            <div class="metric-value">${this.quantity}</div>
            <div class="metric-label">Quantité</div>
          </div>

          ${this.value ? html`
            <div class="metric">
              <div class="metric-value">${this.value}</div>
              <div class="metric-label">Valeur</div>
            </div>
          ` : ''}

          ${this.location ? html`
            <div class="metric">
              <div class="metric-value">${this.location}</div>
              <div class="metric-label">Emplacement</div>
            </div>
          ` : ''}
        </div>

        <!-- Custom content slot -->
        <slot></slot>

        <!-- Actions -->
        <div class="actions">
          <sh-button
            variant="ghost"
            size="sm"
            iconBefore="Eye"
            @click="${this._handleView}"
            ?disabled="${this.loading}"
            aria-label="Voir les détails de ${this.name}"
          >
            Voir
          </sh-button>

          <sh-button
            variant="ghost"
            size="sm"
            iconBefore="Edit"
            @click="${this._handleEdit}"
            ?disabled="${this.loading}"
            aria-label="Éditer ${this.name}"
          >
            Éditer
          </sh-button>

          <sh-button
            variant="ghost"
            size="sm"
            iconBefore="Trash2"
            @click="${this._handleDelete}"
            ?disabled="${this.loading}"
            aria-label="Supprimer ${this.name}"
          >
            Supprimer
          </sh-button>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sh-stock-item-card': ShStockItemCard;
  }
}
