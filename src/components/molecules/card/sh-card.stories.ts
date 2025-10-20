import type {Meta, StoryObj} from '@storybook/web-components';
import './sh-card.ts';
import '../../atoms/icon/sh-icon.ts';
import '../../atoms/badge/sh-badge.ts';
import '../button/sh-button.ts';

const meta: Meta = {
  title: 'Components/Molecules/Card',
  component: 'sh-card',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    hover: {
      control: 'boolean',
      description: 'Activer les effets au survol',
    },
    clickable: {
      control: 'boolean',
      description: 'Rendre la carte cliquable',
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Padding interne de la carte',
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Thème de la carte (light ou dark)',
    },
  },
};

export default meta;
type Story = StoryObj;

// Basic Card
export const Basic: Story = {
  args: {
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 300px; display: flex; align-items: center; justify-content: center; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
      <sh-card style="width: 300px;" data-theme="${args.theme}">
        <h3 style="margin: 0 0 0.5rem 0;">Card Title</h3>
        <p style="margin: 0; color: ${args.theme === 'dark' ? '#9ca3af' : '#6b7280'};">
          This is a basic card with some content inside.
        </p>
      </sh-card>
    </div>
  `,
};

// With Slots (Header, Content, Footer)
export const WithSlots: Story = {
  args: {
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 300px; display: flex; align-items: center; justify-content: center; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
      <sh-card style="width: 350px;" data-theme="${args.theme}">
        <div slot="header" style="padding-bottom: 0.75rem; border-bottom: 1px solid ${args.theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#e5e7eb'};">
          <h3 style="margin: 0;">Card with Slots</h3>
          <p style="margin: 0.25rem 0 0 0; color: ${args.theme === 'dark' ? '#9ca3af' : '#6b7280'}; font-size: 0.875rem;">
            Subtitle or description
          </p>
        </div>

        <p style="margin: 1rem 0;">
          This card uses slots for header, content, and footer sections.
          It helps organize content in a structured way.
        </p>

        <div slot="footer" style="padding-top: 0.75rem; border-top: 1px solid ${args.theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#e5e7eb'};">
          <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
            <sh-button variant="ghost" size="sm" data-theme="${args.theme}">Cancel</sh-button>
            <sh-button variant="primary" size="sm" data-theme="${args.theme}">Save</sh-button>
          </div>
        </div>
      </sh-card>
    </div>
  `,
};

// Hover Effects
export const HoverEffects: Story = {
  args: {
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 300px; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <sh-card hover style="width: 200px;" data-theme="${args.theme}">
          <h4 style="margin: 0 0 0.5rem 0;">With Hover</h4>
          <p style="margin: 0; font-size: 0.875rem; color: ${args.theme === 'dark' ? '#9ca3af' : '#6b7280'};">
            Hover over this card to see the effect
          </p>
        </sh-card>

        <sh-card id="no-hover-card" style="width: 200px;" data-theme="${args.theme}">
          <h4 style="margin: 0 0 0.5rem 0;">No Hover</h4>
          <p style="margin: 0; font-size: 0.875rem; color: ${args.theme === 'dark' ? '#9ca3af' : '#6b7280'};">
            This card doesn't have hover effects
          </p>
        </sh-card>
      </div>
    </div>
    <script>
      (function() {
        const card = document.getElementById('no-hover-card');
        if (card) {
          card.hover = false;
        }
      })();
    </script>
  `,
};

// Clickable Card
export const Clickable: Story = {
  args: {
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 300px; display: flex; align-items: center; justify-content: center; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
      <sh-card
        clickable
        style="width: 250px;"
        data-theme="${args.theme}"
      >
        <div style="text-align: center;">
          <sh-icon name="Folder" size="xl" color="primary" data-theme="${args.theme}"></sh-icon>
          <h3 style="margin: 0.5rem 0;">Click Me</h3>
          <p style="margin: 0; font-size: 0.875rem; color: ${args.theme === 'dark' ? '#9ca3af' : '#6b7280'};">
            This card is interactive (click to see effect)
          </p>
        </div>
      </sh-card>
    </div>
  `,
};

// Different Padding
export const DifferentPadding: Story = {
  args: {
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 300px; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
      <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: flex-start;">
        <sh-card padding="none" style="width: 150px;" data-theme="${args.theme}">
          <img src="https://via.placeholder.com/150" alt="Placeholder" style="width: 100%; display: block; border-radius: 16px 16px 0 0;">
          <div style="padding: 0.75rem;">
            <h4 style="margin: 0;">No Padding</h4>
          </div>
        </sh-card>

        <sh-card padding="sm" style="width: 150px;" data-theme="${args.theme}">
          <h4 style="margin: 0 0 0.5rem 0;">Small</h4>
          <p style="margin: 0; font-size: 0.75rem; color: ${args.theme === 'dark' ? '#9ca3af' : '#6b7280'};">Padding: sm</p>
        </sh-card>

        <sh-card padding="md" style="width: 150px;" data-theme="${args.theme}">
          <h4 style="margin: 0 0 0.5rem 0;">Medium</h4>
          <p style="margin: 0; font-size: 0.75rem; color: ${args.theme === 'dark' ? '#9ca3af' : '#6b7280'};">Padding: md</p>
        </sh-card>

        <sh-card padding="lg" style="width: 150px;" data-theme="${args.theme}">
          <h4 style="margin: 0 0 0.5rem 0;">Large</h4>
          <p style="margin: 0; font-size: 0.75rem; color: ${args.theme === 'dark' ? '#9ca3af' : '#6b7280'};">Padding: lg</p>
        </sh-card>
      </div>
    </div>
  `,
};

// Product Card Example
export const ProductCard: Story = {
  args: {
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 300px; display: flex; align-items: center; justify-content: center; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
      <sh-card hover clickable style="width: 280px;" data-theme="${args.theme}">
        <img
          src="https://via.placeholder.com/280x180"
          alt="Product"
          style="width: calc(100% + 32px); margin: -16px -16px 16px -16px; border-radius: 16px 16px 0 0; display: block;"
        >
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
          <h3 style="margin: 0;">Product Name</h3>
          <sh-badge variant="success" pill data-theme="${args.theme}">New</sh-badge>
        </div>
        <p style="margin: 0 0 1rem 0; color: ${args.theme === 'dark' ? '#9ca3af' : '#6b7280'}; font-size: 0.875rem;">
          Short description of the product goes here.
        </p>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 1.5rem; font-weight: 700; color: var(--color-primary-600);">
            $29.99
          </span>
          <sh-button variant="primary" size="sm" iconBefore="ShoppingCart" data-theme="${args.theme}">Add</sh-button>
        </div>
      </sh-card>
    </div>
  `,
};

// Stats Card Example
export const StatsCard: Story = {
  args: {
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 300px; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <sh-card hover style="width: 200px;" data-theme="${args.theme}">
          <div style="display: flex; align-items: center; gap: 1rem;">
            <div style="padding: 0.75rem; background: rgba(139, 92, 246, 0.1); border-radius: 12px;">
              <sh-icon name="Users" size="lg" color="primary" data-theme="${args.theme}"></sh-icon>
            </div>
            <div>
              <div style="font-size: 0.75rem; color: ${args.theme === 'dark' ? '#9ca3af' : '#6b7280'}; text-transform: uppercase;">Users</div>
              <div style="font-size: 1.5rem; font-weight: 700;">1,234</div>
            </div>
          </div>
        </sh-card>

        <sh-card hover style="width: 200px;" data-theme="${args.theme}">
          <div style="display: flex; align-items: center; gap: 1rem;">
            <div style="padding: 0.75rem; background: rgba(34, 197, 94, 0.1); border-radius: 12px;">
              <sh-icon name="TrendingUp" size="lg" color="success" data-theme="${args.theme}"></sh-icon>
            </div>
            <div>
              <div style="font-size: 0.75rem; color: ${args.theme === 'dark' ? '#9ca3af' : '#6b7280'}; text-transform: uppercase;">Revenue</div>
              <div style="font-size: 1.5rem; font-weight: 700;">$12.5K</div>
            </div>
          </div>
        </sh-card>
      </div>
    </div>
  `,
};

// Form Card Example
export const FormCard: Story = {
  args: {
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 400px; display: flex; align-items: center; justify-content: center; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
      <sh-card style="width: 400px;" data-theme="${args.theme}">
        <div slot="header">
          <h2 style="margin: 0;">Login</h2>
          <p style="margin: 0.5rem 0 0 0; color: ${args.theme === 'dark' ? '#9ca3af' : '#6b7280'};">
            Enter your credentials to continue
          </p>
        </div>

        <form style="display: flex; flex-direction: column; gap: 1rem;">
          <div>
            <label style="display: block; margin-bottom: 0.25rem; font-size: 0.875rem; font-weight: 500;">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              style="width: 100%; padding: 0.5rem; border: 1px solid ${args.theme === 'dark' ? 'rgba(255,255,255,0.2)' : '#d1d5db'}; border-radius: 6px; font-size: 0.875rem; background: ${args.theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#ffffff'}; color: ${args.theme === 'dark' ? '#f8fafc' : '#1e293b'};"
            >
          </div>

          <div>
            <label style="display: block; margin-bottom: 0.25rem; font-size: 0.875rem; font-weight: 500;">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              style="width: 100%; padding: 0.5rem; border: 1px solid ${args.theme === 'dark' ? 'rgba(255,255,255,0.2)' : '#d1d5db'}; border-radius: 6px; font-size: 0.875rem; background: ${args.theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#ffffff'}; color: ${args.theme === 'dark' ? '#f8fafc' : '#1e293b'};"
            >
          </div>

          <sh-button type="submit" variant="primary" style="width: 100%;" data-theme="${args.theme}">
            Sign In
          </sh-button>
        </form>

        <div slot="footer" style="text-align: center;">
          <a href="#" style="font-size: 0.875rem; color: var(--color-primary-600);">
            Forgot password?
          </a>
        </div>
      </sh-card>
    </div>
  `,
};

// Interactive Playground
export const Playground: Story = {
  args: {
    hover: true,
    clickable: false,
    padding: 'md',
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 300px; display: flex; align-items: center; justify-content: center; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
      <sh-card
        ?hover="${args.hover}"
        ?clickable="${args.clickable}"
        padding="${args.padding}"
        style="width: 300px;"
        data-theme="${args.theme}"
      >
        <h3 style="margin: 0 0 0.5rem 0;">Card Title</h3>
        <p style="margin: 0; color: ${args.theme === 'dark' ? '#9ca3af' : '#6b7280'};">
          Configure the card using the controls below.
        </p>
      </sh-card>
    </div>
  `,
};
