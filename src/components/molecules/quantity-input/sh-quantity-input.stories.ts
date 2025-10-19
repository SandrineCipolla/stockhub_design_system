import type {Meta, StoryObj} from '@storybook/web-components';
import './sh-quantity-input.ts';

const meta: Meta = {
    title: 'Components/Molecules/QuantityInput',
    component: 'sh-quantity-input',
    tags: ['autodocs'],
    argTypes: {
        value: { control: 'text', description: 'Valeur initiale de la quantité' },
        dirty: { control: 'boolean', description: 'État modifié (affiche une indication visuelle)' },
        hideArrows: { control: 'boolean', description: 'Masquer les flèches de navigation' },
        theme: {
            control: 'select',
            options: ['light', 'dark'],
            description: 'Thème du composant (light ou dark)',
        },
    },
};

export default meta;
type Story = StoryObj;

// Default
export const Default: Story = {
    args: {
        value: '10',
        dirty: false,
        hideArrows: false,
        theme: 'dark',
    },
    render: (args) => `
        <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 200px; display: flex; align-items: center; justify-content: center;">
            <sh-quantity-input value="${args.value}" ?dirty="${args.dirty}" ?hideArrows="${args.hideArrows}" data-theme="${args.theme}"></sh-quantity-input>
        </div>
    `,
};

// Different Values
export const DifferentValues: Story = {
    args: {
        theme: 'dark',
    },
    render: (args) => `
        <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 300px;">
            <div style="display: flex; flex-direction: column; gap: 1.5rem; align-items: center;">
                <div style="text-align: center;">
                    <p style="margin-bottom: 0.5rem; color: ${args.theme === 'dark' ? '#cbd5e1' : '#64748b'};">Quantité: 0</p>
                    <sh-quantity-input value="0" data-theme="${args.theme}"></sh-quantity-input>
                </div>
                <div style="text-align: center;">
                    <p style="margin-bottom: 0.5rem; color: ${args.theme === 'dark' ? '#cbd5e1' : '#64748b'};">Quantité: 5</p>
                    <sh-quantity-input value="5" data-theme="${args.theme}"></sh-quantity-input>
                </div>
                <div style="text-align: center;">
                    <p style="margin-bottom: 0.5rem; color: ${args.theme === 'dark' ? '#cbd5e1' : '#64748b'};">Quantité: 100</p>
                    <sh-quantity-input value="100" data-theme="${args.theme}"></sh-quantity-input>
                </div>
            </div>
        </div>
    `,
};

// Dirty State
export const DirtyState: Story = {
    args: {
        theme: 'dark',
    },
    render: (args) => `
        <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 300px;">
            <div style="display: flex; flex-direction: column; gap: 1.5rem; align-items: center;">
                <div style="text-align: center;">
                    <p style="margin-bottom: 0.5rem; color: ${args.theme === 'dark' ? '#cbd5e1' : '#64748b'};">Normal State</p>
                    <sh-quantity-input value="10" data-theme="${args.theme}"></sh-quantity-input>
                </div>
                <div style="text-align: center;">
                    <p style="margin-bottom: 0.5rem; color: ${args.theme === 'dark' ? '#cbd5e1' : '#64748b'};">Dirty State (Modified)</p>
                    <sh-quantity-input value="15" dirty data-theme="${args.theme}"></sh-quantity-input>
                </div>
            </div>
        </div>
    `,
};

// Without Arrows
export const WithoutArrows: Story = {
    args: {
        theme: 'dark',
    },
    render: (args) => `
        <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 200px; display: flex; align-items: center; justify-content: center;">
            <sh-quantity-input value="10" hideArrows data-theme="${args.theme}"></sh-quantity-input>
        </div>
    `,
};

// In Context (Product List)
export const InContext: Story = {
    args: {
        theme: 'dark',
    },
    render: (args) => `
        <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 400px;">
            <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 600px; margin: 0 auto;">
                <h3 style="color: ${args.theme === 'dark' ? '#f1f5f9' : '#1e293b'}; margin: 0 0 1rem 0;">Produits en stock</h3>

                <!-- Product 1 -->
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: ${args.theme === 'dark' ? '#1e293b' : '#ffffff'}; border-radius: 8px; border: 1px solid ${args.theme === 'dark' ? 'rgba(139, 92, 246, 0.1)' : 'rgba(139, 92, 246, 0.2)'};">
                    <div>
                        <h4 style="margin: 0; color: ${args.theme === 'dark' ? '#f8fafc' : '#1e293b'};">Acrylic Paint</h4>
                        <p style="margin: 0.25rem 0 0 0; font-size: 0.875rem; color: ${args.theme === 'dark' ? '#94a3b8' : '#64748b'};">REF-001</p>
                    </div>
                    <sh-quantity-input value="150" data-theme="${args.theme}"></sh-quantity-input>
                </div>

                <!-- Product 2 -->
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: ${args.theme === 'dark' ? '#1e293b' : '#ffffff'}; border-radius: 8px; border: 1px solid ${args.theme === 'dark' ? 'rgba(139, 92, 246, 0.1)' : 'rgba(139, 92, 246, 0.2)'};">
                    <div>
                        <h4 style="margin: 0; color: ${args.theme === 'dark' ? '#f8fafc' : '#1e293b'};">Matte Varnish</h4>
                        <p style="margin: 0.25rem 0 0 0; font-size: 0.875rem; color: ${args.theme === 'dark' ? '#94a3b8' : '#64748b'};">REF-002</p>
                    </div>
                    <sh-quantity-input value="8" dirty data-theme="${args.theme}"></sh-quantity-input>
                </div>

                <!-- Product 3 -->
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: ${args.theme === 'dark' ? '#1e293b' : '#ffffff'}; border-radius: 8px; border: 1px solid ${args.theme === 'dark' ? 'rgba(139, 92, 246, 0.1)' : 'rgba(139, 92, 246, 0.2)'};">
                    <div>
                        <h4 style="margin: 0; color: ${args.theme === 'dark' ? '#f8fafc' : '#1e293b'};">Pro Brushes</h4>
                        <p style="margin: 0.25rem 0 0 0; font-size: 0.875rem; color: ${args.theme === 'dark' ? '#94a3b8' : '#64748b'};">REF-003</p>
                    </div>
                    <sh-quantity-input value="2" data-theme="${args.theme}"></sh-quantity-input>
                </div>
            </div>
        </div>
    `,
};

// Playground
export const Playground: Story = {
    args: {
        value: '10',
        dirty: false,
        hideArrows: false,
        theme: 'dark',
    },
    render: (args) => `
        <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 200px; display: flex; align-items: center; justify-content: center;">
            <sh-quantity-input
                value="${args.value}"
                ?dirty="${args.dirty}"
                ?hideArrows="${args.hideArrows}"
                data-theme="${args.theme}">
            </sh-quantity-input>
        </div>
    `,
};
