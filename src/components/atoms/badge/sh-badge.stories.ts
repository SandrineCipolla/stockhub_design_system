import type {Meta, StoryObj} from '@storybook/web-components-vite';
import './sh-badge.ts';
import '../../atoms/icon/sh-icon.ts';
import '../../molecules/button/sh-button.ts';

const meta: Meta = {
  title: 'Components/Atoms/Badge',
  component: 'sh-badge',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'warning', 'danger', 'info', 'default'],
      description: 'Variant de couleur du badge',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille du badge',
    },
    pill: {
      control: 'boolean',
      description: 'Bordures arrondies complètes',
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Thème du badge (light ou dark)',
    },
  },
};

export default meta;
type Story = StoryObj;

// All Variants
export const AllVariants: Story = {
  args: {
    theme: 'dark',
  },
  render: (args) => `
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
      <sh-badge variant="success" data-theme="${args.theme}">Success</sh-badge>
      <sh-badge variant="warning" data-theme="${args.theme}">Warning</sh-badge>
      <sh-badge variant="danger" data-theme="${args.theme}">Danger</sh-badge>
      <sh-badge variant="info" data-theme="${args.theme}">Info</sh-badge>
      <sh-badge variant="default" data-theme="${args.theme}">Default</sh-badge>
    </div>
  `,
};

// All Sizes
export const AllSizes: Story = {
  args: {
    theme: 'dark',
  },
  render: (args) => `
    <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
      <sh-badge size="sm" variant="success" data-theme="${args.theme}">Small</sh-badge>
      <sh-badge size="md" variant="success" data-theme="${args.theme}">Medium</sh-badge>
      <sh-badge size="lg" variant="success" data-theme="${args.theme}">Large</sh-badge>
    </div>
  `,
};

// Pill Shape
export const PillShape: Story = {
  args: {
    theme: 'dark',
  },
  render: (args) => `
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
      <sh-badge variant="success" pill data-theme="${args.theme}">Success Pill</sh-badge>
      <sh-badge variant="warning" pill data-theme="${args.theme}">Warning Pill</sh-badge>
      <sh-badge variant="danger" pill data-theme="${args.theme}">Danger Pill</sh-badge>
      <sh-badge variant="info" pill data-theme="${args.theme}">Info Pill</sh-badge>
    </div>
  `,
};

// With Numbers
export const WithNumbers: Story = {
  args: {
    theme: 'dark',
  },
  render: (args) => `
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
      <sh-badge variant="success" pill data-theme="${args.theme}">12</sh-badge>
      <sh-badge variant="danger" pill data-theme="${args.theme}">99+</sh-badge>
      <sh-badge variant="info" size="sm" pill data-theme="${args.theme}">3</sh-badge>
      <sh-badge variant="warning" size="lg" pill data-theme="${args.theme}">42</sh-badge>
    </div>
  `,
};

// With Icons (using slot)
export const WithIcons: Story = {
  args: {
    theme: 'dark',
  },
  render: (args) => `
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
      <sh-badge variant="success" data-theme="${args.theme}">
        <sh-icon name="Check" data-theme="${args.theme}"></sh-icon> Completed
      </sh-badge>
      <sh-badge variant="warning" data-theme="${args.theme}">
        <sh-icon name="AlertTriangle" data-theme="${args.theme}"></sh-icon> Warning
      </sh-badge>
      <sh-badge variant="danger" data-theme="${args.theme}">
        <sh-icon name="X" data-theme="${args.theme}"></sh-icon> Error
      </sh-badge>
      <sh-badge variant="info" data-theme="${args.theme}">
        <sh-icon name="Info" data-theme="${args.theme}"></sh-icon> Info
      </sh-badge>
    </div>
  `,
};

// Usage Examples
export const UsageExamples: Story = {
  args: {
    theme: 'dark',
  },
  render: (args) => `
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <!-- Status Indicator -->
      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Status Indicator</h4>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <div>
            <span style="margin-right: 0.5rem;">User:</span>
            <sh-badge variant="success" pill data-theme="${args.theme}">Active</sh-badge>
          </div>
          <div>
            <span style="margin-right: 0.5rem;">Order:</span>
            <sh-badge variant="warning" pill data-theme="${args.theme}">Pending</sh-badge>
          </div>
          <div>
            <span style="margin-right: 0.5rem;">Payment:</span>
            <sh-badge variant="danger" pill data-theme="${args.theme}">Failed</sh-badge>
          </div>
        </div>
      </div>

      <!-- Category Tags -->
      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Category Tags</h4>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <sh-badge variant="default" data-theme="${args.theme}">React</sh-badge>
          <sh-badge variant="default" data-theme="${args.theme}">TypeScript</sh-badge>
          <sh-badge variant="default" data-theme="${args.theme}">Web Components</sh-badge>
          <sh-badge variant="default" data-theme="${args.theme}">Storybook</sh-badge>
        </div>
      </div>

      <!-- Notification Count -->
      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Notification Badge</h4>
        <div style="display: inline-block; position: relative;">
          <sh-button variant="ghost" iconBefore="Bell" data-theme="${args.theme}">Notifications</sh-button>
          <span style="position: absolute; top: -8px; right: -8px;">
            <sh-badge variant="danger" size="sm" pill data-theme="${args.theme}">5</sh-badge>
          </span>
        </div>
      </div>
    </div>
  `,
};

// Interactive Playground
export const Playground: Story = {
  args: {
    variant: 'success',
    size: 'md',
    pill: false,
    theme: 'dark',
  },
  render: (args) => `
    <sh-badge
      variant="${args.variant}"
      size="${args.size}"
      ?pill="${args.pill}"
      data-theme="${args.theme}"
    >
      Badge Text
    </sh-badge>
  `,
};
