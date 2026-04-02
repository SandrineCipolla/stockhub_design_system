import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './sh-role-selector.ts';

const meta: Meta = {
  title: 'Components/Molecules/RoleSelector',
  component: 'sh-role-selector',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'select',
      options: ['OWNER', 'EDITOR', 'VIEWER', 'VIEWER_CONTRIBUTOR'],
      description: 'Rôle sélectionné',
    },
    exclude: {
      control: 'text',
      description: 'Rôles à exclure (ex: "OWNER" pour un EDITOR)',
    },
    disabled: {
      control: 'boolean',
      description: 'Désactive le sélecteur',
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

export const Default: Story = {
  args: { value: 'VIEWER', theme: 'dark' },
  render: (args) => `
    <sh-role-selector value="${args.value}" data-theme="${args.theme}"></sh-role-selector>
  `,
};

export const EditorRestricted: Story = {
  args: { theme: 'dark' },
  render: (args) => `
    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
      <p style="color: #94a3b8; font-size: 0.875rem; margin: 0;">Vue EDITOR — ne peut pas attribuer OWNER</p>
      <sh-role-selector value="VIEWER" exclude="OWNER" data-theme="${args.theme}"></sh-role-selector>
    </div>
  `,
};

export const Disabled: Story = {
  args: { theme: 'dark' },
  render: (args) => `
    <sh-role-selector value="VIEWER" disabled data-theme="${args.theme}"></sh-role-selector>
  `,
};

export const LightMode: Story = {
  args: { theme: 'light' },
  render: (args) => `
    <div style="background: white; padding: 1rem; border-radius: 8px;">
      <sh-role-selector value="EDITOR" data-theme="${args.theme}"></sh-role-selector>
    </div>
  `,
};

export const Playground: Story = {
  args: { value: 'VIEWER', exclude: '', disabled: false, theme: 'dark' },
  render: (args) => `
    <sh-role-selector
      value="${args.value}"
      exclude="${args.exclude}"
      ?disabled="${args.disabled}"
      data-theme="${args.theme}"
    ></sh-role-selector>
  `,
};
