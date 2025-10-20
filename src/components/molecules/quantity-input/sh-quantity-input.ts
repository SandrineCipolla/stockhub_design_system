import {css, html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import '../../atoms/input/sh-input.ts';
import '../../atoms/icon/sh-icon.ts';

/**
 * Quantity input component with sync button for inventory management.
 *
 * @element sh-quantity-input
 *
 * @fires sync - Fired when sync button is clicked with updated value
 *
 * @example
 * ```html
 * <sh-quantity-input value="10" hideArrows></sh-quantity-input>
 * ```
 */
@customElement('sh-quantity-input')
export class ShQuantityInput extends LitElement {
    static styles = css`
    .container {
        display: flex;
        align-items: center;
        gap: 30px;
        width: fit-content;
    }
    .sync-button {
        background-color: #6200ea;
        border: none;
        color: white;
        cursor: pointer;
        padding: 8px 12px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.2s ease, opacity 0.2s ease;
    }
     .sync-button:hover:not(:disabled) {
        background-color: #7c3aed;
     }
     .sync-button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
     }
    input.hide-arrows::-webkit-outer-spin-button,
    input.hide-arrows::-webkit-inner-spin-button {
       -webkit-appearance: none;
       margin: 0;
    }
    input.hide-arrows[type=number] {
       -moz-appearance: textfield;
    }    
  `;

    /**
     * Current quantity value
     * @type {string}
     * @default ''
     */
    @property({ type: String }) value = '';

    /**
     * Indicates if value has changed
     * @type {boolean}
     * @default false
     */
    @property({ type: Boolean }) dirty = false;

    /**
     * Hide number input arrows
     * @type {boolean}
     * @default false
     */
    @property({ type: Boolean }) hideArrows = false;


    render() {
        return html`
            <div class="container">
                <sh-input
                        type="number"
                        class="${this.hideArrows ? 'hide-arrows' : ''}"
                        .value=${this.value}
                        .hideArrows=${this.hideArrows}
                        @input-change=${this.handleInputChange}
                ></sh-input>
                <button
                        class="sync-button"
                        @click=${this.handleSync}
                        ?disabled=${!this.dirty}
                        title="Synchroniser"
                        aria-label="Synchroniser la quantité"
                >
                    <sh-icon name="RefreshCw" size="sm" color="inherit"></sh-icon>
                </button>
            </div>
        `;
    }

    private handleInputChange(e: CustomEvent) {
        const newValue = e.detail;
        this.value = newValue;
        this.dirty = true;
    }

    private handleSync() {
        this.dispatchEvent(new CustomEvent('sync', { detail: this.value }));
        this.dirty = false;
    }
}
