import {customElement, property} from "lit/decorators.js";
import {css, html, LitElement} from "lit";

@customElement('sh-text')
export class ShText extends LitElement {
    static styles = css`
    
    h1, h2, h3, h4, h5, h6 {
      font-weight: normal;
        
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
      
    }
  `;
    @property({ type: String }) type: 'title' | 'paragraph' = 'paragraph';
    @property({ type: String }) content: string = '';
    @property({ type: String }) tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h1';
    @property({type:String}) color:string ='inherit';

    render() {
        const tagToRender = this.type === 'title' ? this.tag : 'p';
        return this.renderWithTag(tagToRender, this.content);
    }

    private renderWithTag(tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p', content: string) {
      const styles =`color: ${this.color}`;

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

