import type {Meta, StoryObj} from '@storybook/web-components';
import './sh-button.ts';
import '../../atoms/icon/sh-icon.ts';

const meta: Meta = {
  title: 'Components/Molecules/Button',
  component: 'sh-button',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger'],
      description: 'Style variant du bouton',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille du bouton',
    },
    disabled: {
      control: 'boolean',
      description: 'Bouton désactivé',
    },
    loading: {
      control: 'boolean',
      description: 'État de chargement',
    },
    iconBefore: {
      control: 'text',
      description: 'Icône avant le texte',
    },
    iconAfter: {
      control: 'text',
      description: 'Icône après le texte',
    },
  },
};

export default meta;
type Story = StoryObj;

// Default Primary Button
export const Primary: Story = {
  render: () => `<sh-button variant="primary">Primary Button</sh-button>`,
};

// All Variants
export const AllVariants: Story = {
  render: () => `
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <sh-button variant="primary">Primary</sh-button>
      <sh-button variant="secondary">Secondary</sh-button>
      <sh-button variant="ghost">Ghost</sh-button>
      <sh-button variant="danger">Danger</sh-button>
    </div>
  `,
};

// All Sizes
export const AllSizes: Story = {
  render: () => `
    <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
      <sh-button size="sm">Small</sh-button>
      <sh-button size="md">Medium</sh-button>
      <sh-button size="lg">Large</sh-button>
    </div>
  `,
};

// With Icon Before
export const WithIconBefore: Story = {
  render: () => `
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <sh-button iconBefore="Plus" variant="primary">Add Item</sh-button>
      <sh-button iconBefore="Edit" variant="secondary">Edit</sh-button>
      <sh-button iconBefore="Search" variant="ghost">Search</sh-button>
    </div>
  `,
};

// With Icon After
export const WithIconAfter: Story = {
  render: () => `
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <sh-button iconAfter="ArrowRight" variant="primary">Continue</sh-button>
      <sh-button iconAfter="ExternalLink" variant="ghost">Open</sh-button>
    </div>
  `,
};

// Icon Only
export const IconOnly: Story = {
  render: () => `
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <sh-button iconBefore="Home" variant="primary" aria-label="Home"></sh-button>
      <sh-button iconBefore="Menu" variant="secondary" aria-label="Menu"></sh-button>
      <sh-button iconBefore="X" variant="ghost" aria-label="Close"></sh-button>
      <sh-button iconBefore="Trash2" variant="danger" aria-label="Delete"></sh-button>
    </div>
  `,
};

// Loading State
export const Loading: Story = {
  render: () => `
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <sh-button loading variant="primary">Loading...</sh-button>
      <sh-button loading variant="secondary">Processing</sh-button>
      <sh-button loading variant="ghost">Saving</sh-button>
    </div>
  `,
};

// Disabled State
export const Disabled: Story = {
  render: () => `
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <sh-button disabled variant="primary">Disabled Primary</sh-button>
      <sh-button disabled variant="secondary">Disabled Secondary</sh-button>
      <sh-button disabled variant="ghost">Disabled Ghost</sh-button>
      <sh-button disabled variant="danger">Disabled Danger</sh-button>
    </div>
  `,
};

// Ghost Variant Showcase
export const GhostShowcase: Story = {
  render: () => `
    <div style="display: flex; gap: 1rem; flex-direction: column; align-items: flex-start;">
      <div style="padding: 2rem; background: white; border-radius: 8px;">
        <h4 style="margin-top: 0;">Light Background</h4>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <sh-button variant="ghost">Cancel</sh-button>
          <sh-button variant="ghost" iconBefore="Edit">Edit</sh-button>
          <sh-button variant="ghost" disabled>Disabled</sh-button>
        </div>
      </div>

      <div style="padding: 2rem; background: #1e293b; border-radius: 8px;" data-theme="dark">
        <h4 style="margin-top: 0; color: white;">Dark Background</h4>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <sh-button variant="ghost" data-theme="dark">Cancel</sh-button>
          <sh-button variant="ghost" iconBefore="Edit" data-theme="dark">Edit</sh-button>
          <sh-button variant="ghost" disabled data-theme="dark">Disabled</sh-button>
        </div>
      </div>
    </div>
  `,
};

// Form Example
export const FormExample: Story = {
  render: () => `
    <form style="display: flex; flex-direction: column; gap: 1rem; max-width: 300px;">
      <input type="text" placeholder="Username" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;" />
      <input type="password" placeholder="Password" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;" />

      <div style="display: flex; gap: 0.5rem;">
        <sh-button type="submit" variant="primary" iconBefore="LogIn" style="flex: 1;">Login</sh-button>
        <sh-button type="button" variant="ghost">Cancel</sh-button>
      </div>
    </form>
  `,
};

// Actions Example
export const ActionsExample: Story = {
  render: () => `
    <div style="display: flex; gap: 0.5rem; padding: 1rem; background: #f8fafc; border-radius: 8px;">
      <sh-button size="sm" variant="ghost" iconBefore="Eye">View</sh-button>
      <sh-button size="sm" variant="ghost" iconBefore="Edit">Edit</sh-button>
      <sh-button size="sm" variant="ghost" iconBefore="Trash2">Delete</sh-button>
    </div>
  `,
};

// Interactive Playground
export const Playground: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    iconBefore: '',
    iconAfter: '',
  },
  render: (args) => `
    <sh-button
      variant="${args.variant}"
      size="${args.size}"
      ?disabled="${args.disabled}"
      ?loading="${args.loading}"
      iconBefore="${args.iconBefore || undefined}"
      iconAfter="${args.iconAfter || undefined}"
    >
      Button Text
    </sh-button>
  `,
};
