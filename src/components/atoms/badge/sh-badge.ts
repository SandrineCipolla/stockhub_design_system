import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('sh-badge')
export class ShBadge extends LitElement {
  @property({ type: String }) variant: 'success' | 'warning' | 'danger' | 'info' | 'default' = 'default';
  @property({ type: String }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ type: Boolean }) pill = false;

  static styles = css`
    :host {
      display: inline-flex;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-weight: var(--font-fontWeight-medium);
      line-height: 1;
      white-space: nowrap;
      transition: all var(--transition-duration-fast) var(--transition-timing-ease);
    }

    /* Sizes */
    .sm {
      padding: 0.25rem 0.5rem;
      font-size: var(--font-fontSize-xs);
      gap: 0.25rem;
    }

    .md {
      padding: 0.375rem 0.75rem;
      font-size: var(--font-fontSize-sm);
      gap: 0.375rem;
    }

    .lg {
      padding: 0.5rem 1rem;
      font-size: var(--font-fontSize-base);
      gap: 0.5rem;
    }

    /* Border radius */
    .badge {
      border-radius: var(--border-radius-md);
    }

    .pill {
      border-radius: 9999px;
    }

    /* Variants - Light mode */
    .success {
      background: var(--color-success-100);
      color: var(--color-success-800);
    }

    .warning {
      background: var(--color-warning-100);
      color: var(--color-warning-800);
    }

    .danger {
      background: var(--color-danger-100);
      color: var(--color-danger-800);
    }

    .info {
      background: #dbeafe;
      color: #1e40af;
    }

    .default {
      background: var(--color-neutral-100);
      color: var(--color-neutral-800);
    }

    /* Dark mode */
    :host([data-theme="dark"]) .success {
      background: var(--color-success-900);
      color: var(--color-success-200);
    }

    :host([data-theme="dark"]) .warning {
      background: var(--color-warning-900);
      color: var(--color-warning-200);
    }

    :host([data-theme="dark"]) .danger {
      background: var(--color-danger-900);
      color: var(--color-danger-200);
    }

    :host([data-theme="dark"]) .info {
      background: #1e3a8a;
      color: #bfdbfe;
    }

    :host([data-theme="dark"]) .default {
      background: var(--color-neutral-800);
      color: var(--color-neutral-200);
    }
  `;

  render() {
    return html`
      <span class="badge ${this.variant} ${this.size} ${this.pill ? 'pill' : ''}">
        <slot></slot>
      </span>
    `;
  }
}
