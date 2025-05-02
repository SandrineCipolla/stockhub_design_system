import './sh-header.ts';
import {Meta, StoryObj} from "@storybook/web-components";

const meta: Meta = {
    title: 'Components/organisms/header/sh-header',
    component: 'sh-header',
    tags: ['autodocs'],
    argTypes: {
        userName: {
            control: 'text',
            description: 'Nom de l\'utilisateur',
        },
        isLoggedIn: {
            control: 'boolean',
            description: 'État de connexion',
        },
    },
};
export default meta;

type Story = StoryObj;

export const Header: Story = {
    args: {
        userName: 'John Doe',
        isLoggedIn: true,
    }
};
