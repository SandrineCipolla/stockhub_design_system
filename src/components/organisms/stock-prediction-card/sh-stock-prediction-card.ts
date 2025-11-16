import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../../atoms/icon/sh-icon.js';

/**
 * @element sh-stock-prediction-card
 * @summary Carte de prédiction ML pour afficher les ruptures de stock prévues
 *
 * @description
 * Composant de carte pour afficher une prédiction ML de rupture de stock avec :
 * - Nom du stock et niveau de risque (critical, high, medium, low)
 * - Message prédiction (ex: "Rupture prévue dans 5 jours")
 * - Badge de confiance ML (%)
 * - Progress bar niveau de risque avec intervalle confiance
 * - Métriques : consommation moyenne, date rupture, recommandations
 * - Bordure colorée arrondie selon niveau risque
 * - Background coloré au hover uniquement
 * - Support des thèmes light/dark
 *
 * Utilisé dans la page Analytics de StockHub V2.
 *
 * @slot - Contenu personnalisé additionnel
 *
 * @fires sh-stock-prediction-click - Émis au clic sur la carte (si clickable)
 *
 * @example
 * ```html
 * <sh-stock-prediction-card
 *   stock-name="Café Arabica Bio"
 *   risk-level="critical"
 *   days-until-rupture="2"
 *   confidence="92"
 *   daily-consumption-rate="15.5"
 *   current-quantity="31"
 *   show-details="true"
 * ></sh-stock-prediction-card>
 * ```
 */
@customElement('sh-stock-prediction-card')
export class ShStockPredictionCard extends LitElement {
  static styles = css`
    :host {
      display: block;
      --card-bg: var(--color-neutral-50);
      --card-border: rgba(0, 0, 0, 0.1);
      --card-text: var(--color-neutral-900);
      --card-text-muted: var(--color-neutral-600);
      --risk-color: var(--color-success-500);
    }

    :host([data-theme='dark']) {
      --card-bg: var(--color-neutral-800);
      --card-border: rgba(255, 255, 255, 0.1);
      --card-text: var(--color-neutral-100);
      --card-text-muted: var(--color-neutral-400);
    }

    /* Risk level colors */
    :host([risk-level='critical']) {
      --risk-color: var(--color-danger-500);
    }

    :host([risk-level='high']) {
      --risk-color: var(--color-warning-600);
    }

    :host([risk-level='medium']) {
      --risk-color: var(--color-warning-500);
    }

    :host([risk-level='low']) {
      --risk-color: var(--color-success-500);
    }

    .prediction-card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-left: 4px solid var(--risk-color);
      border-radius: var(--border-radius-lg);
      padding: var(--spacing-lg);
      transition: all 0.2s ease;
      position: relative;
      overflow: hidden;
    }

    .prediction-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: var(--risk-color);
      opacity: 0;
      transition: opacity 0.2s ease;
      pointer-events: none;
      z-index: 0;
    }

    .prediction-card:hover::before {
      opacity: 0.05;
    }

    :host([data-theme='dark']) .prediction-card:hover::before {
      opacity: 0.1;
    }

    :host([clickable]) .prediction-card {
      cursor: pointer;
    }

    :host([clickable]) .prediction-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    /* All content above ::before overlay */
    .prediction-card > * {
      position: relative;
      z-index: 1;
    }

    /* Header */
    .header {
      display: flex;
      align-items: start;
      justify-content: space-between;
      gap: var(--spacing-md);
      margin-bottom: var(--spacing-md);
    }

    .header-content {
      flex: 1;
      display: flex;
      align-items: start;
      gap: var(--spacing-sm);
    }

    .icon {
      margin-top: 2px;
    }

    .header-info {
      flex: 1;
    }

    .stock-name {
      font-size: var(--font-fontSize-xs);
      font-weight: var(--font-fontWeight-medium);
      color: var(--card-text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 4px;
    }

    .prediction-message {
      font-size: var(--font-fontSize-sm);
      font-weight: var(--font-fontWeight-semibold);
      color: var(--card-text);
      margin-bottom: 4px;
    }

    .prediction-method {
      font-size: var(--font-fontSize-xs);
      color: var(--card-text-muted);
    }

    .confidence-badge {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px 8px;
      background: var(--risk-color);
      border-radius: var(--border-radius-full);
      font-size: var(--font-fontSize-xs);
      font-weight: var(--font-fontWeight-medium);
      color: white;
      white-space: nowrap;
    }

    /* Ajustements par niveau pour garantir contraste */
    :host([risk-level='critical']) .confidence-badge {
      background: var(--color-danger-600);
      color: white;
    }

    :host([risk-level='high']) .confidence-badge {
      background: var(--color-warning-700);
      color: white;
    }

    :host([risk-level='medium']) .confidence-badge {
      background: var(--color-warning-500);
      color: var(--color-neutral-900);
    }

    :host([risk-level='low']) .confidence-badge {
      background: var(--color-success-500);
      color: var(--color-neutral-900);
    }

    /* Progress bar */
    .progress-section {
      margin-bottom: var(--spacing-md);
    }

    .progress-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--spacing-xs);
    }

    .progress-label {
      font-size: var(--font-fontSize-xs);
      font-weight: var(--font-fontWeight-medium);
      color: var(--card-text);
    }

    .risk-level-label {
      font-size: var(--font-fontSize-xs);
      font-weight: var(--font-fontWeight-semibold);
      color: var(--card-text);
      text-transform: uppercase;
    }

    .progress-bar-container {
      height: 8px;
      background: var(--color-neutral-200);
      border-radius: var(--border-radius-full);
      overflow: hidden;
    }

    :host([data-theme='dark']) .progress-bar-container {
      background: var(--color-neutral-700);
    }

    .progress-bar {
      height: 100%;
      background: var(--risk-color);
      border-radius: var(--border-radius-full);
      transition: width 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    @media (prefers-reduced-motion: reduce) {
      .progress-bar {
        transition: none;
      }
    }

    .confidence-interval {
      display: flex;
      justify-content: space-between;
      margin-top: 4px;
    }

    .interval-label {
      font-size: var(--font-fontSize-xs);
      color: var(--card-text-muted);
    }

    /* Details section */
    .details {
      padding-top: var(--spacing-md);
      border-top: 1px solid var(--card-border);
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);
    }

    .detail-item {
      display: flex;
      align-items: start;
      gap: var(--spacing-xs);
    }

    .detail-icon {
      flex-shrink: 0;
      margin-top: 2px;
    }

    .detail-text {
      flex: 1;
      font-size: var(--font-fontSize-xs);
      color: var(--card-text-muted);
      line-height: 1.5;
    }

    .detail-text .highlight {
      font-weight: var(--font-fontWeight-medium);
      color: var(--card-text);
    }

    /* Recommendation box */
    .recommendation {
      margin-top: var(--spacing-sm);
      padding: var(--spacing-sm);
      background: var(--color-neutral-50);
      border: 1px solid var(--risk-color);
      border-radius: var(--border-radius-md);
    }

    :host([data-theme='dark']) .recommendation {
      background: rgba(255, 255, 255, 0.05);
      border-color: var(--risk-color);
    }

    .recommendation-title {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
      font-size: var(--font-fontSize-xs);
      font-weight: var(--font-fontWeight-semibold);
      color: var(--card-text);
      margin-bottom: 4px;
    }

    .recommendation-text {
      font-size: var(--font-fontSize-xs);
      color: var(--card-text-muted);
      line-height: 1.5;
    }

    /* Hidden state */
    .hidden {
      display: none;
    }

    /* Accessibility */
    .prediction-card:focus-within {
      outline: 2px solid var(--color-primary-500);
      outline-offset: 2px;
    }
  `;

  @property({ attribute: 'stock-name' }) stockName = '';
  @property({ attribute: 'stock-id' }) stockId = '';
  @property({ reflect: true, attribute: 'risk-level' }) riskLevel:
    | 'critical'
    | 'high'
    | 'medium'
    | 'low' = 'low';
  @property({ type: Number, attribute: 'days-until-rupture' }) daysUntilRupture: number | null =
    null;
  @property({ attribute: 'date-of-rupture' }) dateOfRupture = '';
  @property({ type: Number }) confidence = 0;
  @property({ type: Number, attribute: 'daily-consumption-rate' }) dailyConsumptionRate = 0;
  @property({ type: Number, attribute: 'current-quantity' }) currentQuantity = 0;
  @property({ type: Number, attribute: 'days-until-rupture-pessimistic' })
  daysUntilRupturePessimistic: number | null = null;
  @property({ type: Number, attribute: 'days-until-rupture-optimistic' })
  daysUntilRuptureOptimistic: number | null = null;
  @property({ attribute: 'recommended-reorder-date' }) recommendedReorderDate = '';
  @property({ type: Number, attribute: 'recommended-reorder-quantity' })
  recommendedReorderQuantity = 0;
  @property({ type: Boolean, attribute: 'show-details' }) showDetails = true;
  @property({ type: Boolean, reflect: true }) clickable = false;
  @property({ type: String, reflect: true, attribute: 'data-theme' }) theme: 'light' | 'dark' =
    'light';

  private _getRiskPercentage(): number {
    if (this.daysUntilRupture === null) return 0;

    // Critical: 0-3 days = 100-80%
    if (this.daysUntilRupture <= 3) {
      return 100 - this.daysUntilRupture * 6.67;
    }

    // High: 4-7 days = 80-50%
    if (this.daysUntilRupture <= 7) {
      return 80 - (this.daysUntilRupture - 3) * 7.5;
    }

    // Medium: 8-14 days = 50-25%
    if (this.daysUntilRupture <= 14) {
      return 50 - (this.daysUntilRupture - 7) * 3.57;
    }

    // Low: 15+ days = 25-0%
    return Math.max(0, 25 - (this.daysUntilRupture - 14) * 1);
  }

  private _getMessage(): string {
    if (this.daysUntilRupture === null) {
      return 'Aucun risque de rupture détecté';
    }

    if (this.daysUntilRupture === 0) {
      return 'Rupture de stock imminente';
    }

    const plural = this.daysUntilRupture > 1 ? 's' : '';
    return `Rupture prévue dans ${this.daysUntilRupture} jour${plural}`;
  }

  private _getRiskLevelLabel(): string {
    switch (this.riskLevel) {
      case 'critical':
        return 'Critique';
      case 'high':
        return 'Élevé';
      case 'medium':
        return 'Modéré';
      case 'low':
        return 'Faible';
      default:
        return '';
    }
  }

  private _getIconName(): string {
    return this.riskLevel === 'critical' || this.riskLevel === 'high'
      ? 'AlertTriangle'
      : 'TrendingDown';
  }

  private _formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  private _handleClick() {
    if (this.clickable) {
      this.dispatchEvent(
        new CustomEvent('sh-stock-prediction-click', {
          bubbles: true,
          composed: true,
          detail: {
            stockId: this.stockId,
            stockName: this.stockName,
            riskLevel: this.riskLevel,
            daysUntilRupture: this.daysUntilRupture,
          },
        })
      );
    }
  }

  render() {
    const riskPercentage = this._getRiskPercentage();
    const message = this._getMessage();
    const iconName = this._getIconName();
    const riskLabel = this._getRiskLevelLabel();

    return html`
      <div
        class="prediction-card"
        role="article"
        aria-label="Prédiction ML pour ${this.stockName}"
        @click="${this._handleClick}"
      >
        <!-- Header -->
        <div class="header">
          <div class="header-content">
            <div class="icon">
              <sh-icon
                name="${iconName}"
                size="sm"
                style="color: var(--risk-color)"
              ></sh-icon>
            </div>
            <div class="header-info">
              <div class="stock-name">${this.stockName}</div>
              <div class="prediction-message">🤖 IA détecte : ${message}</div>
              <div class="prediction-method">Analyse ML basée sur régression linéaire</div>
            </div>
          </div>

          <div class="confidence-badge">
            <sh-icon name="Info" size="xs"></sh-icon>
            <span>${this.confidence}%</span>
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="progress-section">
          <div class="progress-header">
            <span class="progress-label">Niveau de risque</span>
            <span class="risk-level-label">${riskLabel}</span>
          </div>

          <div class="progress-bar-container">
            <div class="progress-bar" style="width: ${riskPercentage}%"></div>
          </div>

          ${this.daysUntilRupture !== null &&
          this.daysUntilRupturePessimistic !== null &&
          this.daysUntilRuptureOptimistic !== null
            ? html`
                <div class="confidence-interval">
                  <span class="interval-label"
                    >Pessimiste: ${this.daysUntilRupturePessimistic}j</span
                  >
                  <span class="interval-label"
                    >Optimiste: ${this.daysUntilRuptureOptimistic}j</span
                  >
                </div>
              `
            : ''}
        </div>

        <!-- Details Section -->
        ${this.showDetails && this.daysUntilRupture !== null
          ? html`
              <div class="details">
                <!-- Consumption rate -->
                <div class="detail-item">
                  <sh-icon
                    name="TrendingDown"
                    size="xs"
                    class="detail-icon"
                    style="color: var(--card-text-muted)"
                  ></sh-icon>
                  <div class="detail-text">
                    <span class="highlight">Consommation moyenne:</span>
                    ${this.dailyConsumptionRate.toFixed(2)} unités/jour
                  </div>
                </div>

                <!-- Rupture date -->
                ${this.dateOfRupture
                  ? html`
                      <div class="detail-item">
                        <sh-icon
                          name="Clock"
                          size="xs"
                          class="detail-icon"
                          style="color: var(--card-text-muted)"
                        ></sh-icon>
                        <div class="detail-text">
                          <span class="highlight">Date de rupture estimée:</span>
                          ${this._formatDate(this.dateOfRupture)}
                        </div>
                      </div>
                    `
                  : ''}

                <!-- Recommendation -->
                ${this.recommendedReorderDate && this.recommendedReorderQuantity > 0
                  ? html`
                      <div class="recommendation">
                        <div class="recommendation-title">
                          <sh-icon name="Package" size="xs"></sh-icon>
                          Action recommandée
                        </div>
                        <div class="recommendation-text">
                          Commander
                          <span class="highlight">${this.recommendedReorderQuantity} unités</span>
                          avant le
                          <span class="highlight"
                            >${this._formatDate(this.recommendedReorderDate)}</span
                          >
                        </div>
                      </div>
                    `
                  : ''}
              </div>
            `
          : ''}

        <!-- Custom content slot -->
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sh-stock-prediction-card': ShStockPredictionCard;
  }
}
