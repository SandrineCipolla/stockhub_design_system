import {css, html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';


@customElement('sh-button')
export class ShButton extends LitElement {

    static styles = css`
        button {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 12px 16px;
            font-size: 1rem;
            border: none;
            cursor: pointer;
            transition: transform 0.3s, box-shadow 0.3s;
            color: white;
        }

        //button.default {
        //    border-radius: 8px;
        //}

        button.pill {
            border-radius: 20px;
        }

        button.circle {
            border-radius: 50%;
            width: 48px;
            height: 48px;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        button:hover {
            transform: scale(1.05);
            box-shadow: 0px 6px 16px rgba(168, 85, 247, 0.8);
        }

        @media screen and (min-width: 600px) {
            button {
                font-size: 0.875rem;
            }
        }
        sh-icon {
            font-size: 1.25rem; 
        }

        button.circle sh-icon {
            font-size: 1.5rem; 
        }
    `;
    @property({ type: String }) text: string = '';
    @property({ type: String }) icon: string = '';
    // @property({ type: String }) type: 'login' | 'logout' | 'edit' | 'delete' | 'menu'| 'home' = 'login';
    @property({ type: String }) shape:  'pill' | 'circle' = 'pill';
    @property({ type: String }) bgColor: string = '#6200ea';
    @property({ type: String }) textColor: string = '#ffffff';
    @property({ type: Boolean }) showIcon: boolean = true;
    @property({ type: Boolean }) showText: boolean = true;

    render() {
        // const iconName = this.icon || this.type;

        return html`
            <button
                    class="${this.shape}"
                    style="background-color: ${this.bgColor}; color: ${this.textColor};"
                    @click="${this.handleClick}"
                    aria-label="${this.text || this.icon}"
            >
                ${this.showIcon ? html`<sh-icon name="${this.icon}"></sh-icon>` : ''}
                ${this.showText && this.shape !== 'circle' ? html`<span>${this.text}</span>` : ''}
            </button>
        `;
    }

    private handleClick() {
        this.dispatchEvent(
            new CustomEvent('button-click', {
                detail: { action: this.icon },
                bubbles: true,
                composed: true,
            })
        );
    }
}
