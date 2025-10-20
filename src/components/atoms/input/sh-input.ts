import {css, html, LitElement} from "lit"
import {customElement, property} from "lit/decorators.js"

/**
 * Input component with validation, error states, and multiple sizes.
 *
 * @element sh-input
 *
 * @fires sh-input-change - Fired when input value changes
 * @fires sh-input-blur - Fired when input loses focus
 * @fires sh-input-focus - Fired when input receives focus
 *
 * @example
 * ```html
 * <sh-input type="email" placeholder="Email" required></sh-input>
 * <sh-input type="number" size="small" hideArrows></sh-input>
 * ```
 */
@customElement("sh-input")
export class ShInput extends LitElement {

    static styles = css`
    :host {
      display: block;
      font-family: var(--font-fontFamily-base), serif;
        --component-input-height-sm: 28px;
        --component-input-height-md: 40px;
        --component-input-height-lg: 56px;
        --spacing-sm: 8px;
        --spacing-md: 12px;
        --font-size-xs: 12px;
        --font-size-base: 16px;
        --font-size-lg: 20px;
    }

    .input-wrapper {
      position: relative;
      width: 100%;
    }

    input {
      /* Utilisation des design tokens */
      padding: var(--component-input-padding-vertical) var(--component-input-padding-horizontal);
      border: var(--border-width-thin) solid var(--color-border-secondary);
      border-radius: var(--border-radius-md);
      font-size: var(--font-fontSize-base);
      font-family: var(--font-fontFamily-base),serif;
      background-color: var(--color-surface-primary);
      color: var(--color-text-primary);
      width: 100%;
      box-shadow: var(--shadow-sm);
      transition: all var(--transition-duration-fast) var(--transition-timing-ease);
      outline: none;
    }

    /* Tailles avec tokens */
    input.small {
      //height: var(--component-input-height-sm);
        width: 25%;
      //  height: var(--component-input-width-sm);
      padding: var(--spacing-xs) var(--spacing-sm);
      font-size: var(--font-fontSize-xs);
      border-radius: var(--border-radius-sm);
    }

    input.medium {
      //height: var(--component-input-height-md);
        width: 50%;
      padding: var(--spacing-sm) var(--spacing-md);
      font-size: var(--font-fontSize-base);
        border-radius: var(--border-radius-md);
    }

    input.large {
      //height: var(--component-input-height-lg);
        width: 100%;
      padding: var(--spacing-md) var(--spacing-lg);
      font-size: var(--font-fontSize-lg);
      border-radius: var(--border-radius-lg);
    }

    /* États avec design tokens */
    input:hover {
      border-color: var(--color-border-primary);
      box-shadow: var(--shadow-md);
    }

    input:focus {
      border-color: var(--color-primary-500);
      box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.2), var(--shadow-md);
      //background-color: var(--color-surface-accent);
        background-color: var(--color-primary-200);
        color:var(--color-neutral-black);
    }

    input:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      background-color: var(--color-surface-tertiary);
      color: var(--color-text-tertiary);
    }

    /* État d'erreur */
    input.error {
      border-color: var(--color-danger-500);
      background-color: rgba(239, 68, 68, 0.05);
    }

    input.error:focus {
      box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2), var(--shadow-md);
    }

    /* Masquer les flèches pour les inputs number */
    input.hide-arrows::-webkit-outer-spin-button,
    input.hide-arrows::-webkit-inner-spin-button {
       -webkit-appearance: none;
       margin: 0;
    }
    
    input.hide-arrows[type=number] {
      -moz-appearance: textfield;
    }

    /* Message d'erreur */
    .error-message {
      color: var(--color-danger-500);
      font-size: var(--font-fontSize-sm);
      margin-top: var(--spacing-xs);
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
      font-weight: var(--font-fontWeight-medium);
    }

    .error-icon {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
    }

    /* Placeholder styling */
    input::placeholder {
      color: var(--color-text-muted);
      opacity: 1;
    }

    /* Animation de focus */
    input:focus {
      transform: translateY(-1px);
    }

    /* Responsive */
    @media (max-width: 640px) {
      input.large {
        font-size: var(--font-fontSize-base);
        padding: var(--spacing-sm) var(--spacing-md);
      }
    }

    /* Accessibility */
    @media (prefers-reduced-motion: reduce) {
      input {
        transition: none;
      }
    }

    @media (prefers-contrast: more) {
      input {
        border-width: var(--border-width-medium);
      }
    }
  `

    /**
     * Input type
     * @type {'text' | 'number' | 'email' | 'password' | 'tel'}
     * @default 'text'
     */
    @property({ type: String }) type: "text" | "number" | "email" | "password" | "tel" = "text"

    /**
     * Placeholder text
     * @type {string}
     * @default ''
     */
    @property({ type: String }) placeholder = ""

    /**
     * Input value
     * @type {string}
     * @default ''
     */
    @property({ type: String }) value = ""

    /**
     * Show error state
     * @type {boolean}
     * @default false
     */
    @property({ type: Boolean }) error = false

    /**
     * Error message to display
     * @type {string}
     * @default 'Ce champ est requis'
     */
    @property({ type: String }) errorMessage = "Ce champ est requis"

    /**
     * Size of the input
     * @type {'small' | 'medium' | 'large'}
     * @default 'medium'
     */
    @property({ type: String }) size: "small" | "medium" | "large" = "medium"

    /**
     * Hide number input arrows
     * @type {boolean}
     * @default false
     */
    @property({ type: Boolean }) hideArrows = false

    /**
     * Disable the input
     * @type {boolean}
     * @default false
     */
    @property({ type: Boolean }) disabled = false

    /**
     * Input name attribute
     * @type {string}
     * @default ''
     */
    @property({ type: String }) name = ""

    /**
     * Mark as required field
     * @type {boolean}
     * @default false
     */
    @property({ type: Boolean }) required = false

    render() {
        // Générer un id unique pour l'input
        const inputId = `sh-input-${this.name || Math.random().toString(36).substr(2, 9)}`;
        const errorId = `${inputId}-error`;
        return html`
      <div class="input-wrapper">
        <input
          id="${inputId}"
          class="${this.size} ${this.error ? "error" : ""} ${this.hideArrows ? "hide-arrows" : ""}"
          type=${this.type}
          .value=${this.value}
          placeholder=${this.placeholder}
          ?disabled=${this.disabled}
          ?required=${this.required}
          name=${this.name}
          aria-invalid="${this.error ? 'true' : 'false'}"
          aria-describedby="${this.error ? errorId : ''}"
          @input=${this.handleInput}
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
        />
        ${
            this.error
                ? html`
          <div class="error-message" id="${errorId}">
            <svg class="error-icon" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            ${this.errorMessage}
          </div>
        `
                : ""
        }
      </div>
    `
    }

    // Méthode publique pour valider
    public validate(): boolean {
        if (this.required && !this.value.trim()) {
            this.error = true
            this.errorMessage = "Ce champ est requis"
            return false
        }

        if (this.type === "email" && this.value && !this.isValidEmail(this.value)) {
            this.error = true
            this.errorMessage = "Adresse email invalide"
            return false
        }

        this.error = false
        return true
    }

    // Méthode pour focus programmatique
    public focusInput() {
        const input = this.shadowRoot?.querySelector("input")
        input?.focus()
    }

    // Méthode pour clear
    public clear() {
        this.value = ""
        this.error = false
    }

    private handleInput(e: Event) {
        const target = e.target as HTMLInputElement
        this.value = target.value

        // Réinitialiser l'erreur si l'utilisateur tape
        if (this.error && this.value.trim()) {
            this.error = false
        }

        this.dispatchEvent(
            new CustomEvent("sh-input-change", {
                detail: {
                    value: this.value,
                    name: this.name,
                    type: this.type,
                },
                bubbles: true,
            }),
        )
    }

    private handleBlur() {
        this.dispatchEvent(
            new CustomEvent("sh-input-blur", {
                detail: {
                    value: this.value,
                    name: this.name,
                },
                bubbles: true,
            }),
        )
    }

    private handleFocus() {
        this.dispatchEvent(
            new CustomEvent("sh-input-focus", {
                detail: {
                    value: this.value,
                    name: this.name,
                },
                bubbles: true,
            }),
        )
    }

    private isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }
}
