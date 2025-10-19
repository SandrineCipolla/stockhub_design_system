import {Meta, StoryObj} from '@storybook/web-components';
import './sh-text.ts';

const meta :Meta = {
    title: 'Components/Atoms/Text',
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
            control: 'color',
            description: 'La couleur du texte (override le thème)',
        },
        theme: {
            control: 'select',
            options: ['light', 'dark'],
            description: 'Thème du texte (light ou dark)',
        },
    },
};
export default meta;

type Story = StoryObj

// Playground story
export const Playground: Story = {
    args: {
        type: 'title',
        content: 'Ceci est un Texte.',
        tag:'h1',
        color: 'inherit',
        theme: 'dark',
    },
    render: (args) => `
        <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 200px; display: flex; align-items: center; justify-content: center;">
            <sh-text
                type="${args.type}"
                content="${args.content}"
                tag="${args.tag}"
                color="${args.color}"
                data-theme="${args.theme}">
            </sh-text>
        </div>
    `,
};

// All Heading Levels
export const AllHeadingLevels: Story = {
    args: {
        theme: 'dark',
    },
    render: (args) => `
        <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 400px;">
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <sh-text type="title" tag="h1" content="Heading 1 - Main Title" data-theme="${args.theme}"></sh-text>
                <sh-text type="title" tag="h2" content="Heading 2 - Section Title" data-theme="${args.theme}"></sh-text>
                <sh-text type="title" tag="h3" content="Heading 3 - Subsection" data-theme="${args.theme}"></sh-text>
                <sh-text type="title" tag="h4" content="Heading 4 - Minor Heading" data-theme="${args.theme}"></sh-text>
                <sh-text type="title" tag="h5" content="Heading 5 - Small Heading" data-theme="${args.theme}"></sh-text>
                <sh-text type="title" tag="h6" content="Heading 6 - Tiny Heading" data-theme="${args.theme}"></sh-text>
            </div>
        </div>
    `,
};

// Paragraphs
export const Paragraphs: Story = {
    args: {
        theme: 'dark',
    },
    render: (args) => `
        <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 300px; max-width: 600px;">
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <sh-text type="paragraph" content="Ceci est un paragraphe standard avec du texte normal. Il utilise les couleurs du thème automatiquement." data-theme="${args.theme}"></sh-text>
                <sh-text type="paragraph" content="Un autre paragraphe qui démontre comment le texte s'affiche dans différents contextes." data-theme="${args.theme}"></sh-text>
            </div>
        </div>
    `,
};

// Custom Colors
export const CustomColors: Story = {
    args: {
        theme: 'dark',
    },
    render: (args) => `
        <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 300px;">
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <sh-text type="title" tag="h2" content="Purple Title" color="#8b5cf6" data-theme="${args.theme}"></sh-text>
                <sh-text type="title" tag="h3" content="Green Title" color="#10b981" data-theme="${args.theme}"></sh-text>
                <sh-text type="paragraph" content="Red paragraph text with custom color" color="#ef4444" data-theme="${args.theme}"></sh-text>
                <sh-text type="paragraph" content="Blue paragraph text" color="#3b82f6" data-theme="${args.theme}"></sh-text>
            </div>
        </div>
    `,
};

// Content Example
export const ContentExample: Story = {
    args: {
        theme: 'dark',
    },
    render: (args) => `
        <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 400px; max-width: 700px;">
            <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                <sh-text type="title" tag="h1" content="StockHub Design System" data-theme="${args.theme}"></sh-text>
                <sh-text type="paragraph" content="Un système de design moderne et cohérent pour vos applications de gestion de stock." data-theme="${args.theme}"></sh-text>

                <sh-text type="title" tag="h2" content="Fonctionnalités principales" data-theme="${args.theme}"></sh-text>
                <sh-text type="paragraph" content="Notre design system offre une collection complète de composants réutilisables." data-theme="${args.theme}"></sh-text>

                <sh-text type="title" tag="h3" content="Web Components" data-theme="${args.theme}"></sh-text>
                <sh-text type="paragraph" content="Basé sur les standards web, compatible avec tous les frameworks modernes." data-theme="${args.theme}"></sh-text>
            </div>
        </div>
    `,
};