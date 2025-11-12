import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../../atoms/icon/sh-icon.js';
import '../../molecules/status-badge/sh-status-badge.js';
import '../../molecules/button/sh-button.js';

/**
 * @element sh-stock-card
 * @summary Carte de stock pour le dashboard avec statut, métriques et actions
 *
 * @description
 * Composant de carte pour afficher un stock global avec :
 * - Nom du stock, catégorie et date de mise à jour
 * - Badge de statut (Optimal, Low, Critical) et badge IA optionnel
 * - Métriques : pourcentage de stock + valeur totale
 * - Barre de statut colorée selon le niveau
 * - Actions : Enregistrer session, Détails, Éditer, Supprimer
 * - Support des thèmes light/dark
 *
 * Utilisé dans le dashboard principal de StockHub V2.
 *
 * @slot - Contenu personnalisé additionnel
 *
 * @fires sh-session-click - Émis au clic sur "Enregistrer session"
 * @fires sh-details-click - Émis au clic sur "Détails"
 * @fires sh-edit-click - Émis au clic sur éditer
 * @fires sh-delete-click - Émis au clic sur supprimer
 *
 * @example
 * ```html
 * <sh-stock-card
 *   name="Acrylique Bleu Cobalt"
 *   category="Peinture"
 *   lastUpdate="il y a 3h"
 *   percentage="65"
 *   quantity="1 tube"
 *   value="€12"
 *   status="optimal"
 * ></sh-stock-card>
 * ```
 */
@customElement('sh-stock-card')
export class ShStockCard extends LitElement {
  static styles = css`
    :host {
      display: block;
      --card-bg: var(--color-neutral-800);
      --card-border: rgba(255, 255, 255, 0.1);
      --card-text: var(--color-neutral-100);
      --card-text-muted: var(--color-neutral-400);
      --status-color: var(--color-success-500);
    }

    :host([data-theme='light']) {
      --card-bg: var(--color-neutral-50);
      --card-border: rgba(0, 0, 0, 0.1);
      --card-text: var(--color-neutral-900);
      --card-text-muted: var(--color-neutral-600);
    }

    /* Status colors */
    :host([status='optimal']) {
      --status-color: var(--color-success-500);
    }

    :host([status='low']) {
      --status-color: var(--color-warning-500);
    }

    :host([status='critical']) {
      --status-color: var(--color-danger-500);
    }

    :host([status='out-of-stock']) {
      --status-color: var(--color-neutral-700);
    }

    :host([status='overstocked']) {
      --status-color: var(--color-info-600);
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
      position: relative;
    }

    .stock-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: var(--status-color);
      opacity: 0;
      transition: opacity 0.2s ease;
      pointer-events: none;
      z-index: -1;
    }

    .stock-card:hover::before {
      opacity: 0.1;
    }

    :host([data-theme='light']) .stock-card:hover::before {
      opacity: 0.15;
    }

    .stock-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    }

    /* Header */
    .header {
      padding: var(--spacing-lg);
      border-bottom: 1px solid var(--card-border);
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);
    }

    .header-top {
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

    .meta {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .last-update,
    .category {
      font-size: var(--font-fontSize-sm);
      color: var(--card-text-muted);
    }

    .category {
      font-weight: var(--font-fontWeight-medium);
    }

    .badges {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs);
      align-items: flex-end;
    }

    .ia-badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 8px;
      background: var(--status-color);
      color: white;
      border-radius: var(--border-radius-sm);
      font-size: var(--font-fontSize-xs);
      font-weight: var(--font-fontWeight-semibold);
    }

    /* Metrics */
    .metrics {
      padding: var(--spacing-lg);
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--spacing-lg);
      flex: 1;
    }

    .metric {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs);
      text-align: center;
    }

    .metric-value {
      font-size: var(--font-fontSize-2xl);
      font-weight: var(--font-fontWeight-bold);
      color: var(--card-text);
      font-variant-numeric: tabular-nums;
    }

    .metric-sublabel {
      font-size: var(--font-fontSize-sm);
      color: var(--card-text-muted);
      margin-top: -4px;
    }

    .metric-label {
      font-size: var(--font-fontSize-xs);
      color: var(--card-text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-weight: var(--font-fontWeight-medium);
    }

    /* Session Button */
    .session-section {
      padding: var(--spacing-md) var(--spacing-lg);
      border-top: 1px solid var(--card-border);
      display: flex;
      justify-content: center;
    }

    /* Actions */
    .actions {
      padding: var(--spacing-md) var(--spacing-lg);
      border-top: 1px solid var(--card-border);
      display: flex;
      gap: var(--spacing-sm);
      justify-content: space-between;
      align-items: center;
    }

    .details-btn {
      flex: 1;
    }

    .icon-actions {
      display: flex;
      gap: var(--spacing-xs);
    }

    /* Loading state */
    :host([loading]) .stock-card {
      opacity: 0.8;
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
        grid-template-columns: 1fr;
      }

      .actions {
        flex-direction: column;
      }

      .details-btn,
      .icon-actions {
        width: 100%;
      }

      .icon-actions {
        justify-content: flex-end;
      }
    }
  `;
  @property() name = '';
  @property() category = '';
  @property({ attribute: 'last-update' }) lastUpdate = '';
  @property() percentage: string | number = '0';
  @property() quantity = '';
  @property() value = '';
  @property({ reflect: true }) status:
    | 'optimal'
    | 'low'
    | 'critical'
    | 'out-of-stock'
    | 'overstocked' = 'optimal';
  @property({ type: Number }) iaCount = 0;
  @property({ type: Boolean }) loading = false;
  @property({ type: String, reflect: true, attribute: 'data-theme' }) theme: 'light' | 'dark' =
    'dark';

  render() {
    return html`
      <div class="stock-card" role="article" aria-label="Carte de stock ${this.name}">
        <!-- Header -->
        <div class="header">
          <div class="header-top">
            <div class="header-info">
              <div class="name">${this.name}</div>
              <div class="meta">
                ${this.lastUpdate ? html`<div class="last-update">${this.lastUpdate}</div>` : ''}
                ${this.category
                  ? html`<div class="category">Catégorie: ${this.category}</div>`
                  : ''}
              </div>
            </div>

            <div class="badges">
              <sh-status-badge status="${this.status}" size="sm"></sh-status-badge>

              ${this.iaCount > 0
                ? html`
                    <div class="ia-badge">
                      <sh-icon name="Sparkles" size="xs"></sh-icon>
                      IA (${this.iaCount})
                    </div>
                  `
                : ''}
            </div>
          </div>
        </div>

        <!-- Metrics -->
        <div class="metrics">
          <div class="metric">
            <div class="metric-value">${this.percentage}%</div>
            ${this.quantity ? html`<div class="metric-sublabel">${this.quantity}</div>` : ''}
            <div class="metric-label">Quantité</div>
          </div>

          <div class="metric">
            <div class="metric-value">${this.value}</div>
            <div class="metric-label">Valeur</div>
          </div>
        </div>

        <!-- Custom content slot -->
        <slot></slot>

        <!-- Session Button -->
        <div class="session-section">
          <sh-button
            variant="ghost"
            size="sm"
            icon-before="Palette"
            @click="${this._handleSession}"
            ?disabled="${this.loading}"
            .ariaLabel="Enregistrer session pour ${this.name}"
            data-theme="${this.theme}"
          >
            Enregistrer session
          </sh-button>
        </div>

        <!-- Actions -->
        <div class="actions">
          <sh-button
            class="details-btn"
            variant="ghost"
            size="sm"
            icon-before="Eye"
            @click="${this._handleDetails}"
            ?disabled="${this.loading}"
            .ariaLabel="Voir les détails de ${this.name}"
            data-theme="${this.theme}"
          >
            Détails
          </sh-button>

          <div class="icon-actions">
            <sh-button
              variant="ghost"
              size="sm"
              icon-only
              icon-before="Edit3"
              @click="${this._handleEdit}"
              ?disabled="${this.loading}"
              .ariaLabel="Éditer ${this.name}"
              data-theme="${this.theme}"
            ></sh-button>

            <sh-button
              variant="ghost"
              size="sm"
              icon-only
              icon-before="Trash2"
              @click="${this._handleDelete}"
              ?disabled="${this.loading}"
              .ariaLabel="Supprimer ${this.name}"
              data-theme="${this.theme}"
            ></sh-button>
          </div>
        </div>
      </div>
    `;
  }

  private _handleSession() {
    this.dispatchEvent(
      new CustomEvent('sh-session-click', {
        bubbles: true,
        composed: true,
        detail: {
          name: this.name,
          status: this.status,
        },
      })
    );
  }

  private _handleDetails() {
    this.dispatchEvent(
      new CustomEvent('sh-details-click', {
        bubbles: true,
        composed: true,
        detail: {
          name: this.name,
          category: this.category,
          status: this.status,
        },
      })
    );
  }

  private _handleEdit() {
    this.dispatchEvent(
      new CustomEvent('sh-edit-click', {
        bubbles: true,
        composed: true,
        detail: {
          name: this.name,
          status: this.status,
        },
      })
    );
  }

  private _handleDelete() {
    this.dispatchEvent(
      new CustomEvent('sh-delete-click', {
        bubbles: true,
        composed: true,
        detail: {
          name: this.name,
          status: this.status,
        },
      })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sh-stock-card': ShStockCard;
  }
}
