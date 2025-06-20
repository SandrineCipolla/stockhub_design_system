import {css, LitElement} from "lit"
import {customElement, property} from "lit/decorators.js"
import {type StockHubIconName, stockHubIcons} from "../../../icons/stockhub-icones.ts"

@customElement("sh-icon")
export class ShIcon extends LitElement {
    static styles = css`
        :host {
            display: inline-block;
            width: 1.5rem;
            height: 1.5rem;

            ///* ✅ Variables pour les tailles */
            //--icon-size-xs: 1rem;
            //--icon-size-sm: 1.25rem;
            //--icon-size-md: 1.5rem;
            //--icon-size-lg: 2rem;
            //--icon-size-xl: 2.5rem;
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
            fill: currentColor;
            stroke: currentColor;
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
            color: #8b5cf6;
        }

        :host([color="success"]) svg {
            color: #22c55e;
        }

        :host([color="warning"]) svg {
            color: #f59e0b;
        }

        :host([color="danger"]) svg {
            color: #ef4444;
        }

        :host([color="muted"]) svg {
            color: #64748b;
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
    @property() name: StockHubIconName = "default"
    @property() size: "xs" | "sm" | "md" | "lg" | "xl" = "md"
    @property() color: "primary" | "success" | "warning" | "danger" | "muted" | "inherit" = "inherit"
    @property({ type: Boolean }) clickable = false
    @property({ type: Boolean }) spin = false

    createRenderRoot() {
        return this; // Important pour Storybook ! Permet l’affichage direct
    }

    render() {
        return stockHubIcons[this.name] ?? stockHubIcons.default
    }
}
