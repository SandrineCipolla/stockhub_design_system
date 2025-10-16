import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type StockStatus = 'in-stock' | 'low-stock' | 'out-of-stock' | 'restock-needed';

interface StatusConfig {
  label: string;
  variant: 'success' | 'warning' | 'danger' | 'info';
  pulse: boolean;
}

const STATUS_CONFIG: Record<StockStatus, StatusConfig> = {
  'in-stock': { label: 'En stock', variant: 'success', pulse: true },
  'low-stock': { label: 'Stock faible', variant: 'warning', pulse: true },
  'out-of-stock': { label: 'Rupture', variant: 'danger', pulse: false },
  'restock-needed': { label: 'À réapprovisionner', variant: 'info', pulse: true },
};

@customElement('sh-status-badge')
export class ShStatusBadge extends LitElement {
  @property({ type: String }) status: StockStatus = 'in-stock';
  @property({ type: Boolean }) showIndicator = true;
  @property({ type: String }) label?: string;

  static styles = css`
    :host {
      display: inline-flex;
    }

    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.375rem 0.75rem;
      font-size: var(--font-fontSize-sm);
      font-weight: var(--font-fontWeight-medium);
      border-radius: 9999px;
      line-height: 1;
      white-space: nowrap;
    }

    /* Indicator (dot) */
    .indicator {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .pulse {
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    }

    /* Variants - Light mode */
    .success {
      background: var(--color-success-100);
      color: var(--color-success-800);
    }

    .success .indicator {
      background: var(--color-success-600);
    }

    .warning {
      background: var(--color-warning-100);
      color: var(--color-warning-800);
    }

    .warning .indicator {
      background: var(--color-warning-600);
    }

    .danger {
      background: var(--color-danger-100);
      color: var(--color-danger-800);
    }

    .danger .indicator {
      background: var(--color-danger-600);
    }

    .info {
      background: #dbeafe;
      color: #1e40af;
    }

    .info .indicator {
      background: #3b82f6;
    }

    /* Dark mode */
    :host([data-theme="dark"]) .success {
      background: var(--color-success-900);
      color: var(--color-success-200);
    }

    :host([data-theme="dark"]) .success .indicator {
      background: var(--color-success-400);
    }

    :host([data-theme="dark"]) .warning {
      background: var(--color-warning-900);
      color: var(--color-warning-200);
    }

    :host([data-theme="dark"]) .warning .indicator {
      background: var(--color-warning-400);
    }

    :host([data-theme="dark"]) .danger {
      background: var(--color-danger-900);
      color: var(--color-danger-200);
    }

    :host([data-theme="dark"]) .danger .indicator {
      background: var(--color-danger-400);
    }

    :host([data-theme="dark"]) .info {
      background: #1e3a8a;
      color: #bfdbfe;
    }

    :host([data-theme="dark"]) .info .indicator {
      background: #60a5fa;
    }
  `;

  render() {
    const config = STATUS_CONFIG[this.status];
    const displayLabel = this.label || config.label;

    return html`
      <span class="status-badge ${config.variant}">
        ${this.showIndicator
          ? html`<span class="indicator ${config.pulse ? 'pulse' : ''}"></span>`
          : ''}
        <span>${displayLabel}</span>
      </span>
    `;
  }
}
