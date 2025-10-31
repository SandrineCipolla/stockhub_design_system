import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../../atoms/icon/sh-icon.js';

/**
 * @element sh-search-input
 * @summary Input de recherche avec icône pour la recherche de produits
 *
 * @description
 * Composant d'input de recherche avec :
 * - Icône de loupe à gauche
 * - Placeholder personnalisable
 * - Support thèmes light/dark
 * - Événements de recherche
 * - Debounce optionnel
 *
 * Utilisé dans StockHub V2 pour la recherche de produits.
 *
 * @fires sh-search - Émis lors de la recherche (avec debounce si activé)
 * @fires sh-search-change - Émis à chaque changement de valeur
 * @fires sh-search-clear - Émis lors du clic sur clear (si clearable)
 *
 * @example
 * ```html
 * <sh-search-input
 *   placeholder="Rechercher un produit..."
 *   debounce="300"
 *   clearable
 * ></sh-search-input>
 * ```
 */
@customElement('sh-search-input')
export class ShSearchInput extends LitElement {
  @property() value = '';
  @property() placeholder = 'Rechercher...';
  @property({ type: Number }) debounce = 0;
  @property({ type: Boolean }) clearable = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: String, reflect: true, attribute: 'data-theme' }) theme: 'light' | 'dark' = 'dark';

  private _debounceTimer: number | null = null;

  static styles = css`
    :host {
      display: block;
      --search-bg: rgba(255, 255, 255, 0.05);
      --search-border: rgba(255, 255, 255, 0.1);
      --search-text: var(--color-neutral-100);
      --search-placeholder: var(--color-neutral-400);
      --search-icon: var(--color-neutral-400);
    }

    :host([data-theme="light"]) {
      --search-bg: rgba(0, 0, 0, 0.02);
      --search-border: var(--color-neutral-200);
      --search-text: var(--color-neutral-900);
      --search-placeholder: var(--color-neutral-500);
      --search-icon: var(--color-neutral-500);
    }

    .search-container {
      position: relative;
      width: 100%;
    }

    .search-input {
      width: 100%;
      padding: var(--spacing-sm) var(--spacing-md);
      padding-left: calc(var(--spacing-md) + 1.5rem + var(--spacing-sm));
      background: var(--search-bg);
      border: 1px solid var(--search-border);
      border-radius: var(--border-radius-lg);
      color: var(--search-text);
      font-size: var(--font-fontSize-md);
      font-family: var(--font-fontFamily-primary);
      transition: all 0.2s ease;
      box-sizing: border-box;
    }

    .search-input::placeholder {
      color: var(--search-placeholder);
    }

    .search-input:focus {
      outline: none;
      border-color: var(--color-primary-500);
      box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
    }

    .search-input:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .search-icon {
      position: absolute;
      left: var(--spacing-md);
      top: 50%;
      transform: translateY(-50%);
      color: var(--search-icon);
      pointer-events: none;
    }

    .clear-button {
      position: absolute;
      right: var(--spacing-sm);
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      padding: var(--spacing-xs);
      cursor: pointer;
      color: var(--search-icon);
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--border-radius-sm);
      transition: all 0.2s ease;
    }

    .clear-button:hover {
      background: rgba(255, 255, 255, 0.1);
      color: var(--search-text);
    }

    .clear-button:active {
      transform: translateY(-50%) scale(0.95);
    }

    :host([clearable]) .search-input {
      padding-right: calc(var(--spacing-md) + 1.5rem + var(--spacing-sm));
    }
  `;

  private _handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = input.value;

    // Emit immediate change event
    this.dispatchEvent(new CustomEvent('sh-search-change', {
      detail: { value: this.value },
      bubbles: true,
      composed: true
    }));

    // Handle debounced search
    if (this.debounce > 0) {
      if (this._debounceTimer) {
        clearTimeout(this._debounceTimer);
      }
      this._debounceTimer = window.setTimeout(() => {
        this._emitSearch();
      }, this.debounce);
    } else {
      this._emitSearch();
    }
  }

  private _emitSearch() {
    this.dispatchEvent(new CustomEvent('sh-search', {
      detail: { value: this.value },
      bubbles: true,
      composed: true
    }));
  }

  private _handleClear() {
    this.value = '';
    const input = this.shadowRoot?.querySelector('input');
    if (input) {
      input.value = '';
      input.focus();
    }

    this.dispatchEvent(new CustomEvent('sh-search-clear', {
      bubbles: true,
      composed: true
    }));

    this._emitSearch();
  }

  render() {
    return html`
      <div class="search-container">
        <sh-icon
          class="search-icon"
          name="Search"
          size="md"
        ></sh-icon>

        <input
          type="text"
          class="search-input"
          .value="${this.value}"
          placeholder="${this.placeholder}"
          ?disabled="${this.disabled}"
          @input="${this._handleInput}"
          aria-label="Recherche"
        />

        ${this.clearable && this.value ? html`
          <button
            class="clear-button"
            @click="${this._handleClear}"
            aria-label="Effacer la recherche"
          >
            <sh-icon name="X" size="sm"></sh-icon>
          </button>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sh-search-input': ShSearchInput;
  }
}
