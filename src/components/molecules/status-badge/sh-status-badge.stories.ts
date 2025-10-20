import type {Meta, StoryObj} from '@storybook/web-components';
import './sh-status-badge.ts';

const meta: Meta = {
  title: 'Components/Molecules/StatusBadge',
  component: 'sh-status-badge',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['optimal', 'low', 'critical', 'out-of-stock', 'overstocked'],
      description: 'Stock status (5 variants aligned with StockHub V2)',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Badge size',
    },
    label: {
      control: 'text',
      description: 'Custom label (overrides default)',
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Thème du status badge (light ou dark)',
    },
  },
};

export default meta;
type Story = StoryObj;

// All 5 Status Types
export const AllStatusTypes: Story = {
  args: {
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 300px; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        <sh-status-badge status="optimal" data-theme="${args.theme}"></sh-status-badge>
        <sh-status-badge status="low" data-theme="${args.theme}"></sh-status-badge>
        <sh-status-badge status="critical" data-theme="${args.theme}"></sh-status-badge>
        <sh-status-badge status="out-of-stock" data-theme="${args.theme}"></sh-status-badge>
        <sh-status-badge status="overstocked" data-theme="${args.theme}"></sh-status-badge>
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
    <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 400px; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div>
          <h4 style="margin: 0 0 0.5rem 0;">Small</h4>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <sh-status-badge status="optimal" size="sm" data-theme="${args.theme}"></sh-status-badge>
            <sh-status-badge status="low" size="sm" data-theme="${args.theme}"></sh-status-badge>
            <sh-status-badge status="critical" size="sm" data-theme="${args.theme}"></sh-status-badge>
          </div>
        </div>

        <div>
          <h4 style="margin: 0 0 0.5rem 0;">Medium (default)</h4>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <sh-status-badge status="optimal" size="md" data-theme="${args.theme}"></sh-status-badge>
            <sh-status-badge status="low" size="md" data-theme="${args.theme}"></sh-status-badge>
            <sh-status-badge status="critical" size="md" data-theme="${args.theme}"></sh-status-badge>
          </div>
        </div>

        <div>
          <h4 style="margin: 0 0 0.5rem 0;">Large</h4>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <sh-status-badge status="optimal" size="lg" data-theme="${args.theme}"></sh-status-badge>
            <sh-status-badge status="low" size="lg" data-theme="${args.theme}"></sh-status-badge>
            <sh-status-badge status="critical" size="lg" data-theme="${args.theme}"></sh-status-badge>
          </div>
        </div>
      </div>
    </div>
  `,
};

// Custom Labels
export const CustomLabels: Story = {
  args: {
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 300px; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        <sh-status-badge status="optimal" label="Stock Optimal" data-theme="${args.theme}"></sh-status-badge>
        <sh-status-badge status="low" label="Low Stock" data-theme="${args.theme}"></sh-status-badge>
        <sh-status-badge status="critical" label="Critical Level" data-theme="${args.theme}"></sh-status-badge>
        <sh-status-badge status="out-of-stock" label="Unavailable" data-theme="${args.theme}"></sh-status-badge>
        <sh-status-badge status="overstocked" label="Overstock" data-theme="${args.theme}"></sh-status-badge>
      </div>
    </div>
  `,
};

// In Context (Product Cards)
export const InContext: Story = {
  args: {
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 500px; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
      <div style="display: flex; flex-direction: column; gap: 1rem; width: 300px;">
        <!-- Product Card 1 - Optimal -->
        <div style="padding: 1rem; border: 1px solid ${args.theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#e5e7eb'}; border-radius: 8px; background: ${args.theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#ffffff'};">
          <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
            <h3 style="margin: 0; font-size: 1rem;">Acrylic Paint</h3>
            <sh-status-badge status="optimal" data-theme="${args.theme}"></sh-status-badge>
          </div>
          <p style="margin: 0.5rem 0 0 0; color: ${args.theme === 'dark' ? '#9ca3af' : '#6b7280'}; font-size: 0.875rem;">
            Quantity: 150 L
          </p>
        </div>

        <!-- Product Card 2 - Low -->
        <div style="padding: 1rem; border: 1px solid ${args.theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#e5e7eb'}; border-radius: 8px; background: ${args.theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#ffffff'};">
          <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
            <h3 style="margin: 0; font-size: 1rem;">Matte Varnish</h3>
            <sh-status-badge status="low" data-theme="${args.theme}"></sh-status-badge>
          </div>
          <p style="margin: 0.5rem 0 0 0; color: ${args.theme === 'dark' ? '#9ca3af' : '#6b7280'}; font-size: 0.875rem;">
            Quantity: 8 L
          </p>
        </div>

        <!-- Product Card 3 - Critical -->
        <div style="padding: 1rem; border: 1px solid ${args.theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#e5e7eb'}; border-radius: 8px; background: ${args.theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#ffffff'};">
          <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
            <h3 style="margin: 0; font-size: 1rem;">Pro Brushes</h3>
            <sh-status-badge status="critical" data-theme="${args.theme}"></sh-status-badge>
          </div>
          <p style="margin: 0.5rem 0 0 0; color: ${args.theme === 'dark' ? '#9ca3af' : '#6b7280'}; font-size: 0.875rem;">
            Quantity: 2 units
          </p>
        </div>

        <!-- Product Card 4 - Out of Stock -->
        <div style="padding: 1rem; border: 1px solid ${args.theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#e5e7eb'}; border-radius: 8px; background: ${args.theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#ffffff'};">
          <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
            <h3 style="margin: 0; font-size: 1rem;">Rollers</h3>
            <sh-status-badge status="out-of-stock" data-theme="${args.theme}"></sh-status-badge>
          </div>
          <p style="margin: 0.5rem 0 0 0; color: ${args.theme === 'dark' ? '#9ca3af' : '#6b7280'}; font-size: 0.875rem;">
            Quantity: 0
          </p>
        </div>

        <!-- Product Card 5 - Overstocked -->
        <div style="padding: 1rem; border: 1px solid ${args.theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#e5e7eb'}; border-radius: 8px; background: ${args.theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#ffffff'};">
          <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
            <h3 style="margin: 0; font-size: 1rem;">Drop Cloths</h3>
            <sh-status-badge status="overstocked" data-theme="${args.theme}"></sh-status-badge>
          </div>
          <p style="margin: 0.5rem 0 0 0; color: ${args.theme === 'dark' ? '#9ca3af' : '#6b7280'}; font-size: 0.875rem;">
            Quantity: 500 units
          </p>
        </div>
      </div>
    </div>
  `,
};

// In Table
export const InTable: Story = {
  args: {
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 400px; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
      <table style="border-collapse: collapse; width: 100%; min-width: 600px; background: ${args.theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#ffffff'}; border-radius: 8px; overflow: hidden;">
        <thead>
          <tr style="background: ${args.theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#f9fafb'}; border-bottom: 2px solid ${args.theme === 'dark' ? 'rgba(255,255,255,0.2)' : '#e5e7eb'};">
            <th style="padding: 0.75rem; text-align: left;">Product</th>
            <th style="padding: 0.75rem; text-align: right;">Quantity</th>
            <th style="padding: 0.75rem; text-align: center;">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom: 1px solid ${args.theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#e5e7eb'};">
            <td style="padding: 0.75rem;">White Paint</td>
            <td style="padding: 0.75rem; text-align: right;">120 L</td>
            <td style="padding: 0.75rem; text-align: center;">
              <sh-status-badge status="optimal" size="sm" data-theme="${args.theme}"></sh-status-badge>
            </td>
          </tr>
          <tr style="border-bottom: 1px solid ${args.theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#e5e7eb'};">
            <td style="padding: 0.75rem;">Red Paint</td>
            <td style="padding: 0.75rem; text-align: right;">12 L</td>
            <td style="padding: 0.75rem; text-align: center;">
              <sh-status-badge status="low" size="sm" data-theme="${args.theme}"></sh-status-badge>
            </td>
          </tr>
          <tr style="border-bottom: 1px solid ${args.theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#e5e7eb'};">
            <td style="padding: 0.75rem;">Blue Paint</td>
            <td style="padding: 0.75rem; text-align: right;">2 L</td>
            <td style="padding: 0.75rem; text-align: center;">
              <sh-status-badge status="critical" size="sm" data-theme="${args.theme}"></sh-status-badge>
            </td>
          </tr>
          <tr style="border-bottom: 1px solid ${args.theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#e5e7eb'};">
            <td style="padding: 0.75rem;">Yellow Paint</td>
            <td style="padding: 0.75rem; text-align: right;">0 L</td>
            <td style="padding: 0.75rem; text-align: center;">
              <sh-status-badge status="out-of-stock" size="sm" data-theme="${args.theme}"></sh-status-badge>
            </td>
          </tr>
          <tr>
            <td style="padding: 0.75rem;">Drop Cloths</td>
            <td style="padding: 0.75rem; text-align: right;">850 units</td>
            <td style="padding: 0.75rem; text-align: center;">
              <sh-status-badge status="overstocked" size="sm" data-theme="${args.theme}"></sh-status-badge>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
};

// Pulse Animation Demo
export const PulseAnimation: Story = {
  args: {
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 300px; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <div>
          <h4 style="margin: 0 0 0.5rem 0;">Animated (Critical & Out of Stock)</h4>
          <div style="display: flex; gap: 0.5rem;">
            <sh-status-badge status="critical" data-theme="${args.theme}"></sh-status-badge>
            <sh-status-badge status="out-of-stock" data-theme="${args.theme}"></sh-status-badge>
          </div>
        </div>

        <div>
          <h4 style="margin: 0 0 0.5rem 0;">Static (Optimal, Low, Overstocked)</h4>
          <div style="display: flex; gap: 0.5rem;">
            <sh-status-badge status="optimal" data-theme="${args.theme}"></sh-status-badge>
            <sh-status-badge status="low" data-theme="${args.theme}"></sh-status-badge>
            <sh-status-badge status="overstocked" data-theme="${args.theme}"></sh-status-badge>
          </div>
        </div>
      </div>
    </div>
  `,
};

// Interactive Playground
export const Playground: Story = {
  args: {
    status: 'optimal',
    size: 'md',
    label: '',
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 200px; display: flex; align-items: center; justify-content: center; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
      <sh-status-badge
        status="${args.status}"
        size="${args.size}"
        label="${args.label || undefined}"
        data-theme="${args.theme}"
      ></sh-status-badge>
    </div>
  `,
};
