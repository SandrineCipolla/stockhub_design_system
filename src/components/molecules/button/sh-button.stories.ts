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
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Thème du bouton (light ou dark)',
    },
  },
};

export default meta;
type Story = StoryObj;

// Default Primary Button
export const Primary: Story = {
  args: {
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 200px; display: flex; align-items: center; justify-content: center;">
      <sh-button variant="primary" data-theme="${args.theme}">Primary Button</sh-button>
    </div>
  `,
};

// All Variants
export const AllVariants: Story = {
  args: {
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 200px; display: flex; align-items: center; justify-content: center;">
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <sh-button variant="primary" data-theme="${args.theme}">Primary</sh-button>
        <sh-button variant="secondary" data-theme="${args.theme}">Secondary</sh-button>
        <sh-button variant="ghost" data-theme="${args.theme}">Ghost</sh-button>
        <sh-button variant="danger" data-theme="${args.theme}">Danger</sh-button>
      </div>
    </div>
  `,
};

// All Sizes
export const AllSizes: Story = {
  args: {
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 200px; display: flex; align-items: center; justify-content: center;">
      <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
        <sh-button size="sm" data-theme="${args.theme}">Small</sh-button>
        <sh-button size="md" data-theme="${args.theme}">Medium</sh-button>
        <sh-button size="lg" data-theme="${args.theme}">Large</sh-button>
      </div>
    </div>
  `,
};

// With Icon Before
export const WithIconBefore: Story = {
  args: {
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 200px; display: flex; align-items: center; justify-content: center;">
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <sh-button iconBefore="Plus" variant="primary" data-theme="${args.theme}">Add Item</sh-button>
        <sh-button iconBefore="Edit" variant="secondary" data-theme="${args.theme}">Edit</sh-button>
        <sh-button iconBefore="Search" variant="ghost" data-theme="${args.theme}">Search</sh-button>
      </div>
    </div>
  `,
};

// With Icon After
export const WithIconAfter: Story = {
  args: {
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 200px; display: flex; align-items: center; justify-content: center;">
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <sh-button iconAfter="ArrowRight" variant="primary" data-theme="${args.theme}">Continue</sh-button>
        <sh-button iconAfter="ExternalLink" variant="ghost" data-theme="${args.theme}">Open</sh-button>
      </div>
    </div>
  `,
};

// Icon Only
export const IconOnly: Story = {
  args: {
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 200px; display: flex; align-items: center; justify-content: center;">
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <sh-button iconBefore="Home" variant="primary" aria-label="Home" data-theme="${args.theme}"></sh-button>
        <sh-button iconBefore="Menu" variant="secondary" aria-label="Menu" data-theme="${args.theme}"></sh-button>
        <sh-button iconBefore="X" variant="ghost" aria-label="Close" data-theme="${args.theme}"></sh-button>
        <sh-button iconBefore="Trash2" variant="danger" aria-label="Delete" data-theme="${args.theme}"></sh-button>
      </div>
    </div>
  `,
};

// Loading State
export const Loading: Story = {
  args: {
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 200px; display: flex; align-items: center; justify-content: center;">
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <sh-button loading variant="primary" data-theme="${args.theme}">Loading...</sh-button>
        <sh-button loading variant="secondary" data-theme="${args.theme}">Processing</sh-button>
        <sh-button loading variant="ghost" data-theme="${args.theme}">Saving</sh-button>
      </div>
    </div>
  `,
};

// Disabled State
export const Disabled: Story = {
  args: {
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 200px; display: flex; align-items: center; justify-content: center;">
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <sh-button disabled variant="primary" data-theme="${args.theme}">Disabled Primary</sh-button>
        <sh-button disabled variant="secondary" data-theme="${args.theme}">Disabled Secondary</sh-button>
        <sh-button disabled variant="ghost" data-theme="${args.theme}">Disabled Ghost</sh-button>
        <sh-button disabled variant="danger" data-theme="${args.theme}">Disabled Danger</sh-button>
      </div>
    </div>
  `,
};

// Ghost Variant Showcase
export const GhostShowcase: Story = {
  args: {
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 400px;">
      <div style="display: flex; gap: 1rem; flex-direction: column; align-items: flex-start;">
        <div style="padding: 2rem; background: ${args.theme === 'dark' ? '#1e293b' : 'white'}; border-radius: 8px; width: 100%;">
          <h4 style="margin-top: 0; color: ${args.theme === 'dark' ? '#ffffff' : '#000000'};">${args.theme === 'dark' ? 'Dark' : 'Light'} Background</h4>
          <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <sh-button variant="ghost" data-theme="${args.theme}">Cancel</sh-button>
            <sh-button variant="ghost" iconBefore="Edit" data-theme="${args.theme}">Edit</sh-button>
            <sh-button variant="ghost" disabled data-theme="${args.theme}">Disabled</sh-button>
          </div>
        </div>
      </div>
    </div>
  `,
};

// Form Example
export const FormExample: Story = {
  args: {
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 300px; display: flex; align-items: center; justify-content: center;">
      <form style="display: flex; flex-direction: column; gap: 1rem; max-width: 300px; width: 100%; padding: 2rem; background: ${args.theme === 'dark' ? '#1e293b' : '#ffffff'}; border-radius: 8px;">
        <input type="text" placeholder="Username" style="padding: 8px; border: 1px solid ${args.theme === 'dark' ? '#475569' : '#ccc'}; border-radius: 4px; background: ${args.theme === 'dark' ? '#334155' : '#ffffff'}; color: ${args.theme === 'dark' ? '#ffffff' : '#000000'};" />
        <input type="password" placeholder="Password" style="padding: 8px; border: 1px solid ${args.theme === 'dark' ? '#475569' : '#ccc'}; border-radius: 4px; background: ${args.theme === 'dark' ? '#334155' : '#ffffff'}; color: ${args.theme === 'dark' ? '#ffffff' : '#000000'};" />

        <div style="display: flex; gap: 0.5rem;">
          <sh-button type="submit" variant="primary" iconBefore="LogIn" style="flex: 1;" data-theme="${args.theme}">Login</sh-button>
          <sh-button type="button" variant="ghost" data-theme="${args.theme}">Cancel</sh-button>
        </div>
      </form>
    </div>
  `,
};

// Actions Example
export const ActionsExample: Story = {
  args: {
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 200px; display: flex; align-items: center; justify-content: center;">
      <div style="display: flex; gap: 0.5rem; padding: 1rem; background: ${args.theme === 'dark' ? '#1e293b' : '#f8fafc'}; border-radius: 8px;">
        <sh-button size="sm" variant="ghost" iconBefore="Eye" data-theme="${args.theme}">View</sh-button>
        <sh-button size="sm" variant="ghost" iconBefore="Edit" data-theme="${args.theme}">Edit</sh-button>
        <sh-button size="sm" variant="ghost" iconBefore="Trash2" data-theme="${args.theme}">Delete</sh-button>
      </div>
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
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 200px; display: flex; align-items: center; justify-content: center;">
      <sh-button
        variant="${args.variant}"
        size="${args.size}"
        ?disabled="${args.disabled}"
        ?loading="${args.loading}"
        iconBefore="${args.iconBefore || undefined}"
        iconAfter="${args.iconAfter || undefined}"
        data-theme="${args.theme}"
      >
        Button Text
      </sh-button>
    </div>
  `,
};
