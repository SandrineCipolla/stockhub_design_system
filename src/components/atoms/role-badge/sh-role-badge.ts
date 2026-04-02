import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type StockRole = 'OWNER' | 'EDITOR' | 'VIEWER' | 'VIEWER_CONTRIBUTOR';

const ROLE_CONFIG: Record<StockRole, { label: string; variant: string }> = {
  OWNER: { label: 'Propriétaire', variant: 'info' },
  EDITOR: { label: 'Éditeur', variant: 'success' },
  VIEWER: { label: 'Lecteur', variant: 'default' },
  VIEWER_CONTRIBUTOR: { label: 'Contributeur', variant: 'warning' },
};

/**
 * Badge affichant le rôle d'un collaborateur sur un stock.
 *
 * @element sh-role-badge
 *
 * @example
 * ```html
 * <sh-role-badge role="OWNER"></sh-role-badge>
 * <sh-role-badge role="VIEWER_CONTRIBUTOR" size="sm"></sh-role-badge>
 * ```
 */
@customElement('sh-role-badge')
export class ShRoleBadge extends LitElement {
  /**
   * Rôle à afficher
   * @type {'OWNER' | 'EDITOR' | 'VIEWER' | 'VIEWER_CONTRIBUTOR'}
   */
  @property({ type: String }) role: StockRole = 'VIEWER';

  /**
   * Taille du badge
   * @type {'sm' | 'md' | 'lg'}
   * @default 'md'
   */
  @property({ type: String }) size: 'sm' | 'md' | 'lg' = 'md';

  static styles = css`
    :host {
      display: inline-flex;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;
      line-height: 1;
      white-space: nowrap;
      border-radius: 9999px;
      border: 1px solid;
      transition: all 200ms ease;
    }

    .sm {
      padding: 0.125rem 0.5rem;
      font-size: 0.75rem;
    }

    .md {
      padding: 0.25rem 0.75rem;
      font-size: 0.75rem;
    }

    .lg {
      padding: 0.375rem 1rem;
      font-size: 0.875rem;
    }

    /* OWNER — info (bleu) */
    .info {
      background: #dbeafe;
      color: #1d4ed8;
      border-color: #93c5fd;
    }
    :host([data-theme='dark']) .info {
      background: rgba(59, 130, 246, 0.2);
      color: #60a5fa;
      border-color: rgba(59, 130, 246, 0.3);
    }

    /* EDITOR — success (vert) */
    .success {
      background: #d1fae5;
      color: #047857;
      border-color: #6ee7b7;
    }
    :host([data-theme='dark']) .success {
      background: rgba(16, 185, 129, 0.2);
      color: #34d399;
      border-color: rgba(16, 185, 129, 0.3);
    }

    /* VIEWER — default (gris) */
    .default {
      background: #f3f4f6;
      color: #374151;
      border-color: #d1d5db;
    }
    :host([data-theme='dark']) .default {
      background: rgba(107, 114, 128, 0.2);
      color: #9ca3af;
      border-color: rgba(107, 114, 128, 0.3);
    }

    /* VIEWER_CONTRIBUTOR — warning (amber) */
    .warning {
      background: #fef3c7;
      color: #b45309;
      border-color: #fcd34d;
    }
    :host([data-theme='dark']) .warning {
      background: rgba(245, 158, 11, 0.2);
      color: #fbbf24;
      border-color: rgba(245, 158, 11, 0.3);
    }
  `;

  render() {
    const config = ROLE_CONFIG[this.role] ?? ROLE_CONFIG['VIEWER'];
    return html`
      <span class="badge ${config.variant} ${this.size}">${config.label}</span>
    `;
  }
}
