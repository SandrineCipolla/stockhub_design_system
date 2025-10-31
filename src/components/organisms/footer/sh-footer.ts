import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * @element sh-footer
 * @summary Footer de l'application avec copyright et liens légaux
 *
 * @description
 * Composant footer avec :
 * - Copyright dynamique avec année
 * - Liens légaux (Mentions Légales, Politique de Confidentialité, CGU, Cookies)
 * - Support thèmes light/dark
 * - Responsive
 *
 * Utilisé dans StockHub V2.
 *
 * @fires sh-footer-link-click - Émis lors du clic sur un lien
 *
 * @example
 * ```html
 * <sh-footer
 *   app-name="STOCK HUB"
 *   year="2025"
 * ></sh-footer>
 * ```
 */
@customElement('sh-footer')
export class ShFooter extends LitElement {
  @property({ attribute: 'app-name' }) appName = 'STOCK HUB';
  @property() year = new Date().getFullYear().toString();
  @property({ type: String, reflect: true, attribute: 'data-theme' }) theme: 'light' | 'dark' = 'dark';

  static styles = css`
    :host {
      display: block;
      --footer-bg: var(--color-neutral-900);
      --footer-text: var(--color-neutral-400);
      --footer-link: var(--color-primary-400);
      --footer-link-hover: var(--color-primary-300);
      --footer-border: rgba(255, 255, 255, 0.1);
    }

    :host([data-theme="light"]) {
      --footer-bg: var(--color-neutral-100);
      --footer-text: var(--color-neutral-600);
      --footer-link: var(--color-primary-600);
      --footer-link-hover: var(--color-primary-700);
      --footer-border: var(--color-neutral-200);
    }

    .footer {
      background: var(--footer-bg);
      border-top: 1px solid var(--footer-border);
      padding: var(--spacing-lg) var(--spacing-xl);
    }

    .footer-content {
      max-width: 1280px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--spacing-md);
      text-align: center;
    }

    .copyright {
      color: var(--footer-text);
      font-size: var(--font-fontSize-sm);
      font-weight: var(--font-fontWeight-medium);
      letter-spacing: 0.05em;
    }

    .links {
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-lg);
      justify-content: center;
    }

    .link {
      color: var(--footer-link);
      text-decoration: none;
      font-size: var(--font-fontSize-sm);
      font-weight: var(--font-fontWeight-medium);
      transition: color 0.2s ease;
      cursor: pointer;
    }

    .link:hover {
      color: var(--footer-link-hover);
      text-decoration: underline;
    }

    .link:focus {
      outline: 2px solid var(--color-primary-500);
      outline-offset: 2px;
      border-radius: 2px;
    }

    @media (max-width: 640px) {
      .footer {
        padding: var(--spacing-md) var(--spacing-lg);
      }

      .footer-content {
        gap: var(--spacing-sm);
      }

      .links {
        flex-direction: column;
        gap: var(--spacing-sm);
      }
    }
  `;

  private _handleLinkClick(linkName: string, e: Event) {
    e.preventDefault();

    this.dispatchEvent(new CustomEvent('sh-footer-link-click', {
      detail: { link: linkName },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <footer class="footer" role="contentinfo">
        <div class="footer-content">
          <div class="copyright">
            ${this.appName} - ALL RIGHTS RESERVED © ${this.year}
          </div>

          <nav class="links" aria-label="Liens légaux">
            <a
              href="#mentions-legales"
              class="link"
              @click="${(e: Event) => this._handleLinkClick('mentions-legales', e)}"
            >
              Mentions Légales
            </a>

            <a
              href="#politique-confidentialite"
              class="link"
              @click="${(e: Event) => this._handleLinkClick('politique-confidentialite', e)}"
            >
              Politique de Confidentialité
            </a>

            <a
              href="#cgu"
              class="link"
              @click="${(e: Event) => this._handleLinkClick('cgu', e)}"
            >
              CGU
            </a>

            <a
              href="#cookies"
              class="link"
              @click="${(e: Event) => this._handleLinkClick('cookies', e)}"
            >
              Politique de Cookies
            </a>
          </nav>
        </div>
      </footer>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sh-footer': ShFooter;
  }
}
