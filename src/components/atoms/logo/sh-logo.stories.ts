import './sh-logo.ts';
import {Meta, StoryObj} from "@storybook/web-components";

const meta:Meta = {
    title: 'Components/Atoms/Logo',
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
    render:(args) => `<sh-logo style="--logo-size: ${args.size};"></sh-logo>`,
};
