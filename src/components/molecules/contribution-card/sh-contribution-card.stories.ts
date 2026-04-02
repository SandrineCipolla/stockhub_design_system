import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './sh-contribution-card.ts';

const meta: Meta = {
  title: 'Components/Molecules/ContributionCard',
  component: 'sh-contribution-card',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    itemLabel: { control: 'text', description: "Nom de l'item" },
    currentQuantity: { control: 'number', description: 'Quantité actuelle' },
    suggestedQuantity: { control: 'number', description: 'Quantité suggérée' },
    authorEmail: { control: 'text', description: 'Email du contributeur' },
    createdAt: { control: 'text', description: 'Date ISO de création' },
    status: {
      control: 'select',
      options: ['PENDING', 'APPROVED', 'REJECTED'],
      description: 'Statut de la contribution',
    },
    disabled: { control: 'boolean', description: 'Désactive les actions' },
    theme: { control: 'select', options: ['light', 'dark'], description: 'Thème' },
  },
};

export default meta;
type Story = StoryObj;

export const Pending: Story = {
  args: { theme: 'dark' },
  render: (args) => `
    <sh-contribution-card
      contribution-id="1"
      item-label="Lait demi-écrémé"
      current-quantity="3"
      suggested-quantity="1"
      author-email="enfant@family.local"
      created-at="2026-04-02T10:00:00Z"
      status="PENDING"
      data-theme="${args.theme}"
      style="width: 320px;"
    ></sh-contribution-card>
  `,
};

export const Approved: Story = {
  args: { theme: 'dark' },
  render: (args) => `
    <sh-contribution-card
      contribution-id="2"
      item-label="Farine T65"
      current-quantity="2"
      suggested-quantity="0"
      author-email="fils@family.local"
      created-at="2026-04-01T15:30:00Z"
      status="APPROVED"
      data-theme="${args.theme}"
      style="width: 320px;"
    ></sh-contribution-card>
  `,
};

export const Rejected: Story = {
  args: { theme: 'dark' },
  render: (args) => `
    <sh-contribution-card
      contribution-id="3"
      item-label="Huile d'olive"
      current-quantity="1"
      suggested-quantity="5"
      author-email="fille@family.local"
      created-at="2026-03-30T08:00:00Z"
      status="REJECTED"
      data-theme="${args.theme}"
      style="width: 320px;"
    ></sh-contribution-card>
  `,
};

export const AllStatuses: Story = {
  args: { theme: 'dark' },
  render: (args) => `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <sh-contribution-card
        contribution-id="1"
        item-label="Lait"
        current-quantity="3"
        suggested-quantity="1"
        author-email="enfant@family.local"
        created-at="2026-04-02T10:00:00Z"
        status="PENDING"
        data-theme="${args.theme}"
        style="width: 320px;"
      ></sh-contribution-card>
      <sh-contribution-card
        contribution-id="2"
        item-label="Farine"
        current-quantity="2"
        suggested-quantity="0"
        author-email="fils@family.local"
        status="APPROVED"
        data-theme="${args.theme}"
        style="width: 320px;"
      ></sh-contribution-card>
      <sh-contribution-card
        contribution-id="3"
        item-label="Huile"
        current-quantity="1"
        suggested-quantity="5"
        author-email="fille@family.local"
        status="REJECTED"
        data-theme="${args.theme}"
        style="width: 320px;"
      ></sh-contribution-card>
    </div>
  `,
};


export const InteractiveDemo: Story = {
  args: { theme: 'dark' },
  render: (args) => `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: start; max-width: 700px;">
      <sh-contribution-card
        id="contrib-card-demo"
        contribution-id="1"
        item-label="Lait demi-écrémé"
        current-quantity="3"
        suggested-quantity="1"
        author-email="enfant@family.local"
        created-at="2026-04-02T10:00:00Z"
        status="PENDING"
        data-theme="${args.theme}"
        style="width: 300px;"
      ></sh-contribution-card>

      <div style="background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 1.25rem; min-height: 160px;">
        <h3 style="color: #f1f5f9; font-family: system-ui; margin: 0 0 0.75rem 0; font-size: 0.9rem;">📋 Journal d'événements</h3>
        <div id="contrib-event-log" style="font-family: 'Courier New', monospace; font-size: 0.8rem; display: flex; flex-direction: column; gap: 0.5rem;">
          <p style="color: #94a3b8; margin: 0;">Aucun événement pour le moment...</p>
        </div>
      </div>
    </div>

    <script>
      customElements.whenDefined('sh-contribution-card').then(() => {
        const card = document.getElementById('contrib-card-demo');
        const log = document.getElementById('contrib-event-log');

        function addEntry(name, detail, color) {
          if (log.querySelector('p')) log.innerHTML = '';
          const entry = document.createElement('div');
          entry.style.cssText = \`padding: 0.5rem; background: \${color}20; border-left: 3px solid \${color}; border-radius: 4px;\`;
          entry.innerHTML = \`
            <div style="color: \${color}; font-weight: 600; font-size: 0.75rem;">\${name}</div>
            <div style="color: #94a3b8; font-size: 0.7rem;">\${new Date().toLocaleTimeString()}</div>
            <div style="color: #cbd5e1; font-size: 0.75rem; margin-top: 0.25rem;">\${JSON.stringify(detail)}</div>
          \`;
          log.insertBefore(entry, log.firstChild);
        }

        if (card) {
          card.addEventListener('contribution-approve', (e) => addEntry('contribution-approve', e.detail, '#4ade80'));
          card.addEventListener('contribution-reject', (e) => addEntry('contribution-reject', e.detail, '#f87171'));
        }
      });
    </script>
  `,
};

export const Playground: Story = {
  args: {
    itemLabel: 'Lait demi-écrémé',
    currentQuantity: 3,
    suggestedQuantity: 1,
    authorEmail: 'enfant@family.local',
    createdAt: '2026-04-02T10:00:00Z',
    status: 'PENDING',
    disabled: false,
    theme: 'dark',
  },
  render: (args) => `
    <sh-contribution-card
      contribution-id="1"
      item-label="${args.itemLabel}"
      current-quantity="${args.currentQuantity}"
      suggested-quantity="${args.suggestedQuantity}"
      author-email="${args.authorEmail}"
      created-at="${args.createdAt}"
      status="${args.status}"
      ?disabled="${args.disabled}"
      data-theme="${args.theme}"
      style="width: 320px;"
    ></sh-contribution-card>
  `,
};
