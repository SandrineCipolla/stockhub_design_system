import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { StockRole } from '../../atoms/role-badge/sh-role-badge.js';

const ROLE_OPTIONS: { value: StockRole; label: string }[] = [
  { value: 'OWNER', label: 'Propriétaire' },
  { value: 'EDITOR', label: 'Éditeur' },
  { value: 'VIEWER', label: 'Lecteur' },
  { value: 'VIEWER_CONTRIBUTOR', label: 'Contributeur' },
];

/**
 * Dropdown pour sélectionner le rôle d'un collaborateur.
 *
 * @element sh-role-selector
 *
 * @fires role-change - Émis quand le rôle change. `detail: { role: StockRole }`
 *
 * @example
 * ```html
 * <sh-role-selector value="EDITOR"></sh-role-selector>
 * <sh-role-selector value="VIEWER" exclude="OWNER"></sh-role-selector>
 * ```
 */
@customElement('sh-role-selector')
export class ShRoleSelector extends LitElement {
  /**
   * Rôle actuellement sélectionné
   * @type {StockRole}
   * @default 'VIEWER'
   */
  @property({ type: String }) value: StockRole = 'VIEWER';

  /**
   * Rôles à exclure de la liste (séparés par virgule)
   * Utile pour EDITOR qui ne peut pas attribuer OWNER
   * @example exclude="OWNER"
   */
  @property({ type: String }) exclude = '';

  /**
   * Désactive le sélecteur
   */
  @property({ type: Boolean }) disabled = false;

  static styles = css`
    :host {
      display: inline-block;
    }

    select {
      appearance: none;
      background-color: #1e293b;
      color: #e2e8f0;
      border: 1px solid #334155;
      border-radius: 0.5rem;
      padding: 0.375rem 2rem 0.375rem 0.75rem;
      font-size: 0.875rem;
      font-family: inherit;
      cursor: pointer;
      transition: border-color 200ms ease, box-shadow 200ms ease;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 0.625rem center;
    }

    select:focus {
      outline: none;
      border-color: #8b5cf6;
      box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.2);
    }

    select:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    :host([data-theme='light']) select {
      background-color: #ffffff;
      color: #1e293b;
      border-color: #cbd5e1;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
    }
  `;

  private get availableRoles() {
    const excluded = this.exclude.split(',').map((r) => r.trim());
    return ROLE_OPTIONS.filter((opt) => !excluded.includes(opt.value));
  }

  private handleChange(e: Event) {
    const select = e.target as HTMLSelectElement;
    this.value = select.value as StockRole;
    this.dispatchEvent(
      new CustomEvent('role-change', {
        detail: { role: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <select
        .value="${this.value}"
        ?disabled="${this.disabled}"
        @change="${this.handleChange}"
        aria-label="Sélectionner un rôle"
      >
        ${this.availableRoles.map(
          (opt) => html`
            <option value="${opt.value}" ?selected="${opt.value === this.value}">
              ${opt.label}
            </option>
          `
        )}
      </select>
    `;
  }
}
