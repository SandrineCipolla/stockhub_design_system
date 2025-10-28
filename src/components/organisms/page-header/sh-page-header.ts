import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../../atoms/icon/sh-icon.js';
import '../../molecules/button/sh-button.js';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface ActionButton {
  label: string;
  icon?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  handler: string; // event name to dispatch
}

/**
 * @element sh-page-header
 * @summary En-tête de page avec breadcrumb, titre et boutons d'action
 *
 * @description
 * Composant page-header pour les pages principales avec :
 * - Fil d'Ariane (breadcrumb) cliquable
 * - Titre de page + sous-titre
 * - Boutons d'actions primaires (jusqu'à 3)
 * - Support thèmes light/dark
 * - Responsive (boutons empilés sur mobile)
 *
 * Utilisé dans StockHub V2 pour l'en-tête du Dashboard.
 *
 * @fires sh-breadcrumb-click - Émis au clic sur un item du breadcrumb
 * @fires sh-action-{handler} - Émis au clic sur un bouton d'action
 *
 * @example
 * ```html
 * <sh-page-header
 *   title="Tableau de Bord"
 *   subtitle="Bienvenue dans votre espace de gestion de stocks intelligent"
 * ></sh-page-header>
 * ```
 */
@customElement('sh-page-header')
export class ShPageHeader extends LitElement {
  @property() title = '';
  @property() subtitle = '';
  @property({ type: Array }) breadcrumb: BreadcrumbItem[] = [];
  @property({ type: Array }) actions: ActionButton[] = [];
  @property({ type: String, reflect: true, attribute: 'data-theme' }) theme: 'light' | 'dark' = 'dark';

  static styles = css`
    :host {
      display: block;
    }

    .page-header {
      background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
      padding: var(--spacing-2xl) var(--spacing-xl);
      color: white;
    }

    :host([data-theme="light"]) .page-header {
      background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
      color: var(--color-neutral-900);
    }

    .container {
      max-width: 1280px;
      margin: 0 auto;
    }

    /* Breadcrumb */
    .breadcrumb {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      margin-bottom: var(--spacing-lg);
      font-size: var(--font-fontSize-sm);
      flex-wrap: wrap;
    }

    .breadcrumb-item {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      color: rgba(255, 255, 255, 0.7);
      text-decoration: none;
      transition: color 0.2s ease;
    }

    :host([data-theme="light"]) .breadcrumb-item {
      color: var(--color-neutral-600);
    }

    .breadcrumb-item:hover {
      color: white;
    }

    :host([data-theme="light"]) .breadcrumb-item:hover {
      color: var(--color-neutral-900);
    }

    .breadcrumb-item.active {
      color: white;
      font-weight: var(--font-fontWeight-semibold);
    }

    :host([data-theme="light"]) .breadcrumb-item.active {
      color: var(--color-neutral-900);
    }

    .breadcrumb-separator {
      color: rgba(255, 255, 255, 0.4);
    }

    :host([data-theme="light"]) .breadcrumb-separator {
      color: var(--color-neutral-400);
    }

    /* Content */
    .content {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: var(--spacing-xl);
    }

    .text-content {
      flex: 1;
      min-width: 0;
    }

    .title {
      font-size: var(--font-fontSize-3xl);
      font-weight: var(--font-fontWeight-bold);
      margin: 0 0 var(--spacing-sm) 0;
      line-height: 1.2;
    }

    .subtitle {
      font-size: var(--font-fontSize-base);
      color: rgba(255, 255, 255, 0.8);
      margin: 0;
      line-height: 1.5;
    }

    :host([data-theme="light"]) .subtitle {
      color: var(--color-neutral-700);
    }

    /* Actions */
    .actions {
      display: flex;
      gap: var(--spacing-md);
      flex-shrink: 0;
      flex-wrap: wrap;
      justify-content: flex-end;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .page-header {
        padding: var(--spacing-xl) var(--spacing-lg);
      }

      .content {
        flex-direction: column;
        align-items: stretch;
      }

      .title {
        font-size: var(--font-fontSize-2xl);
      }

      .subtitle {
        font-size: var(--font-fontSize-sm);
      }

      .actions {
        justify-content: flex-start;
      }
    }

    @media (max-width: 640px) {
      .breadcrumb {
        font-size: var(--font-fontSize-xs);
      }

      .title {
        font-size: var(--font-fontSize-xl);
      }
    }
  `;

  private _handleBreadcrumbClick(item: BreadcrumbItem, index: number) {
    this.dispatchEvent(new CustomEvent('sh-breadcrumb-click', {
      detail: { item, index },
      bubbles: true,
      composed: true
    }));
  }

  private _handleActionClick(action: ActionButton) {
    this.dispatchEvent(new CustomEvent(`sh-action-${action.handler}`, {
      detail: { action },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <div class="page-header">
        <div class="container">
          ${this.breadcrumb.length > 0 ? html`
            <nav class="breadcrumb" aria-label="Fil d'Ariane">
              <sh-icon name="Home" size="xs"></sh-icon>
              ${this.breadcrumb.map((item, index) => html`
                ${index > 0 ? html`<span class="breadcrumb-separator">/</span>` : ''}
                <a
                  href="${item.href || 'javascript:void(0)'}"
                  class="breadcrumb-item ${index === this.breadcrumb.length - 1 ? 'active' : ''}"
                  @click="${(e: Event) => {
                    if (!item.href) e.preventDefault();
                    this._handleBreadcrumbClick(item, index);
                  }}"
                  aria-current="${index === this.breadcrumb.length - 1 ? 'page' : 'false'}"
                >
                  ${item.label}
                </a>
              `)}
            </nav>
          ` : ''}

          <div class="content">
            <div class="text-content">
              <h1 class="title">${this.title}</h1>
              ${this.subtitle ? html`<p class="subtitle">${this.subtitle}</p>` : ''}
            </div>

            ${this.actions.length > 0 ? html`
              <div class="actions" role="group" aria-label="Actions de page">
                ${this.actions.map(action => html`
                  <sh-button
                    variant="${action.variant || 'secondary'}"
                    size="md"
                    icon-before="${action.icon || ''}"
                    data-theme="${this.theme}"
                    ?hide-text-mobile="${action.variant === 'ghost'}"
                    ?icon-only="${!action.label}"
                    @click="${() => this._handleActionClick(action)}"
                    class="page-action-btn"
                  >
                    ${action.label}
                  </sh-button>
                `)}
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sh-page-header': ShPageHeader;
  }
}
