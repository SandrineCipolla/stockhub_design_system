import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * @element sh-stat-card
 * @summary Carte statistique minimaliste pour filtrage interactif
 *
 * @description
 * Composant de carte statistique simple pour afficher des métriques avec état sélectionné.
 * Utilisé principalement pour les filtres dans la page Analytics.
 *
 * Différences avec sh-metric-card :
 * - Plus simple (pas d'icône, pas de tendance)
 * - Layout centré vertical
 * - État sélectionné pour filtrage
 * - Design minimaliste
 *
 * @slot - Contenu personnalisé (remplace la valeur par défaut)
 *
 * @fires sh-stat-click - Émis au clic sur la carte
 *
 * @example
 * ```html
 * <sh-stat-card
 *   value="15"
 *   label="Critique (≤3j)"
 *   risk-level="critical"
 *   selected
 * ></sh-stat-card>
 * ```
 */
@customElement('sh-stat-card')
export class ShStatCard extends LitElement {
  @property() label = '';
  @property() value: string | number = '0';
  @property({ reflect: true, attribute: 'risk-level' }) riskLevel: 'default' | 'critical' | 'high' | 'medium' | 'low' = 'default';
  @property({ type: Boolean, reflect: true }) selected = false;
  @property({ type: String, reflect: true, attribute: 'data-theme' }) theme: 'light' | 'dark' = 'dark';

  static styles = css`
    :host {
      display: block;
      --card-bg: var(--color-neutral-800);
      --card-border: var(--color-neutral-700);
      --card-text: var(--color-neutral-100);
      --card-text-muted: var(--color-neutral-400);
      --card-hover-bg: var(--color-neutral-750);
    }

    :host([data-theme="light"]) {
      --card-bg: rgba(255, 255, 255, 0.9);
      --card-border: var(--color-neutral-200);
      --card-text: var(--color-neutral-900);
      --card-text-muted: var(--color-neutral-600);
      --card-hover-bg: var(--color-neutral-100);
    }

    /* Risk level colors for value text - Dark theme (default) */
    :host([risk-level="critical"]) {
      --value-color: var(--color-danger-400);
    }

    :host([risk-level="high"]) {
      --value-color: var(--color-warning-500);
    }

    :host([risk-level="medium"]) {
      --value-color: var(--color-warning-400);
    }

    :host([risk-level="low"]) {
      --value-color: var(--color-success-400);
    }

    /* Light theme - use darker shades for better contrast */
    :host([data-theme="light"][risk-level="critical"]) {
      --value-color: var(--color-danger-700);
    }

    :host([data-theme="light"][risk-level="high"]) {
      --value-color: var(--color-warning-700);
    }

    :host([data-theme="light"][risk-level="medium"]) {
      --value-color: var(--color-warning-600);
    }

    :host([data-theme="light"][risk-level="low"]) {
      --value-color: var(--color-success-700);
    }

    /* Selected state - always primary purple border */
    :host([selected]) {
      --selected-border: var(--color-primary-500);
      --selected-bg: rgba(139, 92, 246, 0.1);
    }

    .stat-card {
      background: var(--card-bg);
      border: 2px solid var(--card-border);
      border-radius: var(--border-radius-lg);
      padding: var(--spacing-xs) var(--spacing-sm);
      text-align: center;
      cursor: pointer;
      transition: all 0.2s ease;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: var(--spacing-2xs);
      min-height: 72px;
    }

    .stat-card:hover {
      border-color: var(--color-primary-400);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(139, 92, 246, 0.15);
    }

    /* Selected state styling */
    :host([selected]) .stat-card {
      border-color: var(--selected-border);
      background: var(--selected-bg);
      box-shadow: 0 0 0 1px var(--selected-border);
    }

    :host([selected]) .stat-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 0 0 1px var(--selected-border), 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    :host([data-theme="light"]) .stat-card {
      backdrop-filter: blur(10px);
    }

    .value {
      font-size: 1.5rem;
      font-weight: var(--font-fontWeight-bold);
      color: var(--value-color, var(--card-text));
      line-height: 1.2;
      font-variant-numeric: tabular-nums;
    }

    .label {
      font-size: 0.75rem;
      color: var(--card-text-muted);
      font-weight: var(--font-fontWeight-medium);
      line-height: 1.3;
    }

    /* Accessibility */
    .stat-card:focus-visible {
      outline: 2px solid var(--color-primary-500);
      outline-offset: 2px;
    }

    /* Selected indicator for screen readers */
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border-width: 0;
    }

    @media (prefers-reduced-motion: reduce) {
      .stat-card {
        transition: none;
      }

      .stat-card:hover {
        transform: none;
      }
    }
  `;

  private _handleClick() {
    this.dispatchEvent(new CustomEvent('sh-stat-click', {
      bubbles: true,
      composed: true,
      detail: {
        label: this.label,
        value: this.value,
        riskLevel: this.riskLevel,
        selected: this.selected
      }
    }));
  }

  private _handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._handleClick();
    }
  }

  render() {
    return html`
      <div
        class="stat-card"
        role="button"
        tabindex="0"
        aria-label="${this.label}: ${this.value}"
        aria-pressed="${this.selected}"
        @click="${this._handleClick}"
        @keydown="${this._handleKeyDown}"
      >
        ${this.selected ? html`<span class="sr-only">Sélectionné</span>` : ''}

        <div class="value" aria-live="polite">
          <slot>${this.value}</slot>
        </div>
        <div class="label">${this.label}</div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sh-stat-card': ShStatCard;
  }
}
