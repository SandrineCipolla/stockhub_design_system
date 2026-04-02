import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './sh-contribution-card.ts';

const meta: Meta = {
  title: 'Components/Molecules/ContributionCard',
  component: 'sh-contribution-card',
  parameters: {
    layout: 'centered',
    actions: { handles: ['contribution-approve', 'contribution-reject'] },
  },
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
