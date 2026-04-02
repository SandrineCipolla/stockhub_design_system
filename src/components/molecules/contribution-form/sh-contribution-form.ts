import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * Formulaire de soumission d'une contribution de quantité par un VIEWER_CONTRIBUTOR.
 *
 * @element sh-contribution-form
 *
 * @fires contribution-submit - Émis à la soumission. `detail: { suggestedQuantity: number }`
 * @fires contribution-cancel - Émis à l'annulation.
 *
 * @example
 * ```html
 * <sh-contribution-form
 *   item-label="Lait"
 *   current-quantity="3"
 * ></sh-contribution-form>
 * ```
 */
@customElement('sh-contribution-form')
export class ShContributionForm extends LitElement {
  /** Nom de l'item concerné */
  @property({ type: String, attribute: 'item-label' }) itemLabel = '';

  /** Quantité actuelle (lecture seule) */
  @property({ type: Number, attribute: 'current-quantity' }) currentQuantity = 0;

  /** Désactive le formulaire (ex: pendant l'envoi) */
  @property({ type: Boolean }) disabled = false;

  @state() private suggestedQuantity = 0;
  @state() private error = '';

  static styles = css`
    :host {
      display: block;
    }

    .form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 0.75rem;
      padding: 1.25rem;
    }

    .title {
      font-size: 0.875rem;
      font-weight: 600;
      color: #e2e8f0;
      margin: 0;
    }

    .item-name {
      color: #8b5cf6;
    }

    .field {
      display: flex;
      flex-direction: column;
      gap: 0.375rem;
    }

    label {
      font-size: 0.75rem;
      color: #94a3b8;
      font-weight: 500;
    }

    .readonly-value {
      font-size: 0.875rem;
      color: #64748b;
      padding: 0.375rem 0.75rem;
      background: #0f172a;
      border: 1px solid #1e293b;
      border-radius: 0.5rem;
    }

    input[type='number'] {
      font-size: 0.875rem;
      color: #e2e8f0;
      padding: 0.375rem 0.75rem;
      background: #0f172a;
      border: 1px solid #334155;
      border-radius: 0.5rem;
      font-family: inherit;
      transition: border-color 200ms ease, box-shadow 200ms ease;
      width: 100%;
      box-sizing: border-box;
    }

    input[type='number']:focus {
      outline: none;
      border-color: #8b5cf6;
      box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.2);
    }

    input[type='number']:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .error {
      font-size: 0.75rem;
      color: #f87171;
    }

    .actions {
      display: flex;
      gap: 0.75rem;
      justify-content: flex-end;
    }

    button {
      font-size: 0.875rem;
      font-weight: 500;
      font-family: inherit;
      border-radius: 0.5rem;
      padding: 0.5rem 1rem;
      cursor: pointer;
      transition: all 200ms ease;
      border: 1px solid transparent;
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .btn-cancel {
      background: transparent;
      color: #94a3b8;
      border-color: #334155;
    }

    .btn-cancel:hover:not(:disabled) {
      background: #334155;
      color: #e2e8f0;
    }

    .btn-submit {
      background: #8b5cf6;
      color: white;
      border-color: #8b5cf6;
    }

    .btn-submit:hover:not(:disabled) {
      background: #7c3aed;
      border-color: #7c3aed;
    }

    /* Light mode */
    :host([data-theme='light']) .form {
      background: #ffffff;
      border-color: #e2e8f0;
    }
    :host([data-theme='light']) .title {
      color: #1e293b;
    }
    :host([data-theme='light']) .readonly-value {
      background: #f8fafc;
      border-color: #e2e8f0;
      color: #64748b;
    }
    :host([data-theme='light']) input[type='number'] {
      background: #ffffff;
      border-color: #cbd5e1;
      color: #1e293b;
    }
  `;

  private handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.suggestedQuantity = parseInt(input.value, 10) || 0;
    this.error = '';
  }

  private handleSubmit(e: Event) {
    e.preventDefault();
    if (this.suggestedQuantity < 0) {
      this.error = 'La quantité ne peut pas être négative.';
      return;
    }
    this.dispatchEvent(
      new CustomEvent('contribution-submit', {
        detail: { suggestedQuantity: this.suggestedQuantity },
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleCancel() {
    this.dispatchEvent(new CustomEvent('contribution-cancel', { bubbles: true, composed: true }));
  }

  render() {
    return html`
      <form class="form" @submit="${this.handleSubmit}">
        <p class="title">
          Proposer une mise à jour pour
          <span class="item-name">${this.itemLabel}</span>
        </p>

        <div class="field">
          <label>Quantité actuelle</label>
          <span class="readonly-value">${this.currentQuantity}</span>
        </div>

        <div class="field">
          <label for="suggested">Quantité suggérée</label>
          <input
            id="suggested"
            type="number"
            min="0"
            .value="${String(this.suggestedQuantity)}"
            ?disabled="${this.disabled}"
            @input="${this.handleInput}"
            placeholder="Entrez la nouvelle quantité"
            aria-label="Quantité suggérée"
          />
          ${this.error ? html`<span class="error">${this.error}</span>` : ''}
        </div>

        <div class="actions">
          <button type="button" class="btn-cancel" ?disabled="${this.disabled}" @click="${this.handleCancel}">
            Annuler
          </button>
          <button type="submit" class="btn-submit" ?disabled="${this.disabled}">
            Soumettre
          </button>
        </div>
      </form>
    `;
  }
}
