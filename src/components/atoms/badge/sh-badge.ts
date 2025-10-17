import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('sh-badge')
export class ShBadge extends LitElement {
  @property({ type: String }) variant: 'success' | 'warning' | 'danger' | 'info' | 'default' = 'default';
  @property({ type: String }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ type: Boolean }) pill = true; // Default to pill (rounded-full) like StockHub V2

  static styles = css`
    :host {
      display: inline-flex;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-weight: 500; /* font-medium */
      line-height: 1;
      white-space: nowrap;
      border-radius: 9999px; /* rounded-full by default */
      border: 1px solid; /* border */
      transition: all 200ms ease;
    }

    /* Sizes - Aligned with StockHub V2 */
    .sm {
      padding: 0.125rem 0.5rem; /* py-0.5 px-2 */
      font-size: 0.75rem; /* text-xs (12px) */
      gap: 0.25rem; /* gap-1 */
    }

    .md {
      padding: 0.25rem 0.75rem; /* py-1 px-3 */
      font-size: 0.75rem; /* text-xs (12px) */
      gap: 0.375rem; /* gap-1.5 */
    }

    .lg {
      padding: 0.375rem 1rem; /* py-1.5 px-4 */
      font-size: 0.875rem; /* text-sm (14px) */
      gap: 0.5rem; /* gap-2 */
    }

    /* Optional: Allow non-pill badges */
    .badge:not(.pill) {
      border-radius: 0.375rem; /* rounded-md */
    }

    /* ============================================ */
    /* SUCCESS variant - Emerald (Light Mode) */
    /* ============================================ */
    .success {
      background: #d1fae5; /* bg-emerald-100 */
      color: #047857; /* text-emerald-700 */
      border-color: #6ee7b7; /* border-emerald-300 */
    }

    /* SUCCESS variant - Emerald (Dark Mode) */
    :host([data-theme="dark"]) .success {
      background: rgba(16, 185, 129, 0.2); /* bg-emerald-500/20 */
      color: #34d399; /* text-emerald-400 */
      border-color: rgba(16, 185, 129, 0.3); /* border-emerald-500/30 */
    }

    /* ============================================ */
    /* WARNING variant - Amber (Light Mode) */
    /* ============================================ */
    .warning {
      background: #fef3c7; /* bg-amber-100 */
      color: #b45309; /* text-amber-700 */
      border-color: #fcd34d; /* border-amber-300 */
    }

    /* WARNING variant - Amber (Dark Mode) */
    :host([data-theme="dark"]) .warning {
      background: rgba(245, 158, 11, 0.2); /* bg-amber-500/20 */
      color: #fbbf24; /* text-amber-400 */
      border-color: rgba(245, 158, 11, 0.3); /* border-amber-500/30 */
    }

    /* ============================================ */
    /* DANGER variant - Red (Light Mode) */
    /* ============================================ */
    .danger {
      background: #fee2e2; /* bg-red-100 */
      color: #b91c1c; /* text-red-700 */
      border-color: #fca5a5; /* border-red-300 */
    }

    /* DANGER variant - Red (Dark Mode) */
    :host([data-theme="dark"]) .danger {
      background: rgba(239, 68, 68, 0.2); /* bg-red-500/20 */
      color: #f87171; /* text-red-400 */
      border-color: rgba(239, 68, 68, 0.3); /* border-red-500/30 */
    }

    /* ============================================ */
    /* INFO variant - Blue (Light Mode) */
    /* ============================================ */
    .info {
      background: #dbeafe; /* bg-blue-100 */
      color: #1d4ed8; /* text-blue-700 */
      border-color: #93c5fd; /* border-blue-300 */
    }

    /* INFO variant - Blue (Dark Mode) */
    :host([data-theme="dark"]) .info {
      background: rgba(59, 130, 246, 0.2); /* bg-blue-500/20 */
      color: #60a5fa; /* text-blue-400 */
      border-color: rgba(59, 130, 246, 0.3); /* border-blue-500/30 */
    }

    /* ============================================ */
    /* DEFAULT variant - Gray (Light Mode) */
    /* ============================================ */
    .default {
      background: #f3f4f6; /* bg-gray-100 */
      color: #374151; /* text-gray-700 */
      border-color: #d1d5db; /* border-gray-300 */
    }

    /* DEFAULT variant - Gray (Dark Mode) */
    :host([data-theme="dark"]) .default {
      background: rgba(107, 114, 128, 0.2); /* bg-gray-500/20 */
      color: #9ca3af; /* text-gray-400 */
      border-color: rgba(107, 114, 128, 0.3); /* border-gray-500/30 */
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
