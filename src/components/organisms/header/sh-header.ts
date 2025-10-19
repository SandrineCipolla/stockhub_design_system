import {css, html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import '../../molecules/button/sh-button.ts';
import '../../atoms/logo/sh-logo.ts';

/**
 * Header component with logo, user welcome message, and action buttons.
 *
 * @element sh-header
 *
 * @example
 * ```html
 * <sh-header userName="John Doe" isLoggedIn></sh-header>
 * <sh-header userName="Guest" .isLoggedIn="${false}"></sh-header>
 * ```
 */
@customElement('sh-header')
export class ShHeader extends LitElement {

    static styles = css`
        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px;
            background-color: black;
            border-bottom: 3px solid #BB86FC; 
            color: white;
        }

        .logo {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .right {
            display: flex;
            align-items: center;
            gap: 16px;
        }
    `;

    /**
     * User name to display in welcome message
     * @type {string}
     * @default 'Utilisateur'
     */
    @property({ type: String }) userName: string = 'Utilisateur';

    /**
     * Login state
     * @type {boolean}
     * @default true
     */
    @property({ type: Boolean }) isLoggedIn: boolean = true;

    render() {
        return html`
            <header>
                <div class="logo">
                    <sh-logo style="--logo-size: 32px;"></sh-logo> 
                    <span>Bienvenue, ${this.userName}</span> 
                </div>
                <div class="right">
                    ${this.isLoggedIn
            ? html`<sh-button text="Logout" icon="logout" @click="${this.handleLogout}"></sh-button>`
            : html`<sh-button text="Login" icon="login" @click="${this.handleLogin}"></sh-button>`}
                    <sh-button icon="menu" shape="circle" color="white" @click="${this.toggleMenu}"></sh-button> 
                </div>
            </header>
        `;
    }

    private handleLogin() {
        // logique pour gérer le login
        console.log("User logged in");
    }

    private handleLogout() {
        // Logique pour gérer le logout
        console.log("User logged out");
    }

    private toggleMenu() {
        // Logique pour afficher ou masquer le menu
        console.log("Menu toggled");
    }
}
