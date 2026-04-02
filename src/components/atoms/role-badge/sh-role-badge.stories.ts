import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './sh-role-badge.ts';

const meta: Meta = {
  title: 'Components/Atoms/RoleBadge',
  component: 'sh-role-badge',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    role: {
      control: 'select',
      options: ['OWNER', 'EDITOR', 'VIEWER', 'VIEWER_CONTRIBUTOR'],
      description: 'Rôle du collaborateur',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille du badge',
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Thème',
    },
  },
};

export default meta;
type Story = StoryObj;

export const AllRoles: Story = {
  args: { theme: 'dark' },
  render: (args) => `
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
      <sh-role-badge role="OWNER" data-theme="${args.theme}"></sh-role-badge>
      <sh-role-badge role="EDITOR" data-theme="${args.theme}"></sh-role-badge>
      <sh-role-badge role="VIEWER" data-theme="${args.theme}"></sh-role-badge>
      <sh-role-badge role="VIEWER_CONTRIBUTOR" data-theme="${args.theme}"></sh-role-badge>
    </div>
  `,
};

export const AllSizes: Story = {
  args: { theme: 'dark' },
  render: (args) => `
    <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
      <sh-role-badge role="OWNER" size="sm" data-theme="${args.theme}"></sh-role-badge>
      <sh-role-badge role="OWNER" size="md" data-theme="${args.theme}"></sh-role-badge>
      <sh-role-badge role="OWNER" size="lg" data-theme="${args.theme}"></sh-role-badge>
    </div>
  `,
};


export const Playground: Story = {
  args: { role: 'OWNER', size: 'md', theme: 'dark' },
  render: (args) => `
    <sh-role-badge role="${args.role}" size="${args.size}" data-theme="${args.theme}"></sh-role-badge>
  `,
};
