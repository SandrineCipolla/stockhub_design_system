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

export const InteractiveDemo: Story = {
  args: { theme: 'dark' },
  render: (args) => `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: start; max-width: 900px;">
      <div>
        <sh-collaborator-list
          id="collab-list-demo"
          collaborators='${JSON.stringify(COLLABORATORS)}'
          viewer-role="OWNER"
          data-theme="${args.theme}"
          style="width: 420px;"
        ></sh-collaborator-list>
      </div>

      <div style="background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 1.5rem; min-height: 200px;">
        <h3 style="color: #f1f5f9; font-family: system-ui; margin: 0 0 1rem 0; font-size: 1rem;">
          📋 Journal d'événements
        </h3>
        <div id="collab-event-log" style="font-family: 'Courier New', monospace; font-size: 0.8rem; display: flex; flex-direction: column; gap: 0.5rem;">
          <p style="color: #94a3b8; margin: 0;">Aucun événement pour le moment...</p>
        </div>
      </div>
    </div>

    <script>
      customElements.whenDefined('sh-collaborator-list').then(() => {
        const list = document.getElementById('collab-list-demo');
        const log = document.getElementById('collab-event-log');

        function addEntry(name, detail, color) {
          if (log.querySelector('p')) log.innerHTML = '';
          const entry = document.createElement('div');
          entry.style.cssText = \`padding: 0.625rem; background: \${color}20; border-left: 3px solid \${color}; border-radius: 4px;\`;
          const time = new Date().toLocaleTimeString();
          entry.innerHTML = \`
            <div style="color: \${color}; font-weight: 600; font-size: 0.75rem;">\${name}</div>
            <div style="color: #94a3b8; font-size: 0.7rem;">\${time}</div>
            <div style="color: #cbd5e1; font-size: 0.75rem; margin-top: 0.25rem; white-space: pre-wrap;">\${JSON.stringify(detail, null, 2)}</div>
          \`;
          log.insertBefore(entry, log.firstChild);
          while (log.children.length > 5) log.removeChild(log.lastChild);
        }

        if (list) {
          list.addEventListener('collaborator-role-change', (e) => {
            addEntry('collaborator-role-change', e.detail, '#60a5fa');
          });
          list.addEventListener('collaborator-remove', (e) => {
            addEntry('collaborator-remove', e.detail, '#f87171');
          });
        }
      });
    </script>
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
