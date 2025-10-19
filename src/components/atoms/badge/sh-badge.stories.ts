import type {Meta, StoryObj} from '@storybook/web-components';
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
  },
};

export default meta;
type Story = StoryObj;

// All Variants
export const AllVariants: Story = {
  render: () => `
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
      <sh-badge variant="success">Success</sh-badge>
      <sh-badge variant="warning">Warning</sh-badge>
      <sh-badge variant="danger">Danger</sh-badge>
      <sh-badge variant="info">Info</sh-badge>
      <sh-badge variant="default">Default</sh-badge>
    </div>
  `,
};

// All Sizes
export const AllSizes: Story = {
  render: () => `
    <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
      <sh-badge size="sm" variant="success">Small</sh-badge>
      <sh-badge size="md" variant="success">Medium</sh-badge>
      <sh-badge size="lg" variant="success">Large</sh-badge>
    </div>
  `,
};

// Pill Shape
export const PillShape: Story = {
  render: () => `
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
      <sh-badge variant="success" pill>Success Pill</sh-badge>
      <sh-badge variant="warning" pill>Warning Pill</sh-badge>
      <sh-badge variant="danger" pill>Danger Pill</sh-badge>
      <sh-badge variant="info" pill>Info Pill</sh-badge>
    </div>
  `,
};

// With Numbers
export const WithNumbers: Story = {
  render: () => `
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
      <sh-badge variant="success" pill>12</sh-badge>
      <sh-badge variant="danger" pill>99+</sh-badge>
      <sh-badge variant="info" size="sm" pill>3</sh-badge>
      <sh-badge variant="warning" size="lg" pill>42</sh-badge>
    </div>
  `,
};

// With Icons (using slot)
export const WithIcons: Story = {
  render: () => `
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
      <sh-badge variant="success">
        <sh-icon name="Check"></sh-icon> Completed
      </sh-badge>
      <sh-badge variant="warning">
        <sh-icon name="AlertTriangle"></sh-icon> Warning
      </sh-badge>
      <sh-badge variant="danger">
        <sh-icon name="X"></sh-icon> Error
      </sh-badge>
      <sh-badge variant="info">
        <sh-icon name="Info"></sh-icon> Info
      </sh-badge>
    </div>
  `,
};

// Usage Examples
export const UsageExamples: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <!-- Status Indicator -->
      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Status Indicator</h4>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <div>
            <span style="margin-right: 0.5rem;">User:</span>
            <sh-badge variant="success" pill>Active</sh-badge>
          </div>
          <div>
            <span style="margin-right: 0.5rem;">Order:</span>
            <sh-badge variant="warning" pill>Pending</sh-badge>
          </div>
          <div>
            <span style="margin-right: 0.5rem;">Payment:</span>
            <sh-badge variant="danger" pill>Failed</sh-badge>
          </div>
        </div>
      </div>

      <!-- Category Tags -->
      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Category Tags</h4>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <sh-badge variant="default">React</sh-badge>
          <sh-badge variant="default">TypeScript</sh-badge>
          <sh-badge variant="default">Web Components</sh-badge>
          <sh-badge variant="default">Storybook</sh-badge>
        </div>
      </div>

      <!-- Notification Count -->
      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Notification Badge</h4>
        <div style="display: inline-block; position: relative;">
          <sh-button variant="ghost" iconBefore="Bell">Notifications</sh-button>
          <span style="position: absolute; top: -8px; right: -8px;">
            <sh-badge variant="danger" size="sm" pill>5</sh-badge>
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
  },
  render: (args) => `
    <sh-badge
      variant="${args.variant}"
      size="${args.size}"
      ?pill="${args.pill}"
    >
      Badge Text
    </sh-badge>
  `,
};
