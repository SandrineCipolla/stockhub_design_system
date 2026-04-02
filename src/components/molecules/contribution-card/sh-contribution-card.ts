import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../../atoms/icon/sh-icon.js';

export type ContributionStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

const STATUS_CONFIG: Record<ContributionStatus, { label: string; icon: string; class: string }> = {
  PENDING: { label: 'En attente', icon: 'Clock', class: 'pending' },
  APPROVED: { label: 'Approuvée', icon: 'CheckCircle', class: 'approved' },
  REJECTED: { label: 'Rejetée', icon: 'XCircle', class: 'rejected' },
};

/**
 * Carte affichant une contribution en attente, avec actions approuver/rejeter.
 *
 * @element sh-contribution-card
 *
 * @fires contribution-approve - Émis au clic "Approuver". `detail: { contributionId: string }`
 * @fires contribution-reject  - Émis au clic "Rejeter".  `detail: { contributionId: string }`
 *
 * @example
 * ```html
 * <sh-contribution-card
 *   contribution-id="42"
 *   item-label="Lait"
 *   current-quantity="3"
 *   suggested-quantity="1"
 *   author-email="enfant@family.local"
 *   status="PENDING"
 * ></sh-contribution-card>
 * ```
 */
@customElement('sh-contribution-card')
export class ShContributionCard extends LitElement {
  /** Identifiant de la contribution */
  @property({ type: String, attribute: 'contribution-id' }) contributionId = '';

  /** Nom de l'item concerné */
  @property({ type: String, attribute: 'item-label' }) itemLabel = '';

  /** Quantité actuelle */
  @property({ type: Number, attribute: 'current-quantity' }) currentQuantity = 0;

  /** Quantité suggérée par le contributeur */
  @property({ type: Number, attribute: 'suggested-quantity' }) suggestedQuantity = 0;

  /** Email du contributeur */
  @property({ type: String, attribute: 'author-email' }) authorEmail = '';

  /** Date de création (ISO string) */
  @property({ type: String, attribute: 'created-at' }) createdAt = '';

  /** Statut de la contribution */
  @property({ type: String }) status: ContributionStatus = 'PENDING';

  /** Désactive les actions (ex: pendant le traitement) */
  @property({ type: Boolean }) disabled = false;

  static styles = css`
    :host {
      display: block;
    }

    .card {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 0.75rem;
      padding: 1rem 1.25rem;
      display: flex;
      flex-direction: column;
      gap: 0.875rem;
      transition: border-color 200ms ease;
    }

    .card.pending {
      border-left: 3px solid #f59e0b;
    }

    .card.approved {
      border-left: 3px solid #22c55e;
    }

    .card.rejected {
      border-left: 3px solid #ef4444;
      opacity: 0.7;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 0.5rem;
    }

    .item-label {
      font-size: 0.875rem;
      font-weight: 600;
      color: #e2e8f0;
      margin: 0;
    }

    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      font-size: 0.75rem;
      font-weight: 500;
      padding: 0.125rem 0.5rem;
      border-radius: 9999px;
      border: 1px solid;
      white-space: nowrap;
    }

    .status-badge.pending {
      background: rgba(245, 158, 11, 0.2);
      color: #fbbf24;
      border-color: rgba(245, 158, 11, 0.3);
    }

    .status-badge.approved {
      background: rgba(34, 197, 94, 0.2);
      color: #4ade80;
      border-color: rgba(34, 197, 94, 0.3);
    }

    .status-badge.rejected {
      background: rgba(239, 68, 68, 0.2);
      color: #f87171;
      border-color: rgba(239, 68, 68, 0.3);
    }

    .quantities {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 0.875rem;
    }

    .qty-label {
      color: #64748b;
      font-size: 0.75rem;
    }

    .qty-value {
      color: #e2e8f0;
      font-weight: 600;
    }

    .qty-arrow {
      color: #475569;
    }

    .qty-suggested {
      color: #8b5cf6;
      font-weight: 700;
    }

    .meta {
      font-size: 0.75rem;
      color: #64748b;
      display: flex;
      flex-direction: column;
      gap: 0.125rem;
    }

    .actions {
      display: flex;
      gap: 0.5rem;
      justify-content: flex-end;
    }

    button {
      font-size: 0.8125rem;
      font-weight: 500;
      font-family: inherit;
      border-radius: 0.5rem;
      padding: 0.375rem 0.875rem;
      cursor: pointer;
      transition: all 200ms ease;
      border: 1px solid transparent;
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .btn-reject {
      background: transparent;
      color: #f87171;
      border-color: rgba(239, 68, 68, 0.3);
    }

    .btn-reject:hover:not(:disabled) {
      background: rgba(239, 68, 68, 0.15);
    }

    .btn-approve {
      background: rgba(34, 197, 94, 0.15);
      color: #4ade80;
      border-color: rgba(34, 197, 94, 0.3);
    }

    .btn-approve:hover:not(:disabled) {
      background: rgba(34, 197, 94, 0.25);
    }

    /* Light mode */
    :host([data-theme='light']) .card {
      background: #ffffff;
      border-color: #e2e8f0;
    }
    :host([data-theme='light']) .item-label {
      color: #1e293b;
    }
    :host([data-theme='light']) .qty-value {
      color: #1e293b;
    }
    :host([data-theme='light']) .status-badge.pending {
      background: #fef3c7;
      color: #b45309;
      border-color: #fcd34d;
    }
    :host([data-theme='light']) .status-badge.approved {
      background: #d1fae5;
      color: #047857;
      border-color: #6ee7b7;
    }
    :host([data-theme='light']) .status-badge.rejected {
      background: #fee2e2;
      color: #b91c1c;
      border-color: #fca5a5;
    }
  `;

  private formatDate(iso: string) {
    if (!iso) return '';
    return new Date(iso).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }

  private handleApprove() {
    this.dispatchEvent(
      new CustomEvent('contribution-approve', {
        detail: { contributionId: this.contributionId },
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleReject() {
    this.dispatchEvent(
      new CustomEvent('contribution-reject', {
        detail: { contributionId: this.contributionId },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    const config = STATUS_CONFIG[this.status];
    const isPending = this.status === 'PENDING';

    return html`
      <div class="card ${config.class}">
        <div class="header">
          <p class="item-label">${this.itemLabel}</p>
          <span class="status-badge ${config.class}" role="status">
            <sh-icon name="${config.icon}" style="width: 0.75rem; height: 0.75rem;"></sh-icon>
            ${config.label}
          </span>
        </div>

        <div class="quantities">
          <div>
            <div class="qty-label">Actuel</div>
            <div class="qty-value">${this.currentQuantity}</div>
          </div>
          <span class="qty-arrow">→</span>
          <div>
            <div class="qty-label">Suggéré</div>
            <div class="qty-suggested">${this.suggestedQuantity}</div>
          </div>
        </div>

        <div class="meta">
          <span>Par ${this.authorEmail}</span>
          ${this.createdAt ? html`<span>Le ${this.formatDate(this.createdAt)}</span>` : ''}
        </div>

        ${isPending
          ? html`
              <div class="actions">
                <button class="btn-reject" ?disabled="${this.disabled}" @click="${this.handleReject}">
                  <sh-icon name="X" style="width: 0.875rem; height: 0.875rem;"></sh-icon>
                  Rejeter
                </button>
                <button class="btn-approve" ?disabled="${this.disabled}" @click="${this.handleApprove}">
                  <sh-icon name="Check" style="width: 0.875rem; height: 0.875rem;"></sh-icon>
                  Approuver
                </button>
              </div>
            `
          : ''}
      </div>
    `;
  }
}
