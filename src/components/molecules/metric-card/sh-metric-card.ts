import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
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

  @state()
  private displayValue: string | number = '0';

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
      padding: var(--spacing-md);
      transition: all 0.2s ease;
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);
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
      color: var(--color-success-400);
      background: rgba(16, 185, 129, 0.1);
    }

    .trend.decrease {
      color: var(--color-danger-400);
      background: rgba(239, 68, 68, 0.1);
    }

    :host([data-theme="light"]) .trend.increase {
      color: var(--color-success-700);
    }

    :host([data-theme="light"]) .trend.decrease {
      color: var(--color-danger-700);
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
      font-size: 1.5rem;
      font-weight: var(--font-fontWeight-bold);
      color: var(--card-text);
      line-height: 1.2;
      font-variant-numeric: tabular-nums;
    }

    .label {
      font-size: 0.75rem;
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

  firstUpdated() {
    // Animate only pure numeric values (no symbols/formatting)
    const stringValue = String(this.value);
    const isPureNumeric = /^[0-9,.\s]+$/.test(stringValue);

    if (isPureNumeric) {
      // Remove spaces and handle both comma and dot as decimal separator
      let cleanValue = stringValue.replace(/\s/g, '');

      // Detect if comma is decimal separator (French format: 45250,50)
      // or thousands separator (English format: 45,250.50)
      const hasComma = cleanValue.includes(',');
      const hasDot = cleanValue.includes('.');

      if (hasComma && !hasDot) {
        // French format: replace comma with dot for parseFloat
        cleanValue = cleanValue.replace(',', '.');
      } else if (hasComma && hasDot) {
        // English format: remove comma (thousands separator)
        cleanValue = cleanValue.replace(/,/g, '');
      }

      const numericValue = parseFloat(cleanValue);

      if (!isNaN(numericValue)) {
        // Detect decimal places to preserve formatting
        const decimalPlaces = cleanValue.includes('.') ? cleanValue.split('.')[1]?.length || 0 : 0;
        this.animateValue(0, numericValue, 1000, decimalPlaces);
        return;
      }
    }

    // For formatted values (with symbols), display as-is without animation
    this.displayValue = this.value;
  }

  private animateValue(start: number, end: number, duration: number, decimalPlaces: number = 0) {
    const range = end - start;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const currentValue = start + range * progress;

      // Format with appropriate decimal places
      if (decimalPlaces > 0) {
        this.displayValue = currentValue.toFixed(decimalPlaces);
      } else {
        this.displayValue = Math.floor(currentValue);
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Ensure we end with the exact final value
        this.displayValue = decimalPlaces > 0 ? end.toFixed(decimalPlaces) : end;
      }
    };

    requestAnimationFrame(animate);
  }

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
        aria-label="${this.label}: ${this.value}"
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
            <slot>${this.displayValue}</slot>
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
