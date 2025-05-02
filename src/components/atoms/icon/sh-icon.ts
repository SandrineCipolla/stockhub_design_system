import {css, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {IconName, icons} from "../../../icons/icons.ts";

@customElement('sh-icon')
export class ShIcon extends LitElement {

    static styles = css`
        :host {
            //display: inline-block;
            width: 1.5rem;
            height: 1.5rem;
        }

        svg {
            width: 100%;
            height: 100%;
            fill: currentColor;
        }
    `;
    @property() name: IconName = 'default';

    render() {
        return icons[this.name] ?? icons.default;
    }


}
