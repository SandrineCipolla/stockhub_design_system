import './sh-logo.ts';
import type {Meta, StoryObj} from "@storybook/web-components";

const meta: Meta = {
    title: 'Components/Atoms/Logo',
    component: 'sh-logo',
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: 'Size variant of the logo',
        },
        theme: {
            control: 'select',
            options: ['light', 'dark'],
            description: 'Thème du logo (light ou dark)',
        },
    }
}
export default meta;

type Story = StoryObj;

// Default logo
export const Default: Story = {
    args: {
        size: 'md',
        theme: 'dark',
    },
    render: (args) => `
        <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 200px; display: flex; align-items: center; justify-content: center; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
            <sh-logo size="${args.size}" data-theme="${args.theme}"></sh-logo>
        </div>
    `,
};

// All sizes
export const AllSizes: Story = {
    args: {
        theme: 'dark',
    },
    render: (args) => `
        <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 300px; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
            <div style="display: flex; flex-direction: column; gap: 2rem; align-items: flex-start;">
                <div>
                    <p style="margin-bottom: 0.5rem; font-weight: 500;">Small</p>
                    <sh-logo size="sm" data-theme="${args.theme}"></sh-logo>
                </div>
                <div>
                    <p style="margin-bottom: 0.5rem; font-weight: 500;">Medium (Default)</p>
                    <sh-logo size="md" data-theme="${args.theme}"></sh-logo>
                </div>
                <div>
                    <p style="margin-bottom: 0.5rem; font-weight: 500;">Large</p>
                    <sh-logo size="lg" data-theme="${args.theme}"></sh-logo>
                </div>
            </div>
        </div>
    `,
};

// Custom sizes with CSS variables
export const CustomSizes: Story = {
    args: {
        theme: 'dark',
    },
    render: (args) => `
        <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 300px; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
            <div style="display: flex; flex-direction: column; gap: 2rem; align-items: flex-start;">
                <div>
                    <p style="margin-bottom: 0.5rem; font-weight: 500;">Compact (Icon: 32px, Text: 16px)</p>
                    <sh-logo style="--logo-icon-size: 2rem; --logo-text-size: 1rem;" data-theme="${args.theme}"></sh-logo>
                </div>
                <div>
                    <p style="margin-bottom: 0.5rem; font-weight: 500;">Header Size (Icon: 40px, Text: 20px)</p>
                    <sh-logo style="--logo-icon-size: 2.5rem; --logo-text-size: 1.25rem;" data-theme="${args.theme}"></sh-logo>
                </div>
                <div>
                    <p style="margin-bottom: 0.5rem; font-weight: 500;">Hero (Icon: 64px, Text: 32px)</p>
                    <sh-logo style="--logo-icon-size: 4rem; --logo-text-size: 2rem;" data-theme="${args.theme}"></sh-logo>
                </div>
            </div>
        </div>
    `,
};

// In context (Header-like)
export const InHeader: Story = {
    args: {
        theme: 'dark',
    },
    render: (args) => `
        <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 200px; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
            <div style="
                background: ${args.theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'};
                padding: 1rem 2rem;
                border-radius: 0.5rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border: 1px solid ${args.theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'};
            ">
                <sh-logo size="md" data-theme="${args.theme}"></sh-logo>
                <div>Menu items</div>
            </div>
        </div>
    `,
};

// Playground
export const Playground: Story = {
    args: {
        size: 'md',
        theme: 'dark',
    },
    render: (args) => `
        <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 200px; display: flex; align-items: center; justify-content: center; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
            <sh-logo size="${args.size}" data-theme="${args.theme}"></sh-logo>
        </div>
    `,
};
