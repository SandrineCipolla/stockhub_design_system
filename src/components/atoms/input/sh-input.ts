import {css, html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('sh-input')
export class ShInput extends LitElement {
    static styles = css`
    input {
      padding: 8px 12px;
      border: 1px solid #4b5563; /* gray-600 */
      border-radius: 8px;
      font-size: 16px;
      background-color: #1f2937; /* gray-800 */
      color: white;
      width: 100%;
      text-align: left;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      transition: all 0.2s ease-in-out;
      max-width: 320px;
      margin: 0 auto;
    }

    input.small {
      width: 64px; /* w-16 */
    }

    input.medium {
      width: 100%;
    }

    input.large {
      width: 100%;
      padding: 12px 16px;
      font-size: 18px;
    }
        
    input.hide-arrows::-webkit-outer-spin-button,
    input.hide-arrows::-webkit-inner-spin-button {
       -webkit-appearance: none;
       margin: 0;
    }
    input.hide-arrows[type=number] {
      -moz-appearance: textfield;
    }
        
    input:focus {
      outline: none;
      border-color: #7c3aed; 
      box-shadow: 0 0 0 2px rgba(124, 58, 237, 0.5);
    }

    input.error {
      border-color: #f87171; 
    }

    span.error-message {
      color: #f87171;
      font-size: 14px;
      margin-top: 4px;
      display: block;
    }
  `;
    @property({ type: String }) type: 'text' | 'number' = 'text';
    @property({ type: String }) placeholder = '';
    @property({ type: String }) value = '';
    @property({ type: Boolean }) error = false;
    @property({ type: String }) size: 'small' | 'medium' | 'large' = 'medium';
    @property({ type: Boolean }) hideArrows = false;



    render() {
        return html`
      <div>
        <input
          class="${this.size} ${this.error ? 'error' : ''} ${this.hideArrows ? 'hide-arrows' : ''}"
          type=${this.type}
          .value=${this.value}
          placeholder=${this.placeholder}
          @input=${this.handleInput}
          
        />
        ${this.error ? html`<span class="error-message">Ce champ est requis</span>` : ''}
      </div>
    `;
    }

    private handleInput(e: Event) {
        const target = e.target as HTMLInputElement;
        this.value = target.value;
        this.dispatchEvent(new CustomEvent('input-change', { detail: this.value }));
    }

}
