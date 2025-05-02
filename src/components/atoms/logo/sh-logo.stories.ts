import './sh-logo.ts';
import {Meta, StoryObj} from "@storybook/web-components";
import {html} from "lit";

const meta:Meta = {
    title: 'Components/atoms/logo/sh-logo',
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
        size:'72px'
    },
    render:(args) => html`
        <sh-logo style="--logo-size: ${args.size};"></sh-logo>
    `,
};
