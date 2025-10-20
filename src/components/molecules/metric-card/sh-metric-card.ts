import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../../atoms/icon/sh-icon.js';

/**
 * @element sh-metric-card
 * @summary Carte métrique avec icône, valeur et indicateur de tendance
 *
 * @description
 * Composant de carte métrique pour afficher des KPIs avec :
 * - Icône Lucide configurable
 * - Grande valeur (animée optionnellement)
 * - Label descriptif
 * - Indicateur de tendance optionnel (hausse/baisse)
 * - Support des variants de couleur
 * - Thème light/dark
 *
 * Inspiré du MetricCard de StockHub V2.
 *
 * @slot - Contenu personnalisé (remplace la valeur par défaut)
 *
 * @fires sh-metric-click - Émis au clic sur la carte (si clickable)
 *
 * @example
 * ```html
 * <sh-metric-card
 *   icon="Package"
 *   label="Total Produits"
 *   value="156"
 *   trend="increase"
 *   trend-value="+12"
 *   variant="success"
 * ></sh-metric-card>
 * ```
 */
@customElement('sh-metric-card')
export class ShMetricCard extends LitElement {
  @property() icon = 'TrendingUp';
  @property() label = '';
  @property() value: string | number = '0';
  @property() variant: 'default' | 'success' | 'warning' | 'danger' | 'info' = 'default';
  @property() trend?: 'increase' | 'decrease';
  @property({ attribute: 'trend-value' }) trendValue?: string;
  @property({ type: Boolean }) clickable = false;
  @property({ type: String, reflect: true, attribute: 'data-theme' }) theme: 'light' | 'dark' = 'dark';

  static styles = css`
    :host {
      display: block;
      --card-bg: var(--color-neutral-800);
      --card-border: var(--color-neutral-700);
      --card-text: var(--color-neutral-100);
      --card-text-muted: var(--color-neutral-400);
      --icon-bg: var(--color-neutral-700);
      --icon-color: var(--color-neutral-300);
    }

    :host([data-theme="light"]) {
      --card-bg: rgba(255, 255, 255, 0.8);
      --card-border: var(--color-neutral-200);
      --card-text: var(--color-neutral-900);
      --card-text-muted: var(--color-neutral-600);
      --icon-bg: var(--color-neutral-100);
      --icon-color: var(--color-neutral-700);
    }

    /* Variant colors */
    :host([variant="success"]) {
      --icon-bg-variant: rgba(16, 185, 129, 0.1);
      --icon-color-variant: var(--color-success-600);
    }

    :host([variant="warning"]) {
      --icon-bg-variant: rgba(245, 158, 11, 0.1);
      --icon-color-variant: var(--color-warning-600);
    }

    :host([variant="danger"]) {
      --icon-bg-variant: rgba(239, 68, 68, 0.1);
      --icon-color-variant: var(--color-danger-600);
    }

    :host([variant="info"]) {
      --icon-bg-variant: rgba(59, 130, 246, 0.1);
      --icon-color-variant: var(--color-primary-600);
    }

    :host([data-theme="light"][variant="success"]) {
      --icon-bg-variant: rgba(16, 185, 129, 0.15);
    }

    :host([data-theme="light"][variant="warning"]) {
      --icon-bg-variant: rgba(245, 158, 11, 0.15);
    }

    :host([data-theme="light"][variant="danger"]) {
      --icon-bg-variant: rgba(239, 68, 68, 0.15);
    }

    :host([data-theme="light"][variant="info"]) {
      --icon-bg-variant: rgba(59, 130, 246, 0.15);
    }

    .metric-card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: var(--border-radius-lg);
      padding: var(--spacing-lg);
      transition: all 0.2s ease;
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);
    }

    :host([clickable]) .metric-card {
      cursor: pointer;
    }

    :host([clickable]) .metric-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    }

    :host([data-theme="light"]) .metric-card {
      backdrop-filter: blur(10px);
    }

    /* Header avec icône et tendance */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    .icon-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      border-radius: var(--border-radius-md);
      background: var(--icon-bg-variant, var(--icon-bg));
      transition: transform 0.2s ease;
    }

    :host([clickable]) .metric-card:hover .icon-wrapper {
      transform: scale(1.05);
    }

    /* Icon color matches variant color (like StockHub V2) */
    .icon-wrapper sh-icon {
      color: var(--icon-color-variant, var(--icon-color));
    }

    :host([variant="success"]) .icon-wrapper sh-icon {
      color: var(--color-success-600);
    }

    :host([variant="warning"]) .icon-wrapper sh-icon {
      color: var(--color-warning-600);
    }

    :host([variant="danger"]) .icon-wrapper sh-icon {
      color: var(--color-danger-600);
    }

    :host([variant="info"]) .icon-wrapper sh-icon {
      color: var(--color-primary-600);
    }

    /* Tendance */
    .trend {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: var(--font-fontSize-sm);
      font-weight: var(--font-fontWeight-medium);
      padding: 4px 8px;
      border-radius: var(--border-radius-sm);
    }

    .trend.increase {
      color: var(--color-success-600);
      background: rgba(16, 185, 129, 0.1);
    }

    .trend.decrease {
      color: var(--color-danger-600);
      background: rgba(239, 68, 68, 0.1);
    }

    .trend sh-icon {
      width: 12px;
      height: 12px;
    }

    /* Corps de la carte */
    .body {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs);
      flex: 1;
    }

    .value {
      font-size: 2rem;
      font-weight: var(--font-fontWeight-bold);
      color: var(--card-text);
      line-height: 1.2;
      font-variant-numeric: tabular-nums;
    }

    .label {
      font-size: var(--font-fontSize-sm);
      color: var(--card-text-muted);
      font-weight: var(--font-fontWeight-medium);
    }

    /* Accessibility */
    .metric-card:focus-visible {
      outline: 2px solid var(--color-primary-500);
      outline-offset: 2px;
    }

    @media (prefers-reduced-motion: reduce) {
      .metric-card,
      .icon-wrapper {
        transition: none;
      }
    }
  `;

  private _handleClick() {
    if (this.clickable) {
      this.dispatchEvent(new CustomEvent('sh-metric-click', {
        bubbles: true,
        composed: true,
        detail: {
          icon: this.icon,
          label: this.label,
          value: this.value,
          variant: this.variant
        }
      }));
    }
  }

  private _handleKeyDown(e: KeyboardEvent) {
    if (this.clickable && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      this._handleClick();
    }
  }

  render() {
    return html`
      <div
        class="metric-card"
        role="${this.clickable ? 'button' : 'region'}"
        tabindex="${this.clickable ? '0' : '-1'}"
        aria-label="${this.clickable ? `${this.label}: ${this.value}` : ''}"
        @click="${this._handleClick}"
        @keydown="${this._handleKeyDown}"
      >
        <!-- Header: Icône + Tendance -->
        <div class="header">
          <div class="icon-wrapper">
            <sh-icon
              name="${this.icon}"
              size="lg"
              aria-hidden="true"
            ></sh-icon>
          </div>

          ${this.trend && this.trendValue ? html`
            <div class="trend ${this.trend}" role="status" aria-label="${this.trend === 'increase' ? 'En hausse' : 'En baisse'} de ${this.trendValue}">
              <sh-icon
                name="${this.trend === 'increase' ? 'TrendingUp' : 'TrendingDown'}"
                size="xs"
                aria-hidden="true"
              ></sh-icon>
              <span>${this.trendValue}</span>
            </div>
          ` : ''}
        </div>

        <!-- Corps: Valeur + Label -->
        <div class="body">
          <div class="value" aria-live="polite">
            <slot>${this.value}</slot>
          </div>
          <div class="label">${this.label}</div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sh-metric-card': ShMetricCard;
  }
}
