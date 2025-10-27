import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../../atoms/icon/sh-icon.js';

/**
 * Button component with multiple variants, sizes, loading state, and icon support.
 *
 * @element sh-button
 *
 * @slot - Button content (text or other elements)
 *
 * @fires sh-button-click - Fired when button is clicked
 *
 * @example
 * ```html
 * <sh-button variant="primary">Click me</sh-button>
 * <sh-button variant="danger" iconBefore="Trash">Delete</sh-button>
 * <sh-button loading>Loading...</sh-button>
 * ```
 */
@customElement('sh-button')
export class ShButton extends LitElement {
  /**
   * Visual variant of the button
   * @type {'primary' | 'secondary' | 'ghost' | 'danger'}
   * @default 'primary'
   */
  @property({ type: String }) variant: 'primary' | 'secondary' | 'ghost' | 'danger' = 'primary';

  /**
   * Size of the button
   * @type {'sm' | 'md' | 'lg'}
   * @default 'md'
   */
  @property({ type: String }) size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Disable the button
   * @type {boolean}
   * @default false
   */
  @property({ type: Boolean }) disabled = false;

  /**
   * Show loading spinner
   * @type {boolean}
   * @default false
   */
  @property({ type: Boolean }) loading = false;

  /**
   * Icon name to display before content
   * @type {string}
   */
  @property({ type: String, attribute: 'icon-before' }) iconBefore?: string;

  /**
   * Icon name to display after content
   * @type {string}
   */
  @property({ type: String, attribute: 'icon-after' }) iconAfter?: string;

  /**
   * Button type attribute
   * @type {'button' | 'submit' | 'reset'}
   * @default 'button'
   */
  @property({ type: String }) type: 'button' | 'submit' | 'reset' = 'button';

  /**
   * Hide button text on mobile (show only icon)
   * @type {boolean}
   * @default false
   */
  @property({ type: Boolean, attribute: 'hide-text-mobile' }) hideTextMobile = false;

  /**
   * Icon-only mode (no text, just icon)
   * @type {boolean}
   * @default false
   */
  @property({ type: Boolean, attribute: 'icon-only' }) iconOnly = false;

  static styles = css`
    :host {
      display: inline-block;
    }

    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-sm);
      font-family: var(--font-fontFamily-base);
      font-weight: var(--font-fontWeight-medium);
      border: none;
      cursor: pointer;
      transition: all var(--transition-duration-normal) var(--transition-timing-ease);
      border-radius: var(--border-radius-md);
      position: relative;
    }

    /* Sizes */
    .sm {
      padding: var(--component-button-padding-sm);
      font-size: var(--font-fontSize-sm);
      height: var(--component-button-height-sm);
    }

    .md {
      padding: var(--component-button-padding-md);
      font-size: var(--font-fontSize-base);
      height: var(--component-button-height-md);
    }

    .lg {
      padding: var(--component-button-padding-lg);
      font-size: var(--font-fontSize-lg);
      height: var(--component-button-height-lg);
    }

    /* Variants */
    .primary {
      background: var(--color-primary-600);
      color: var(--color-text-on-primary);
    }

    .primary:hover:not(:disabled) {
      background: var(--color-primary-700);
      box-shadow: var(--shadow-purple);
      transform: translateY(-1px);
    }

    .primary:active:not(:disabled) {
      background: var(--color-primary-800);
      transform: translateY(0);
    }

    .secondary {
      background: var(--color-surface-secondary);
      color: var(--color-text-primary);
      border: 1px solid var(--color-neutral-300);
    }

    :host([data-theme="dark"]) .secondary {
      background: var(--color-surface-secondary);
      color: var(--color-text-primary);
      border-color: var(--color-neutral-700);
    }

    .secondary:hover:not(:disabled) {
      background: var(--color-neutral-100);
      border-color: var(--color-primary-500);
    }

    :host([data-theme="dark"]) .secondary:hover:not(:disabled) {
      background: var(--color-neutral-800);
      border-color: var(--color-primary-400);
    }

    .ghost {
      background: transparent;
      color: var(--color-primary-600);
      border: none;
    }

    .ghost:hover:not(:disabled) {
      background: rgba(139, 92, 246, 0.1);
    }

    .ghost:active:not(:disabled) {
      background: rgba(139, 92, 246, 0.2);
    }

    :host([data-theme="dark"]) .ghost {
      color: var(--color-primary-400);
    }

    .danger {
      background: var(--color-danger-600);
      color: var(--color-text-on-primary);
    }

    .danger:hover:not(:disabled) {
      background: var(--color-danger-700);
      box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
      transform: translateY(-1px);
    }

    .danger:active:not(:disabled) {
      background: var(--color-danger-800);
      transform: translateY(0);
    }

    /* States */
    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    button:focus-visible {
      outline: 2px solid var(--color-primary-500);
      outline-offset: 2px;
    }

    /* Loading */
    .loading {
      pointer-events: none;
    }

    .spinner {
      animation: spin 1s linear infinite;
      width: 1em;
      height: 1em;
    }

    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    /* Icon sizing */
    sh-icon {
      font-size: 1.25em;
    }

    /* Icon-only mode */
    :host([icon-only]) .button-text {
      display: none;
    }

    :host([icon-only]) button {
      padding: var(--spacing-sm);
      aspect-ratio: 1;
    }

    /* Responsive text hiding */
    :host([hide-text-mobile]) .button-text {
      display: none;
    }

    @media (min-width: 640px) {
      :host([hide-text-mobile]) .button-text {
        display: inline;
      }
    }

    .button-text {
      display: inline;
    }
  `;

  render() {
    return html`
      <button
        type="${this.type}"
        class="${this.variant} ${this.size} ${this.loading ? 'loading' : ''}"
        ?disabled="${this.disabled || this.loading}"
        @click="${this._handleClick}"
        aria-busy="${this.loading}"
      >
        ${this.loading ? this._renderSpinner() : ''}
        ${!this.loading && this.iconBefore ? html`<sh-icon name="${this.iconBefore}"></sh-icon>` : ''}
        <span class="button-text"><slot></slot></span>
        ${!this.loading && this.iconAfter ? html`<sh-icon name="${this.iconAfter}"></sh-icon>` : ''}
      </button>
    `;
  }

  private _renderSpinner() {
    return html`
      <svg class="spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="12" cy="12" r="10" stroke-width="3" stroke-opacity="0.25" />
        <path
          d="M12 2a10 10 0 0 1 10 10"
          stroke-width="3"
          stroke-linecap="round"
        />
      </svg>
    `;
  }

  private _handleClick(e: Event) {
    if (this.disabled || this.loading) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    this.dispatchEvent(
      new CustomEvent('sh-button-click', {
        detail: {},
        bubbles: true,
        composed: true,
      })
    );
  }
}
