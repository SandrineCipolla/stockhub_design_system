import type {Meta, StoryObj} from '@storybook/web-components';
import './sh-button.ts';

const meta: Meta = {
    title: 'Components/molecules/button/sh-button',
    component: 'sh-button',
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        text: {
            control: 'text',
            description: 'Texte affiché dans le bouton',
        },
        shape: {
            control: 'radio',
            options: [ 'pill', 'circle'],
            description: 'Forme du bouton',
        },
        bgColor: {
            control: 'radio',
            options:['#6200ea','#ffffff','#1E1E1E'],
            description: 'Couleur de fond du bouton',
        },
        textColor: {
            control: 'radio',
            options:['#6200ea','#ffffff','#A0A0A0'],
            description: 'Couleur du texte et de l’icône',
        },
        icon: {
            control: 'select',
            options: ['login', 'logout', 'delete', 'edit', 'menu','home','back','search','add','danger','close'],
            description: 'Icône affichée dans le bouton',
        },
        showIcon: {
            control: 'boolean',
            description: 'Afficher ou non l’icône',
        },
        showText: {
            control: 'boolean',
            description: 'Afficher ou non le texte',
        },
    },
};

export default meta;
type Story = StoryObj;

export const Button: Story = {
    args: {
        text: 'Login',
        shape: 'pill',
        bgColor: '#6200ea',
        textColor: '#ffffff',
        showIcon: true,
        icon:'login',
    },
};

// export const HomeButton: Story = {
//     args:{
//         type: 'home',
//         text: '',
//         shape: 'circle',
//         bgColor: '#6200ea',
//         textColor: '#ffffff',
//         showIcon: true,
//     }
// }
//
// export const CircleIconOnly: Story = {
//     args: {
//         type: 'menu',
//         shape: 'circle',
//         text: '',
//         showIcon: true,
//         bgColor: '#eeeeee',
//         textColor: '#333333',
//     },
// };
//
// export const TextOnly: Story = {
//     args: {
//         type: 'edit',
//         shape: 'default',
//         text: 'Modifier',
//         showIcon: false,
//         bgColor: '#6200ea',
//         textColor: '#ffffff',
//     },
// };
//
// export const PillWithIconAndText: Story = {
//     args: {
//         type: 'login',
//         shape: 'pill',
//         text: 'Connexion',
//         showIcon: true,
//         bgColor: '#6200ea',
//         textColor: '#ffffff',
//     },
// };

