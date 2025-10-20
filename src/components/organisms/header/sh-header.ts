import {css, html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import '../../molecules/button/sh-button.ts';
import '../../atoms/logo/sh-logo.ts';
import '../../atoms/icon/sh-icon.ts';

/**
 * Header component with logo, notifications, theme toggle, and user actions.
 * Matches StockHub V2 design with glassmorphism and sticky positioning.
 *
 * @element sh-header
 *
 * @fires sh-notification-click - Fired when notification button is clicked
 * @fires sh-theme-toggle - Fired when theme toggle button is clicked
 * @fires sh-login-click - Fired when login button is clicked (when isLoggedIn=false)
 * @fires sh-logout-click - Fired when logout button is clicked (when isLoggedIn=true)
 *
 * @example
 * ```html
 * <sh-header userName="Sandrine Cipolla" notificationCount="3" isLoggedIn></sh-header>
 * <sh-header userName="Guest" notificationCount="0" .isLoggedIn="${false}"></sh-header>
 * ```
 */
@customElement('sh-header')
export class ShHeader extends LitElement {
    /**
     * User name to display
     * @type {string}
     * @default 'Utilisateur'
     */
    @property({ type: String }) userName: string = 'Utilisateur';

    /**
     * Number of unread notifications
     * @type {number}
     * @default 0
     */
    @property({ type: Number }) notificationCount: number = 0;

    /**
     * Current theme (light or dark)
     * @type {'light' | 'dark'}
     * @default 'dark'
     */
    @property({ type: String, reflect: true, attribute: 'data-theme' }) theme: 'light' | 'dark' = 'dark';

    /**
     * Login state - if true shows Logout, if false shows Login
     * @type {boolean}
     * @default true
     */
    @property({ type: Boolean }) isLoggedIn: boolean = true;

    static styles = css`
        :host {
            display: block;
            position: sticky;
            top: 0;
            z-index: 50;
        }

        header {
            backdrop-filter: blur(24px);
            border-bottom: 1px solid;
            transition: all var(--transition-duration-normal, 200ms) var(--transition-timing-ease, ease);
        }

        /* Light mode */
        header {
            background: rgba(255, 255, 255, 0.95);
            border-bottom-color: rgba(0, 0, 0, 0.1);
        }

        /* Dark mode */
        :host([data-theme="dark"]) header {
            background: rgba(15, 23, 42, 0.9);
            border-bottom-color: rgba(255, 255, 255, 0.1);
        }

        .container {
            max-width: 1280px;
            margin: 0 auto;
            padding: 0.75rem 1rem;
        }

        @media (min-width: 640px) {
            .container {
                padding: 1rem 1.5rem;
            }
        }

        .content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.5rem;
        }

        .logo-section {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            flex-shrink: 0;
        }

        .actions {
            display: flex;
            align-items: center;
            gap: 0.25rem;
        }

        @media (min-width: 640px) {
            .actions {
                gap: 1rem;
            }
        }

        /* Notification button */
        .notification-btn {
            position: relative;
            padding: 0.375rem;
            border-radius: 0.5rem;
            border: none;
            background: transparent;
            cursor: pointer;
            transition: all 150ms ease;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #6b7280;
        }

        :host([data-theme="dark"]) .notification-btn {
            color: #d1d5db;
        }

        @media (min-width: 640px) {
            .notification-btn {
                padding: 0.5rem;
            }
        }

        .notification-btn:hover {
            background: rgba(139, 92, 246, 0.1);
        }

        .notification-btn:focus {
            outline: 2px solid var(--color-primary-500, #8b5cf6);
            outline-offset: 2px;
        }

        :host([data-theme="dark"]) .notification-btn:hover {
            background: rgba(255, 255, 255, 0.1);
        }

        .notification-badge {
            position: absolute;
            top: -4px;
            right: -4px;
            min-width: 1rem;
            height: 1rem;
            padding: 0 0.25rem;
            background: #ef4444;
            color: white;
            font-size: 0.625rem;
            font-weight: 600;
            border-radius: 9999px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        @media (min-width: 640px) {
            .notification-badge {
                min-width: 1.25rem;
                height: 1.25rem;
                font-size: 0.75rem;
            }
        }

        /* User section */
        .user-section {
            display: flex;
            align-items: center;
            gap: 0.25rem;
        }

        @media (min-width: 640px) {
            .user-section {
                gap: 0.75rem;
            }
        }

        .user-name {
            display: none;
            font-size: 0.875rem;
            color: #6b7280;
        }

        @media (min-width: 640px) {
            .user-name {
                display: block;
            }
        }

        :host([data-theme="dark"]) .user-name {
            color: #d1d5db;
        }

        /* Responsive text in logout button */
        .logout-text-desktop {
            display: none;
        }

        @media (min-width: 640px) {
            .logout-text-desktop {
                display: inline;
            }
        }
    `;

    render() {
        return html`
            <header role="banner">
                <div class="container">
                    <div class="content">
                        <!-- Logo Section -->
                        <div class="logo-section">
                            <sh-logo size="sm"></sh-logo>
                        </div>

                        <!-- Actions Navigation -->
                        <nav class="actions" role="navigation" aria-label="Actions utilisateur">
                            <!-- Notifications -->
                            <button
                                class="notification-btn"
                                @click="${this._handleNotificationClick}"
                                aria-label="Notifications (${this.notificationCount} non lues)"
                                title="Notifications"
                            >
                                <sh-icon name="Bell" size="md"></sh-icon>
                                ${this.notificationCount > 0 ? html`
                                    <span class="notification-badge" aria-label="${this.notificationCount} notifications non lues">
                                        ${this.notificationCount > 99 ? '99+' : this.notificationCount}
                                    </span>
                                ` : ''}
                            </button>

                            <!-- Theme Toggle -->
                            <sh-button
                                variant="ghost"
                                size="sm"
                                iconBefore="${this.theme === 'dark' ? 'Sun' : 'Moon'}"
                                @click="${this._handleThemeToggle}"
                                aria-label="Changer vers le thème ${this.theme === 'dark' ? 'clair' : 'sombre'}"
                                title="Changer de thème"
                            ></sh-button>

                            <!-- User Section -->
                            <div class="user-section">
                                ${this.isLoggedIn ? html`
                                    <span class="user-name" aria-label="Utilisateur connecté" title="${this.userName}">
                                        ${this.userName}
                                    </span>

                                    <sh-button
                                        variant="primary"
                                        size="sm"
                                        iconBefore="User"
                                        @click="${this._handleLogoutClick}"
                                        aria-label="Se déconnecter de l'application StockHub"
                                        title="Se déconnecter"
                                    >
                                        <span class="logout-text-desktop">Logout</span>
                                    </sh-button>
                                ` : html`
                                    <sh-button
                                        variant="primary"
                                        size="sm"
                                        iconBefore="LogIn"
                                        @click="${this._handleLoginClick}"
                                        aria-label="Se connecter à StockHub"
                                        title="Se connecter"
                                    >
                                        <span class="logout-text-desktop">Login</span>
                                    </sh-button>
                                `}
                            </div>
                        </nav>
                    </div>
                </div>
            </header>
        `;
    }

    private _handleNotificationClick() {
        this.dispatchEvent(
            new CustomEvent('sh-notification-click', {
                detail: { count: this.notificationCount },
                bubbles: true,
                composed: true,
            })
        );
    }

    private _handleThemeToggle() {
        const newTheme = this.theme === 'dark' ? 'light' : 'dark';
        this.dispatchEvent(
            new CustomEvent('sh-theme-toggle', {
                detail: {
                    previousTheme: this.theme,
                    newTheme: newTheme
                },
                bubbles: true,
                composed: true,
            })
        );
        // Update internal state so icon and ARIA label reflect the change
        this.theme = newTheme;
    }

    private _handleLoginClick() {
        this.dispatchEvent(
            new CustomEvent('sh-login-click', {
                detail: {},
                bubbles: true,
                composed: true,
            })
        );
    }

    private _handleLogoutClick() {
        this.dispatchEvent(
            new CustomEvent('sh-logout-click', {
                detail: { userName: this.userName },
                bubbles: true,
                composed: true,
            })
        );
    }
}
