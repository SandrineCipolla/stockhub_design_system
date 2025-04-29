import {css, html, LitElement} from 'lit';
import {customElement} from 'lit/decorators.js';

@customElement('sh-logo')
export class ShLogo extends LitElement {
    static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: var(--logo-size,48px);
      font-weight: bold;
      color: white;
    }

    .icon {
      width: 1em;
      height: 1em;
      display: inline-block;
      fill: currentColor;
    }

    .text {
      font-family: 'Inter', sans-serif;
    }
  `;

    render() {
        return html`
      <svg class="icon" width="100%" height="100%" viewBox="0 0 24 24">
        <!-- Exemple d'icône "boîte" (modifiable selon ton style) -->
        <path d="M21 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5v-11A2.5 2.5 0 0 1 5.5 4h13A2.5 2.5 0 0 1 21 6.5Zm-9 7.5V5h-6a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h6v-4Zm1-9v4h6v-3a1 1 0 0 0-1-1h-5Zm6 5h-6v4h6v-4Zm-6 5v4h5a1 1 0 0 0 1-1v-3h-6Z"/>
      </svg>
      <span class="text">StockHub</span>
    `;
    }
}
