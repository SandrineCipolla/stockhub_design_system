import { css, html, LitElement, unsafeCSS } from "lit"
import { customElement, property } from "lit/decorators.js"
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { icons } from 'lucide';

// Export all lucide icon names as a type
export type IconName = keyof typeof icons;

@customElement("sh-icon")
export class ShIcon extends LitElement {
    static styles = css`
        :host {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 1.5rem;
            height: 1.5rem;
        }

        /* ✅ Tailles d'icônes */
        :host([size="xs"]) {
            width: 1rem;
            height: 1rem;
        }

        :host([size="sm"]) {
            width: 1.25rem;
            height: 1.25rem;
        }

        :host([size="md"]) {
            width: 1.5rem;
            height: 1.5rem;
        }

        :host([size="lg"]) {
            width: 2rem;
            height: 2rem;
        }

        :host([size="xl"]) {
            width: 2.5rem;
            height: 2.5rem;
        }

        svg {
            width: 100%;
            height: 100%;
            stroke: currentColor;
            fill: none;
            stroke-width: 2;
            stroke-linecap: round;
            stroke-linejoin: round;
            transition: all 150ms ease;
        }

        /* ✅ États interactifs */
        :host([clickable]) {
            cursor: pointer;
            border-radius: 4px;
            padding: 2px;
            transition: all 150ms ease;
        }

        :host([clickable]:hover) {
            background-color: rgba(139, 92, 246, 0.1);
            transform: scale(1.1);
        }

        :host([clickable]:active) {
            transform: scale(0.95);
        }

        /* ✅ Couleurs thématiques */
        :host([color="primary"]) svg {
            color: var(--color-primary-600, #8b5cf6);
        }

        :host([color="success"]) svg {
            color: var(--color-success-600, #22c55e);
        }

        :host([color="warning"]) svg {
            color: var(--color-warning-600, #f59e0b);
        }

        :host([color="danger"]) svg {
            color: var(--color-danger-600, #ef4444);
        }

        :host([color="muted"]) svg {
            color: var(--color-neutral-500, #64748b);
        }

        /* ✅ Animation de rotation */
        :host([spin]) svg {
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `

    @property() name: IconName = "CircleHelp"
    @property() size: "xs" | "sm" | "md" | "lg" | "xl" = "md"
    @property() color: "primary" | "success" | "warning" | "danger" | "muted" | "inherit" = "inherit"
    @property({ type: Boolean }) clickable = false
    @property({ type: Boolean }) spin = false

    private getIconSVG(): string {
        const iconData = icons[this.name];
        if (!iconData) {
            console.warn(`Icon "${this.name}" not found in lucide icons`);
            return icons.CircleHelp;
        }
        return iconData;
    }

    render() {
        return html`${unsafeHTML(this.getIconSVG())}`;
    }
}
