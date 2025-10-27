import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../../atoms/icon/sh-icon.js';

export interface IaAlert {
  product: string;
  message: string;
  severity: 'critical' | 'warning' | 'info';
}

/**
 * @element sh-ia-alert-banner
 * @summary Bandeau d'alertes IA pour les stocks nécessitant attention
 *
 * @description
 * Composant d'alerte IA avec :
 * - Icône IA et message principal
 * - Badge de compteur avec niveau de sévérité
 * - Liste déroulante des alertes détaillées
 * - Bouton collapse/expand
 * - Support thèmes light/dark
 *
 * Utilisé dans StockHub V2 pour afficher les suggestions IA.
 *
 * @fires sh-ia-alert-click - Émis lors du clic sur le bandeau
 * @fires sh-ia-alert-item-click - Émis lors du clic sur un item
 *
 * @example
 * ```html
 * <sh-ia-alert-banner
 *   count="5"
 *   severity="critical"
 * ></sh-ia-alert-banner>
 * ```
 */
@customElement('sh-ia-alert-banner')
export class ShIaAlertBanner extends LitElement {
  @property({ type: Number }) count = 0;
  @property() severity: 'critical' | 'warning' | 'info' = 'critical';
  @property() message = 'stocks nécessitent votre attention';
  @property({ type: Array }) alerts: IaAlert[] = [];
  @property({ type: Boolean }) expanded = true;
  @property({ type: String, reflect: true, attribute: 'data-theme' }) theme: 'light' | 'dark' = 'dark';

  static styles = css`
    :host {
      display: block;
    }

    .alert-banner {
      background: rgba(30, 41, 59, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: var(--border-radius-lg);
      overflow: hidden;
      backdrop-filter: blur(8px);
    }

    :host([data-theme="light"]) .alert-banner {
      background: rgba(248, 250, 252, 0.95);
      border-color: var(--color-neutral-200);
    }

    .alert-header {
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
      padding: var(--spacing-md) var(--spacing-lg);
      cursor: pointer;
      transition: background 0.2s ease;
    }

    .alert-header:hover {
      background: rgba(255, 255, 255, 0.02);
    }

    .icon-wrapper {
      background: var(--color-primary-500);
      padding: var(--spacing-sm);
      border-radius: var(--border-radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .alert-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs);
      min-width: 0;
    }

    .alert-title {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      flex: 1;
      min-width: 0;
    }

    .count-badge {
      font-size: var(--font-fontSize-sm);
      font-weight: var(--font-fontWeight-semibold);
      color: var(--color-neutral-100);
    }

    :host([data-theme="light"]) .count-badge {
      color: var(--color-neutral-900);
    }

    .alert-message {
      font-size: var(--font-fontSize-sm);
      color: var(--color-neutral-100);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    :host([data-theme="light"]) .alert-message {
      color: var(--color-neutral-900);
    }

    .badges-row {
      display: flex;
      gap: var(--spacing-xs);
      flex-wrap: wrap;
    }

    .severity-badge {
      display: inline-flex;
      align-items: center;
      padding: 2px 8px;
      border-radius: var(--border-radius-sm);
      font-size: var(--font-fontSize-xs);
      font-weight: var(--font-fontWeight-semibold);
      text-transform: capitalize;
      letter-spacing: 0.02em;
      border: 1px solid;
    }

    .severity-critical {
      background: rgba(239, 68, 68, 0.1);
      color: var(--color-danger-600);
      border-color: rgba(239, 68, 68, 0.3);
    }

    :host([data-theme="dark"]) .severity-critical {
      background: rgba(239, 68, 68, 0.15);
      color: var(--color-danger-400);
      border-color: rgba(239, 68, 68, 0.4);
    }

    .severity-warning {
      background: rgba(245, 158, 11, 0.1);
      color: var(--color-warning-600);
      border-color: rgba(245, 158, 11, 0.3);
    }

    :host([data-theme="dark"]) .severity-warning {
      background: rgba(245, 158, 11, 0.15);
      color: var(--color-warning-400);
      border-color: rgba(245, 158, 11, 0.4);
    }

    .severity-info {
      background: rgba(139, 92, 246, 0.1);
      color: var(--color-primary-600);
      border-color: rgba(139, 92, 246, 0.3);
    }

    :host([data-theme="dark"]) .severity-info {
      background: rgba(139, 92, 246, 0.15);
      color: var(--color-primary-400);
      border-color: rgba(139, 92, 246, 0.4);
    }

    .toggle-button {
      background: none;
      border: none;
      padding: var(--spacing-xs);
      cursor: pointer;
      color: var(--color-neutral-400);
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--border-radius-sm);
      transition: all 0.2s ease;
      flex-shrink: 0;
    }

    :host([data-theme="light"]) .toggle-button {
      color: var(--color-neutral-600);
    }

    .toggle-button:hover {
      background: rgba(255, 255, 255, 0.1);
      color: var(--color-neutral-100);
    }

    :host([data-theme="light"]) .toggle-button:hover {
      color: var(--color-neutral-900);
    }

    .toggle-icon {
      transition: transform 0.2s ease;
    }

    .toggle-icon.collapsed {
      transform: rotate(180deg);
    }

    .alert-details {
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding: var(--spacing-lg);
      animation: slideDown 0.2s ease;
    }

    :host([data-theme="light"]) .alert-details {
      border-top-color: var(--color-neutral-200);
    }

    @keyframes slideDown {
      from {
        opacity: 0;
        max-height: 0;
      }
      to {
        opacity: 1;
        max-height: 500px;
      }
    }

    .details-subtitle {
      font-size: var(--font-fontSize-sm);
      color: var(--color-neutral-400);
      margin-bottom: var(--spacing-md);
    }

    :host([data-theme="light"]) .details-subtitle {
      color: var(--color-neutral-600);
    }

    .alerts-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);
    }

    .alert-item {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      padding: var(--spacing-sm) 0;
      color: var(--color-neutral-100);
      font-size: var(--font-fontSize-sm);
      transition: color 0.2s ease;
      cursor: pointer;
    }

    :host([data-theme="light"]) .alert-item {
      color: var(--color-neutral-900);
    }

    .alert-item:hover {
      color: var(--color-primary-400);
    }

    .alert-item::before {
      content: "•";
      font-size: var(--font-fontSize-lg);
      font-weight: bold;
      flex-shrink: 0;
    }

    .product-name {
      font-weight: var(--font-fontWeight-semibold);
      margin-right: var(--spacing-xs);
    }

    .warning-icon {
      color: var(--color-warning-500);
      flex-shrink: 0;
    }

    @media (max-width: 768px) {
      .alert-header {
        flex-wrap: wrap;
      }

      .alert-message {
        white-space: normal;
      }
    }
  `;

  private _toggleExpanded() {
    this.expanded = !this.expanded;
    this.dispatchEvent(new CustomEvent('sh-ia-alert-toggle', {
      detail: { expanded: this.expanded },
      bubbles: true,
      composed: true
    }));
  }

  private _handleItemClick(alert: IaAlert) {
    this.dispatchEvent(new CustomEvent('sh-ia-alert-item-click', {
      detail: alert,
      bubbles: true,
      composed: true
    }));
  }

  render() {
    const severityLabel = {
      critical: 'Critical',
      warning: 'Warning',
      info: 'Info'
    }[this.severity];

    return html`
      <div class="alert-banner" role="alert" aria-live="polite">
        <div class="alert-header" @click="${this._toggleExpanded}">
          <div class="icon-wrapper">
            <sh-icon name="Sparkles" size="md" style="color: white;"></sh-icon>
          </div>

          <div class="alert-content">
            <div class="alert-title">
              <span class="count-badge">🤖 ${this.count}</span>
              <span class="alert-message">${this.message}</span>
            </div>

            <div class="badges-row">
              <span class="severity-badge severity-${this.severity}">
                ${this.count} ${severityLabel}
              </span>
            </div>
          </div>

          <button
            class="toggle-button"
            @click="${(e: Event) => {
              e.stopPropagation();
              this._toggleExpanded();
            }}"
            aria-label="${this.expanded ? 'Masquer les détails' : 'Afficher les détails'}"
          >
            <sh-icon
              name="ChevronUp"
              size="sm"
              class="toggle-icon ${this.expanded ? '' : 'collapsed'}"
            ></sh-icon>
          </button>
        </div>

        ${this.expanded && this.alerts.length > 0 ? html`
          <div class="alert-details">
            <div class="details-subtitle">
              Suggestions détaillées disponibles dans chaque carte de stock
            </div>

            <ul class="alerts-list">
              ${this.alerts.map(alert => html`
                <li
                  class="alert-item"
                  @click="${() => this._handleItemClick(alert)}"
                >
                  <span class="product-name">${alert.product}</span>
                  <sh-icon name="AlertTriangle" size="xs" class="warning-icon"></sh-icon>
                  <span>${alert.message}</span>
                </li>
              `)}
            </ul>
          </div>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sh-ia-alert-banner': ShIaAlertBanner;
  }
}
