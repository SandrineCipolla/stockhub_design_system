import {customElement, property} from "lit/decorators.js";
import {css, html, LitElement} from "lit";

/**
 * Text component for rendering headings and paragraphs with custom styling.
 *
 * @element sh-text
 *
 * @example
 * ```html
 * <sh-text type="title" tag="h1" content="Welcome" color="#8b5cf6"></sh-text>
 * <sh-text type="paragraph" content="This is a paragraph"></sh-text>
 * ```
 */
@customElement('sh-text')
export class ShText extends LitElement {
    static styles = css`
    :host {
      /* Light theme (default) */
      --text-color-primary: #1e293b;
      --text-color-secondary: #475569;
      --text-color-muted: #64748b;
    }

    :host([data-theme="dark"]) {
      --text-color-primary: #f1f5f9;
      --text-color-secondary: #cbd5e1;
      --text-color-muted: #94a3b8;
    }

    h1, h2, h3, h4, h5, h6 {
      font-weight: normal;
      color: var(--text-color-primary);
      margin: 0;
    }

    h1 {
      font-size: 2rem;
    }

    h2 {
      font-size: 1.75rem;
    }

    h3 {
      font-size: 1.5rem;
    }

    h4 {
      font-size: 1.25rem;
    }

    h5 {
      font-size: 1rem;
    }

    h6 {
      font-size: 0.875rem;
    }


    p {
      font-size: 1rem;
      color: var(--text-color-secondary);
      margin: 0;
    }
  `;
    /**
     * Type of text element
     * @type {'title' | 'paragraph'}
     * @default 'paragraph'
     */
    @property({ type: String }) type: 'title' | 'paragraph' = 'paragraph';

    /**
     * Text content to display
     * @type {string}
     * @default ''
     */
    @property({ type: String }) content: string = '';

    /**
     * HTML tag to use when type is 'title'
     * @type {'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'}
     * @default 'h1'
     */
    @property({ type: String }) tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h1';

    /**
     * Text color (overrides theme colors)
     * @type {string}
     * @default 'inherit'
     */
    @property({type:String}) color:string ='inherit';

    /**
     * Theme variant
     * @type {'light' | 'dark'}
     * @default 'dark'
     * @attr data-theme
     */
    @property({ type: String, reflect: true, attribute: 'data-theme' }) theme: 'light' | 'dark' = 'dark';

    render() {
        const tagToRender = this.type === 'title' ? this.tag : 'p';
        return this.renderWithTag(tagToRender, this.content);
    }

    private renderWithTag(tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p', content: string) {
      // Only apply custom color if it's not 'inherit' (i.e., user explicitly set a color)
      const styles = this.color !== 'inherit' ? `color: ${this.color}` : '';

      const tagMap = {
            h1: html`<h1 style=${styles}>${content}</h1>`,
            h2: html`<h2 style=${styles}>${content}</h2>`,
            h3: html`<h3 style=${styles}>${content}</h3>`,
            h4: html`<h4 style=${styles}>${content}</h4>`,
            h5: html`<h5 style=${styles}>${content}</h5>`,
            h6: html`<h6 style=${styles}>${content}</h6>`,
            p: html`<p style=${styles}>${content}</p>`,
      };

      return tagMap[tag] || tagMap.p;
    }

}

