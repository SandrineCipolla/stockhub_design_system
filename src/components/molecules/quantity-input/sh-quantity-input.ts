import {css, html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import '../../atoms/input/sh-input.ts';
import {icons} from '../../../icons/icons.ts'


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
        padding: 4px 8px;
        border-radius: 4px;
        
    }
     .sync-button svg {
         width: 16px;
         height: 16px;
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

    @property({ type: String }) value = '';
    @property({ type: Boolean }) dirty = false;
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
                >
                    ${icons.sync}
                    
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
