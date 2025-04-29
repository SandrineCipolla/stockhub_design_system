import './sh-logo';
import {Meta, StoryObj} from "@storybook/web-components";
import {html} from "lit";

const meta:Meta = {
    title: 'Components/atoms/ShLogo',
    component: 'sh-logo',
    tags: ['autodocs'],
    argTypes:{
        size: {
            control: 'text',
            description: 'Taille du logo',

        },
    }
}
export default meta;


type Story = StoryObj;


export const Logo:Story = {
    args: {
        size:'48px'
    },
    render:(args) => html`
        <sh-logo style="--logo-size: ${args.size};"></sh-logo>
    `,
};
