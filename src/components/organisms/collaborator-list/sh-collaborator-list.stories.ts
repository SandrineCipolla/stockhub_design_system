import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './sh-collaborator-list.ts';

const COLLABORATORS = [
  { id: 1, userEmail: 'alice@family.local', role: 'EDITOR' },
  { id: 2, userEmail: 'bob@family.local', role: 'VIEWER' },
  { id: 3, userEmail: 'charlie@family.local', role: 'VIEWER_CONTRIBUTOR' },
];

const meta: Meta = {
  title: 'Components/Organisms/CollaboratorList',
  component: 'sh-collaborator-list',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    viewerRole: {
      control: 'select',
      options: ['OWNER', 'EDITOR', 'VIEWER', 'VIEWER_CONTRIBUTOR'],
      description: "Rôle de l'utilisateur connecté",
    },
    disabled: { control: 'boolean', description: 'Désactive les actions' },
    theme: { control: 'select', options: ['light', 'dark'], description: 'Thème' },
  },
};

export default meta;
type Story = StoryObj;

export const AsOwner: Story = {
  args: { theme: 'dark' },
  render: (args) => `
    <sh-collaborator-list
      collaborators='${JSON.stringify(COLLABORATORS)}'
      viewer-role="OWNER"
      data-theme="${args.theme}"
      style="width: 420px;"
    ></sh-collaborator-list>
  `,
};

export const AsEditor: Story = {
  args: { theme: 'dark' },
  render: (args) => `
    <div>
      <p style="color: #94a3b8; font-size: 0.8rem; margin: 0 0 0.75rem;">
        Vue EDITOR — peut gérer VIEWER et VIEWER_CONTRIBUTOR uniquement
      </p>
      <sh-collaborator-list
        collaborators='${JSON.stringify(COLLABORATORS)}'
        viewer-role="EDITOR"
        data-theme="${args.theme}"
        style="width: 420px;"
      ></sh-collaborator-list>
    </div>
  `,
};

export const AsViewer: Story = {
  args: { theme: 'dark' },
  render: (args) => `
    <div>
      <p style="color: #94a3b8; font-size: 0.8rem; margin: 0 0 0.75rem;">
        Vue VIEWER — lecture seule, aucune action disponible
      </p>
      <sh-collaborator-list
        collaborators='${JSON.stringify(COLLABORATORS)}'
        viewer-role="VIEWER"
        data-theme="${args.theme}"
        style="width: 420px;"
      ></sh-collaborator-list>
    </div>
  `,
};

export const Empty: Story = {
  args: { theme: 'dark' },
  render: (args) => `
    <sh-collaborator-list
      collaborators='${JSON.stringify([])}'
      viewer-role="OWNER"
      data-theme="${args.theme}"
      style="width: 420px;"
    ></sh-collaborator-list>
  `,
};


export const Playground: Story = {
  args: { viewerRole: 'OWNER', disabled: false, theme: 'dark' },
  render: (args) => `
    <sh-collaborator-list
      collaborators='${JSON.stringify(COLLABORATORS)}'
      viewer-role="${args.viewerRole}"
      ?disabled="${args.disabled}"
      data-theme="${args.theme}"
      style="width: 420px;"
    ></sh-collaborator-list>
  `,
};
