import {Meta, StoryObj} from '@storybook/web-components';
import './sh-text.ts';

const meta :Meta = {
    title: 'Components/atoms/ShText',
    component: 'sh-text',
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        type: {
            control: 'radio',
            options: ['title', 'paragraph'],
            description: 'Le type de texte à afficher (titre ou paragraphe)',
        },
        content: {
            control: 'text',
            description: 'Le texte à afficher dans le composant',
        },
        tag: {
            control: 'select',
            options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
            description: 'Choisir la balise de titre (h1 à h6)',
            if: { arg: 'type', eq: 'title' },
        },
        color: {
            control: 'radio',
            description: 'La couleur du texte',
            options:['#6200ea','#ffffff','#1E1E1E','#A0A0A0'],
        },
    },
};
export default meta;

type Story = StoryObj

export const Text: Story = {
    args: {
        type: 'title',
        content: 'Ceci est un Texte.',
        tag:'h1',
        color: '#6200ea',
    },
};