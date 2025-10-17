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
  },
};

export default meta;
type Story = StoryObj;

// All 5 Status Types
export const AllStatusTypes: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 0.75rem;">
      <sh-status-badge status="optimal"></sh-status-badge>
      <sh-status-badge status="low"></sh-status-badge>
      <sh-status-badge status="critical"></sh-status-badge>
      <sh-status-badge status="out-of-stock"></sh-status-badge>
      <sh-status-badge status="overstocked"></sh-status-badge>
    </div>
  `,
};

// All Sizes
export const AllSizes: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Small</h4>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <sh-status-badge status="optimal" size="sm"></sh-status-badge>
          <sh-status-badge status="low" size="sm"></sh-status-badge>
          <sh-status-badge status="critical" size="sm"></sh-status-badge>
        </div>
      </div>

      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Medium (default)</h4>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <sh-status-badge status="optimal" size="md"></sh-status-badge>
          <sh-status-badge status="low" size="md"></sh-status-badge>
          <sh-status-badge status="critical" size="md"></sh-status-badge>
        </div>
      </div>

      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Large</h4>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <sh-status-badge status="optimal" size="lg"></sh-status-badge>
          <sh-status-badge status="low" size="lg"></sh-status-badge>
          <sh-status-badge status="critical" size="lg"></sh-status-badge>
        </div>
      </div>
    </div>
  `,
};

// Custom Labels
export const CustomLabels: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 0.75rem;">
      <sh-status-badge status="optimal" label="Stock Optimal"></sh-status-badge>
      <sh-status-badge status="low" label="Low Stock"></sh-status-badge>
      <sh-status-badge status="critical" label="Critical Level"></sh-status-badge>
      <sh-status-badge status="out-of-stock" label="Unavailable"></sh-status-badge>
      <sh-status-badge status="overstocked" label="Overstock"></sh-status-badge>
    </div>
  `,
};

// In Context (Product Cards)
export const InContext: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem; width: 300px;">
      <!-- Product Card 1 - Optimal -->
      <div style="padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px;">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
          <h3 style="margin: 0; font-size: 1rem;">Acrylic Paint</h3>
          <sh-status-badge status="optimal"></sh-status-badge>
        </div>
        <p style="margin: 0.5rem 0 0 0; color: #6b7280; font-size: 0.875rem;">
          Quantity: 150 L
        </p>
      </div>

      <!-- Product Card 2 - Low -->
      <div style="padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px;">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
          <h3 style="margin: 0; font-size: 1rem;">Matte Varnish</h3>
          <sh-status-badge status="low"></sh-status-badge>
        </div>
        <p style="margin: 0.5rem 0 0 0; color: #6b7280; font-size: 0.875rem;">
          Quantity: 8 L
        </p>
      </div>

      <!-- Product Card 3 - Critical -->
      <div style="padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px;">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
          <h3 style="margin: 0; font-size: 1rem;">Pro Brushes</h3>
          <sh-status-badge status="critical"></sh-status-badge>
        </div>
        <p style="margin: 0.5rem 0 0 0; color: #6b7280; font-size: 0.875rem;">
          Quantity: 2 units
        </p>
      </div>

      <!-- Product Card 4 - Out of Stock -->
      <div style="padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px;">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
          <h3 style="margin: 0; font-size: 1rem;">Rollers</h3>
          <sh-status-badge status="out-of-stock"></sh-status-badge>
        </div>
        <p style="margin: 0.5rem 0 0 0; color: #6b7280; font-size: 0.875rem;">
          Quantity: 0
        </p>
      </div>

      <!-- Product Card 5 - Overstocked -->
      <div style="padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px;">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
          <h3 style="margin: 0; font-size: 1rem;">Drop Cloths</h3>
          <sh-status-badge status="overstocked"></sh-status-badge>
        </div>
        <p style="margin: 0.5rem 0 0 0; color: #6b7280; font-size: 0.875rem;">
          Quantity: 500 units
        </p>
      </div>
    </div>
  `,
};

// In Table
export const InTable: Story = {
  render: () => `
    <table style="border-collapse: collapse; width: 100%; min-width: 600px;">
      <thead>
        <tr style="background: #f9fafb; border-bottom: 2px solid #e5e7eb;">
          <th style="padding: 0.75rem; text-align: left; color: #111827;">Product</th>
          <th style="padding: 0.75rem; text-align: right; color: #111827;">Quantity</th>
          <th style="padding: 0.75rem; text-align: center; color: #111827;">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom: 1px solid #e5e7eb;">
          <td style="padding: 0.75rem; color: #111827;">White Paint</td>
          <td style="padding: 0.75rem; text-align: right; color: #111827;">120 L</td>
          <td style="padding: 0.75rem; text-align: center;">
            <sh-status-badge status="optimal" size="sm"></sh-status-badge>
          </td>
        </tr>
        <tr style="border-bottom: 1px solid #e5e7eb;">
          <td style="padding: 0.75rem; color: #111827;">Red Paint</td>
          <td style="padding: 0.75rem; text-align: right; color: #111827;">12 L</td>
          <td style="padding: 0.75rem; text-align: center;">
            <sh-status-badge status="low" size="sm"></sh-status-badge>
          </td>
        </tr>
        <tr style="border-bottom: 1px solid #e5e7eb;">
          <td style="padding: 0.75rem; color: #111827;">Blue Paint</td>
          <td style="padding: 0.75rem; text-align: right; color: #111827;">2 L</td>
          <td style="padding: 0.75rem; text-align: center;">
            <sh-status-badge status="critical" size="sm"></sh-status-badge>
          </td>
        </tr>
        <tr style="border-bottom: 1px solid #e5e7eb;">
          <td style="padding: 0.75rem; color: #111827;">Yellow Paint</td>
          <td style="padding: 0.75rem; text-align: right; color: #111827;">0 L</td>
          <td style="padding: 0.75rem; text-align: center;">
            <sh-status-badge status="out-of-stock" size="sm"></sh-status-badge>
          </td>
        </tr>
        <tr>
          <td style="padding: 0.75rem; color: #111827;">Drop Cloths</td>
          <td style="padding: 0.75rem; text-align: right; color: #111827;">850 units</td>
          <td style="padding: 0.75rem; text-align: center;">
            <sh-status-badge status="overstocked" size="sm"></sh-status-badge>
          </td>
        </tr>
      </tbody>
    </table>
  `,
};

// Pulse Animation Demo
export const PulseAnimation: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Animated (Critical & Out of Stock)</h4>
        <div style="display: flex; gap: 0.5rem;">
          <sh-status-badge status="critical"></sh-status-badge>
          <sh-status-badge status="out-of-stock"></sh-status-badge>
        </div>
      </div>

      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Static (Optimal, Low, Overstocked)</h4>
        <div style="display: flex; gap: 0.5rem;">
          <sh-status-badge status="optimal"></sh-status-badge>
          <sh-status-badge status="low"></sh-status-badge>
          <sh-status-badge status="overstocked"></sh-status-badge>
        </div>
      </div>
    </div>
  `,
};

// Dark Mode
export const DarkMode: Story = {
  render: () => `
    <div style="display: flex; gap: 1rem; flex-direction: column;">
      <div style="padding: 2rem; background: white; border-radius: 8px;">
        <h4 style="margin-top: 0; color: #111827;">Light Mode</h4>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <sh-status-badge status="optimal"></sh-status-badge>
          <sh-status-badge status="low"></sh-status-badge>
          <sh-status-badge status="critical"></sh-status-badge>
          <sh-status-badge status="out-of-stock"></sh-status-badge>
          <sh-status-badge status="overstocked"></sh-status-badge>
        </div>
      </div>

      <div style="padding: 2rem; background: #1e293b; border-radius: 8px;" data-theme="dark">
        <h4 style="margin-top: 0; color: #f3f4f6;">Dark Mode</h4>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <sh-status-badge status="optimal" data-theme="dark"></sh-status-badge>
          <sh-status-badge status="low" data-theme="dark"></sh-status-badge>
          <sh-status-badge status="critical" data-theme="dark"></sh-status-badge>
          <sh-status-badge status="out-of-stock" data-theme="dark"></sh-status-badge>
          <sh-status-badge status="overstocked" data-theme="dark"></sh-status-badge>
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
  },
  render: (args) => `
    <sh-status-badge
      status="${args.status}"
      size="${args.size}"
      label="${args.label || undefined}"
    ></sh-status-badge>
  `,
};
