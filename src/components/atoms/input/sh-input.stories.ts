import type {Meta, StoryObj} from '@storybook/web-components';
import './sh-input.ts';

const meta = {
    title: 'Components/atoms/input/sh-input',
    component: 'sh-input',
    tags: ['autodocs'],
    argTypes: {
        type: { control: 'select', options: ['text', 'number'] },
        placeholder: { control: 'text' },
        value: { control: 'text' },
        error: { control: 'boolean' },
        size: { control: 'select', options: ['small', 'medium', 'large'] },
        hideArrows: {
            control: 'boolean',
            description: "Cacher les flèches pour l'input de type 'number'",
        },

    },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Input: Story = {
    args: {
        type: 'text',
        placeholder: 'Entrez du texte...',
        size: 'medium',
        error: false,
        hideArrows: true,
    },
};
