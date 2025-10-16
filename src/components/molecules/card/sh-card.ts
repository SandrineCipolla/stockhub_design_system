import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('sh-card')
export class ShCard extends LitElement {
  @property({ type: Boolean }) hover = true;
  @property({ type: Boolean }) clickable = false;
  @property({ type: String }) padding: 'none' | 'sm' | 'md' | 'lg' = 'md';

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

  private _handleClick(e: MouseEvent) {
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
      this._handleClick(e as any);
    }
  }
}
