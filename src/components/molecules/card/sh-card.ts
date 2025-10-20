import {css, html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';

/**
 * Card component with glassmorphism effect, customizable padding, and interactive states.
 *
 * @element sh-card
 *
 * @slot - Main card content
 * @slot header - Optional header content
 * @slot footer - Optional footer content
 *
 * @fires sh-card-click - Fired when clickable card is clicked
 *
 * @example
 * ```html
 * <sh-card padding="md">
 *   <div slot="header">Header</div>
 *   Card content
 * </sh-card>
 * <sh-card clickable>Clickable card</sh-card>
 * ```
 */
@customElement('sh-card')
export class ShCard extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .card {
      backdrop-filter: blur(8px);
      border: 1px solid;
      border-radius: var(--border-radius-xl);
      transition: all var(--transition-duration-normal) var(--transition-timing-ease);
      position: relative;
    }

    /* Padding */
    .padding-none {
      padding: 0;
    }

    .padding-sm {
      padding: var(--component-card-padding-sm);
    }

    .padding-md {
      padding: var(--component-card-padding-md);
    }

    .padding-lg {
      padding: var(--component-card-padding-lg);
    }

    /* Light mode */
    .card {
      background: rgba(255, 255, 255, 0.8);
      border-color: rgba(0, 0, 0, 0.1);
      box-shadow: var(--shadow-sm);
    }

    /* Dark mode */
    :host([data-theme="dark"]) .card {
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(255, 255, 255, 0.1);
      box-shadow: var(--shadow-dark-sm);
    }

    /* Hover effects */
    .hover:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
      border-color: var(--color-primary-300);
    }

    :host([data-theme="dark"]) .hover:hover {
      box-shadow: var(--shadow-dark-md);
      border-color: var(--color-primary-600);
    }

    /* Clickable */
    .clickable {
      cursor: pointer;
    }

    .clickable:active {
      transform: translateY(0);
    }

    /* Focus */
    .clickable:focus {
      outline: 2px solid var(--color-primary-500);
      outline-offset: 2px;
    }

    /* Slots */
    ::slotted([slot="header"]) {
      margin-bottom: var(--component-card-gap);
    }

    ::slotted([slot="footer"]) {
      margin-top: var(--component-card-gap);
    }
  `;
  /**
   * Enable hover effects
   * @type {boolean}
   * @default true
   */
  @property({ type: Boolean }) hover = true;
  /**
   * Make card clickable
   * @type {boolean}
   * @default false
   */
  @property({ type: Boolean }) clickable = false;
  /**
   * Padding size
   * @type {'none' | 'sm' | 'md' | 'lg'}
   * @default 'md'
   */
  @property({ type: String }) padding: 'none' | 'sm' | 'md' | 'lg' = 'md';

  render() {
    return html`
      <div
        class="card padding-${this.padding} ${this.hover ? 'hover' : ''} ${this.clickable ? 'clickable' : ''}"
        role="${this.clickable ? 'button' : undefined}"
        tabindex="${this.clickable ? '0' : undefined}"
        @click="${this._handleClick}"
        @keydown="${this._handleKeyDown}"
      >
        <slot name="header"></slot>
        <slot></slot>
        <slot name="footer"></slot>
      </div>
    `;
  }

  private _handleClick() {
    if (!this.clickable) return;

    this.dispatchEvent(
      new CustomEvent('sh-card-click', {
        detail: {},
        bubbles: true,
        composed: true,
      })
    );
  }

  private _handleKeyDown(e: KeyboardEvent) {
    if (!this.clickable) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._handleClick();
    }
  }
}
