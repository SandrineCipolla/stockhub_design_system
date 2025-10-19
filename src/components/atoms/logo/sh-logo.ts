import {css, html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';

/**
 * Logo component displaying the StockHub brand with icon and text.
 *
 * @element sh-logo
 *
 * @cssproperty --logo-icon-size - Controls the size of the logo icon (default: 40px)
 * @cssproperty --logo-text-size - Controls the size of the logo text (default: 20px)
 *
 * @example
 * ```html
 * <sh-logo></sh-logo>
 * <sh-logo style="--logo-icon-size: 32px; --logo-text-size: 16px;"></sh-logo>
 * ```
 */
@customElement('sh-logo')
export class ShLogo extends LitElement {
    /**
     * Logo size variant
     * @type {'sm' | 'md' | 'lg'}
     * @default 'md'
     */
    @property({ type: String }) size: 'sm' | 'md' | 'lg' = 'md';

    static styles = css`
        :host {
            display: inline-flex;
            align-items: center;
            gap: var(--logo-gap, 0.75rem);
        }

        .logo-container {
            display: flex;
            align-items: center;
            gap: var(--logo-gap, 0.75rem);
        }

        .icon {
            background: linear-gradient(to bottom right, #8b5cf6, #7c3aed);
            border-radius: 0.75rem;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
            flex-shrink: 0;
        }

        /* Sizes */
        :host([size="sm"]) .icon {
            width: 2rem;
            height: 2rem;
            font-size: 0.875rem;
        }

        :host([size="md"]) .icon {
            width: 2.5rem;
            height: 2.5rem;
            font-size: 1rem;
        }

        :host([size="lg"]) .icon {
            width: 3rem;
            height: 3rem;
            font-size: 1.125rem;
        }

        /* Custom sizes via CSS variables */
        .icon {
            width: var(--logo-icon-size, 2.5rem);
            height: var(--logo-icon-size, 2.5rem);
            font-size: calc(var(--logo-icon-size, 2.5rem) * 0.4);
        }

        .text {
            font-family: var(--font-fontFamily-base, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif);
            font-weight: bold;
            background: linear-gradient(to right, #8b5cf6, #7c3aed);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        :host([size="sm"]) .text {
            font-size: 1rem;
        }

        :host([size="md"]) .text {
            font-size: 1.25rem;
        }

        :host([size="lg"]) .text {
            font-size: 1.5rem;
        }

        /* Custom text size via CSS variable */
        .text {
            font-size: var(--logo-text-size, 1.25rem);
        }

        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
            .icon {
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -4px rgba(0, 0, 0, 0.3);
            }
        }
    `;

    render() {
        return html`
            <div class="logo-container">
                <div class="icon" role="img" aria-label="Logo StockHub">
                    <span>SH</span>
                </div>
                <h1 class="text">StockHub</h1>
            </div>
        `;
    }
}
