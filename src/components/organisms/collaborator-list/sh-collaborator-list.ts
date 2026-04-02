import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../../atoms/icon/sh-icon.js';
import '../../atoms/role-badge/sh-role-badge.js';
import '../../molecules/role-selector/sh-role-selector.js';
import type { StockRole } from '../../atoms/role-badge/sh-role-badge.js';

export interface CollaboratorItem {
  id: number;
  userEmail: string;
  role: StockRole;
}

/**
 * Liste des collaborateurs d'un stock avec actions modifier/retirer.
 *
 * @element sh-collaborator-list
 *
 * @fires collaborator-role-change - Émis quand un rôle est modifié. `detail: { collaboratorId: number, role: StockRole }`
 * @fires collaborator-remove - Émis quand un collaborateur est retiré. `detail: { collaboratorId: number }`
 *
 * @example
 * ```html
 * <sh-collaborator-list
 *   collaborators='[{"id":1,"userEmail":"alice@example.com","role":"EDITOR"}]'
 *   viewer-role="OWNER"
 * ></sh-collaborator-list>
 * ```
 */
@customElement('sh-collaborator-list')
export class ShCollaboratorList extends LitElement {
  /**
   * Liste des collaborateurs — accepte un tableau JS ou un JSON stringifié en attribut
   */
  @property({
    converter: {
      fromAttribute: (value: string) => {
        try {
          return JSON.parse(value);
        } catch {
          return [];
        }
      },
    },
  })
  collaborators: CollaboratorItem[] = [];

  /**
   * Rôle de l'utilisateur connecté — détermine les actions disponibles
   * @type {StockRole}
   */
  @property({ type: String, attribute: 'viewer-role' }) viewerRole: StockRole = 'VIEWER';

  /**
   * Désactive toutes les actions
   */
  @property({ type: Boolean }) disabled = false;

  static styles = css`
    :host {
      display: block;
    }

    .list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .empty {
      text-align: center;
      color: #64748b;
      font-size: 0.875rem;
      padding: 2rem 1rem;
      border: 1px dashed #334155;
      border-radius: 0.75rem;
    }

    .collaborator-row {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 0.625rem;
      padding: 0.75rem 1rem;
      transition: border-color 200ms ease;
    }

    .collaborator-row:hover {
      border-color: #475569;
    }

    .avatar {
      width: 2rem;
      height: 2rem;
      border-radius: 9999px;
      background: rgba(139, 92, 246, 0.2);
      border: 1px solid rgba(139, 92, 246, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      font-weight: 600;
      color: #a78bfa;
      flex-shrink: 0;
    }

    .info {
      flex: 1;
      min-width: 0;
    }

    .email {
      font-size: 0.875rem;
      color: #e2e8f0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .actions {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex-shrink: 0;
    }

    .btn-remove {
      background: transparent;
      border: none;
      color: #64748b;
      cursor: pointer;
      padding: 0.25rem;
      border-radius: 0.375rem;
      display: flex;
      align-items: center;
      transition: color 200ms ease, background 200ms ease;
    }

    .btn-remove:hover:not(:disabled) {
      color: #f87171;
      background: rgba(239, 68, 68, 0.1);
    }

    .btn-remove:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    /* Light mode */
    :host([data-theme='light']) .collaborator-row {
      background: #ffffff;
      border-color: #e2e8f0;
    }
    :host([data-theme='light']) .collaborator-row:hover {
      border-color: #cbd5e1;
    }
    :host([data-theme='light']) .email {
      color: #1e293b;
    }
    :host([data-theme='light']) .empty {
      border-color: #e2e8f0;
    }
  `;

  private getInitials(email: string) {
    return email.charAt(0).toUpperCase();
  }

  private canActOn(targetRole: StockRole): boolean {
    const hierarchy: Record<string, StockRole[]> = {
      OWNER: ['EDITOR', 'VIEWER', 'VIEWER_CONTRIBUTOR'],
      EDITOR: ['VIEWER', 'VIEWER_CONTRIBUTOR'],
    };
    return (hierarchy[this.viewerRole] ?? []).includes(targetRole);
  }

  private handleRoleChange(collaboratorId: number, e: CustomEvent) {
    this.dispatchEvent(
      new CustomEvent('collaborator-role-change', {
        detail: { collaboratorId, role: e.detail.role },
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleRemove(collaboratorId: number) {
    this.dispatchEvent(
      new CustomEvent('collaborator-remove', {
        detail: { collaboratorId },
        bubbles: true,
        composed: true,
      })
    );
  }

  private getExcludedRoles(): string {
    return this.viewerRole === 'EDITOR' ? 'OWNER' : '';
  }

  render() {
    if (!this.collaborators.length) {
      return html`<div class="empty">Aucun collaborateur pour ce stock.</div>`;
    }

    return html`
      <div class="list">
        ${this.collaborators.map((c) => {
          const canAct = this.canActOn(c.role) && !this.disabled;
          return html`
            <div class="collaborator-row">
              <div class="avatar">${this.getInitials(c.userEmail)}</div>

              <div class="info">
                <div class="email">${c.userEmail}</div>
              </div>

              <div class="actions">
                ${canAct
                  ? html`
                      <sh-role-selector
                        value="${c.role}"
                        exclude="${this.getExcludedRoles()}"
                        ?disabled="${this.disabled}"
                        @role-change="${(e: CustomEvent) => this.handleRoleChange(c.id, e)}"
                      ></sh-role-selector>
                    `
                  : html`<sh-role-badge role="${c.role}"></sh-role-badge>`}

                <button
                  class="btn-remove"
                  ?disabled="${!canAct}"
                  @click="${() => this.handleRemove(c.id)}"
                  aria-label="Retirer ${c.userEmail}"
                  title="Retirer ce collaborateur"
                >
                  <sh-icon name="UserMinus" style="width: 1rem; height: 1rem;"></sh-icon>
                </button>
              </div>
            </div>
          `;
        })}
      </div>
    `;
  }
}
