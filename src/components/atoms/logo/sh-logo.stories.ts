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
    }
}
export default meta;

type Story = StoryObj;

// Default logo
export const Default: Story = {
    args: {
        size: 'md'
    },
    render: (args) => `<sh-logo size="${args.size}"></sh-logo>`,
};

// All sizes
export const AllSizes: Story = {
    render: () => `
        <div style="display: flex; flex-direction: column; gap: 2rem; align-items: flex-start;">
            <div>
                <p style="margin-bottom: 0.5rem; font-weight: 500;">Small</p>
                <sh-logo size="sm"></sh-logo>
            </div>
            <div>
                <p style="margin-bottom: 0.5rem; font-weight: 500;">Medium (Default)</p>
                <sh-logo size="md"></sh-logo>
            </div>
            <div>
                <p style="margin-bottom: 0.5rem; font-weight: 500;">Large</p>
                <sh-logo size="lg"></sh-logo>
            </div>
        </div>
    `,
};

// Custom sizes with CSS variables
export const CustomSizes: Story = {
    render: () => `
        <div style="display: flex; flex-direction: column; gap: 2rem; align-items: flex-start;">
            <div>
                <p style="margin-bottom: 0.5rem; font-weight: 500;">Compact (Icon: 32px, Text: 16px)</p>
                <sh-logo style="--logo-icon-size: 2rem; --logo-text-size: 1rem;"></sh-logo>
            </div>
            <div>
                <p style="margin-bottom: 0.5rem; font-weight: 500;">Header Size (Icon: 40px, Text: 20px)</p>
                <sh-logo style="--logo-icon-size: 2.5rem; --logo-text-size: 1.25rem;"></sh-logo>
            </div>
            <div>
                <p style="margin-bottom: 0.5rem; font-weight: 500;">Hero (Icon: 64px, Text: 32px)</p>
                <sh-logo style="--logo-icon-size: 4rem; --logo-text-size: 2rem;"></sh-logo>
            </div>
        </div>
    `,
};

// In context (Header-like)
export const InHeader: Story = {
    render: () => `
        <div style="
            background: linear-gradient(to bottom right, #0f172a, #1e1b4b);
            padding: 1rem 2rem;
            border-radius: 0.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        ">
            <sh-logo size="md"></sh-logo>
            <div style="color: white;">Menu items</div>
        </div>
    `,
};

// Light background
export const OnLightBackground: Story = {
    render: () => `
        <div style="
            background: white;
            padding: 2rem;
            border-radius: 0.5rem;
            border: 1px solid #e5e7eb;
        ">
            <sh-logo size="lg"></sh-logo>
        </div>
    `,
};

// Dark background
export const OnDarkBackground: Story = {
    render: () => `
        <div style="
            background: #1e293b;
            padding: 2rem;
            border-radius: 0.5rem;
        ">
            <sh-logo size="lg"></sh-logo>
        </div>
    `,
};

// Playground
export const Playground: Story = {
    args: {
        size: 'md',
    },
    render: (args) => `<sh-logo size="${args.size}"></sh-logo>`,
};
