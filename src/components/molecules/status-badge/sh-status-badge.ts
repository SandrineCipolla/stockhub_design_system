import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../../../components/atoms/icon/sh-icon.ts';

// 5 Stock statuses aligned with StockHub V2
export type StockStatus = 'optimal' | 'low' | 'critical' | 'out-of-stock' | 'overstocked';

interface StatusConfig {
  label: string;
  icon: string; // Lucide icon name in PascalCase
  variant: 'success' | 'warning' | 'danger' | 'default' | 'info';
  animate: boolean; // pulse animation for critical states
}

const STATUS_CONFIG: Record<StockStatus, StatusConfig> = {
  'optimal': {
    label: 'Optimal',
    icon: 'CheckCircle',
    variant: 'success',
    animate: false
  },
  'low': {
    label: 'Low',
    icon: 'AlertCircle',
    variant: 'warning',
    animate: false
  },
  'critical': {
    label: 'Critical',
    icon: 'AlertTriangle',
    variant: 'danger',
    animate: true // pulse animation
  },
  'out-of-stock': {
    label: 'Out of Stock',
    icon: 'XCircle',
    variant: 'default', // gray
    animate: true // pulse animation
  },
  'overstocked': {
    label: 'Overstocked',
    icon: 'TrendingUp',
    variant: 'info', // blue
    animate: false
  }
};

/**
 * Status badge component for displaying stock status with icons and animations.
 *
 * @element sh-status-badge
 *
 * @example
 * ```html
 * <sh-status-badge status="optimal"></sh-status-badge>
 * <sh-status-badge status="critical" size="lg"></sh-status-badge>
 * <sh-status-badge status="low" label="Custom Label"></sh-status-badge>
 * ```
 */
@customElement('sh-status-badge')
export class ShStatusBadge extends LitElement {
  /**
   * Stock status type
   * @type {'optimal' | 'low' | 'critical' | 'out-of-stock' | 'overstocked'}
   * @default 'optimal'
   */
  @property({ type: String }) status: StockStatus = 'optimal';

  /**
   * Size of the badge
   * @type {'sm' | 'md' | 'lg'}
   * @default 'md'
   */
  @property({ type: String }) size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Custom label override
   * @type {string}
   */
  @property({ type: String }) label?: string; // optional override

  static styles = css`
    :host {
      display: inline-flex;
    }

    .status-badge {
      display: inline-flex;
      align-items: center;
      font-weight: 500; /* font-medium */
      border-radius: 9999px; /* rounded-full */
      border: 1px solid;
      line-height: 1;
      white-space: nowrap;
      transition: all 200ms ease;
    }

    /* Sizes - Aligned with StockHub V2 StatusBadge */
    .sm {
      padding: 0.125rem 0.5rem; /* py-0.5 px-2 */
      font-size: 0.75rem; /* text-xs */
      gap: 0.25rem; /* gap-1 */
    }

    .md {
      padding: 0.25rem 0.75rem; /* py-1 px-3 */
      font-size: 0.75rem; /* text-xs */
      gap: 0.375rem; /* gap-1.5 */
    }

    .lg {
      padding: 0.375rem 1rem; /* py-1.5 px-4 */
      font-size: 0.875rem; /* text-sm */
      gap: 0.5rem; /* gap-2 */
    }

    /* Icon sizing based on badge size */
    .sm sh-icon {
      --icon-size: 0.75rem; /* 12px (w-3 h-3) */
    }

    .md sh-icon {
      --icon-size: 1rem; /* 16px (w-4 h-4) */
    }

    .lg sh-icon {
      --icon-size: 1.25rem; /* 20px (w-5 h-5) */
    }

    /* Pulse animation for critical states */
    .animate-pulse {
      animation: pulse 2s ease-in-out infinite;
    }

    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    }

    /* ============================================ */
    /* SUCCESS variant - Emerald / Optimal */
    /* ============================================ */
    .success {
      background: #d1fae5; /* bg-emerald-100 */
      color: #047857; /* text-emerald-700 */
      border-color: #6ee7b7; /* border-emerald-300 */
    }

    :host([data-theme="dark"]) .success {
      background: rgba(16, 185, 129, 0.2); /* bg-emerald-500/20 */
      color: #34d399; /* text-emerald-400 */
      border-color: rgba(16, 185, 129, 0.3); /* border-emerald-500/30 */
    }

    /* ============================================ */
    /* WARNING variant - Amber / Low Stock */
    /* ============================================ */
    .warning {
      background: #fef3c7; /* bg-amber-100 */
      color: #b45309; /* text-amber-700 */
      border-color: #fcd34d; /* border-amber-300 */
    }

    :host([data-theme="dark"]) .warning {
      background: rgba(245, 158, 11, 0.2); /* bg-amber-500/20 */
      color: #fbbf24; /* text-amber-400 */
      border-color: rgba(245, 158, 11, 0.3); /* border-amber-500/30 */
    }

    /* ============================================ */
    /* DANGER variant - Red / Critical */
    /* ============================================ */
    .danger {
      background: #fee2e2; /* bg-red-100 */
      color: #b91c1c; /* text-red-700 */
      border-color: #fca5a5; /* border-red-300 */
    }

    :host([data-theme="dark"]) .danger {
      background: rgba(239, 68, 68, 0.2); /* bg-red-500/20 */
      color: #f87171; /* text-red-400 */
      border-color: rgba(239, 68, 68, 0.3); /* border-red-500/30 */
    }

    /* ============================================ */
    /* DEFAULT variant - Gray / Out of Stock */
    /* ============================================ */
    .default {
      background: #f3f4f6; /* bg-gray-100 */
      color: #374151; /* text-gray-700 */
      border-color: #d1d5db; /* border-gray-300 */
    }

    :host([data-theme="dark"]) .default {
      background: rgba(107, 114, 128, 0.2); /* bg-gray-500/20 */
      color: #9ca3af; /* text-gray-400 */
      border-color: rgba(107, 114, 128, 0.3); /* border-gray-500/30 */
    }

    /* ============================================ */
    /* INFO variant - Blue / Overstocked */
    /* ============================================ */
    .info {
      background: #dbeafe; /* bg-blue-100 */
      color: #1d4ed8; /* text-blue-700 */
      border-color: #93c5fd; /* border-blue-300 */
    }

    :host([data-theme="dark"]) .info {
      background: rgba(59, 130, 246, 0.2); /* bg-blue-500/20 */
      color: #60a5fa; /* text-blue-400 */
      border-color: rgba(59, 130, 246, 0.3); /* border-blue-500/30 */
    }

    /* Accessibility */
    .status-badge {
      role: status;
    }
  `;

  render() {
    const config = STATUS_CONFIG[this.status];
    const displayLabel = this.label || config.label;

    return html`
      <span
        class="status-badge ${config.variant} ${this.size} ${config.animate ? 'animate-pulse' : ''}"
        role="status"
        aria-label="Status: ${displayLabel}"
      >
        <sh-icon
          name="${config.icon}"
          size="${this.size}"
          style="width: var(--icon-size); height: var(--icon-size);"
        ></sh-icon>
        <span>${displayLabel}</span>
      </span>
    `;
  }
}
