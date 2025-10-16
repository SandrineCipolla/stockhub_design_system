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
      options: ['in-stock', 'low-stock', 'out-of-stock', 'restock-needed'],
      description: 'Statut du stock',
    },
    showIndicator: {
      control: 'boolean',
      description: 'Afficher le point coloré animé',
    },
    label: {
      control: 'text',
      description: 'Label personnalisé (override le label par défaut)',
    },
  },
};

export default meta;
type Story = StoryObj;

// All Status Types
export const AllStatusTypes: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 0.75rem;">
      <sh-status-badge status="in-stock"></sh-status-badge>
      <sh-status-badge status="low-stock"></sh-status-badge>
      <sh-status-badge status="out-of-stock"></sh-status-badge>
      <sh-status-badge status="restock-needed"></sh-status-badge>
    </div>
  `,
};

// With and Without Indicator
export const IndicatorComparison: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div>
        <h4 style="margin: 0 0 0.5rem 0;">With Indicator (default)</h4>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <sh-status-badge status="in-stock" showIndicator></sh-status-badge>
          <sh-status-badge status="low-stock" showIndicator></sh-status-badge>
          <sh-status-badge status="out-of-stock" showIndicator></sh-status-badge>
        </div>
      </div>

      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Without Indicator</h4>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <sh-status-badge status="in-stock" ?showIndicator="${false}"></sh-status-badge>
          <sh-status-badge status="low-stock" ?showIndicator="${false}"></sh-status-badge>
          <sh-status-badge status="out-of-stock" ?showIndicator="${false}"></sh-status-badge>
        </div>
      </div>
    </div>
  `,
};

// Custom Labels
export const CustomLabels: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 0.75rem;">
      <sh-status-badge status="in-stock" label="Disponible"></sh-status-badge>
      <sh-status-badge status="low-stock" label="Attention: Stock limité"></sh-status-badge>
      <sh-status-badge status="out-of-stock" label="Indisponible"></sh-status-badge>
      <sh-status-badge status="restock-needed" label="Commande en cours"></sh-status-badge>
    </div>
  `,
};

// In Context (Stock Card)
export const InContext: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem; width: 300px;">
      <!-- Product Card 1 -->
      <div style="padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px;">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
          <h3 style="margin: 0; font-size: 1rem;">Peinture Acrylique</h3>
          <sh-status-badge status="in-stock"></sh-status-badge>
        </div>
        <p style="margin: 0.5rem 0 0 0; color: #6b7280; font-size: 0.875rem;">
          Quantité: 50 L
        </p>
      </div>

      <!-- Product Card 2 -->
      <div style="padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px;">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
          <h3 style="margin: 0; font-size: 1rem;">Vernis Mat</h3>
          <sh-status-badge status="low-stock"></sh-status-badge>
        </div>
        <p style="margin: 0.5rem 0 0 0; color: #6b7280; font-size: 0.875rem;">
          Quantité: 5 L
        </p>
      </div>

      <!-- Product Card 3 -->
      <div style="padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px;">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
          <h3 style="margin: 0; font-size: 1rem;">Pinceaux Pro</h3>
          <sh-status-badge status="out-of-stock"></sh-status-badge>
        </div>
        <p style="margin: 0.5rem 0 0 0; color: #6b7280; font-size: 0.875rem;">
          Quantité: 0
        </p>
      </div>
    </div>
  `,
};

// With Table
export const InTable: Story = {
  render: () => `
    <table style="border-collapse: collapse; width: 100%; min-width: 500px;">
      <thead>
        <tr style="background: #f9fafb; border-bottom: 2px solid #e5e7eb;">
          <th style="padding: 0.75rem; text-align: left;">Produit</th>
          <th style="padding: 0.75rem; text-align: left;">Quantité</th>
          <th style="padding: 0.75rem; text-align: left;">Statut</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom: 1px solid #e5e7eb;">
          <td style="padding: 0.75rem;">Peinture Blanche</td>
          <td style="padding: 0.75rem;">120 L</td>
          <td style="padding: 0.75rem;">
            <sh-status-badge status="in-stock"></sh-status-badge>
          </td>
        </tr>
        <tr style="border-bottom: 1px solid #e5e7eb;">
          <td style="padding: 0.75rem;">Peinture Rouge</td>
          <td style="padding: 0.75rem;">8 L</td>
          <td style="padding: 0.75rem;">
            <sh-status-badge status="low-stock"></sh-status-badge>
          </td>
        </tr>
        <tr style="border-bottom: 1px solid #e5e7eb;">
          <td style="padding: 0.75rem;">Peinture Bleue</td>
          <td style="padding: 0.75rem;">0 L</td>
          <td style="padding: 0.75rem;">
            <sh-status-badge status="out-of-stock"></sh-status-badge>
          </td>
        </tr>
        <tr>
          <td style="padding: 0.75rem;">Peinture Jaune</td>
          <td style="padding: 0.75rem;">2 L</td>
          <td style="padding: 0.75rem;">
            <sh-status-badge status="restock-needed"></sh-status-badge>
          </td>
        </tr>
      </tbody>
    </table>
  `,
};

// Dark Mode
export const DarkMode: Story = {
  render: () => `
    <div style="display: flex; gap: 1rem; flex-direction: column;">
      <div style="padding: 2rem; background: white; border-radius: 8px;">
        <h4 style="margin-top: 0;">Light Mode</h4>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <sh-status-badge status="in-stock"></sh-status-badge>
          <sh-status-badge status="low-stock"></sh-status-badge>
          <sh-status-badge status="out-of-stock"></sh-status-badge>
          <sh-status-badge status="restock-needed"></sh-status-badge>
        </div>
      </div>

      <div style="padding: 2rem; background: #1e293b; border-radius: 8px;" data-theme="dark">
        <h4 style="margin-top: 0; color: white;">Dark Mode</h4>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <sh-status-badge status="in-stock" data-theme="dark"></sh-status-badge>
          <sh-status-badge status="low-stock" data-theme="dark"></sh-status-badge>
          <sh-status-badge status="out-of-stock" data-theme="dark"></sh-status-badge>
          <sh-status-badge status="restock-needed" data-theme="dark"></sh-status-badge>
        </div>
      </div>
    </div>
  `,
};

// Pulse Animation Demo
export const PulseAnimation: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Pulsing Indicators (in-stock, low-stock, restock-needed)</h4>
        <div style="display: flex; gap: 0.5rem;">
          <sh-status-badge status="in-stock"></sh-status-badge>
          <sh-status-badge status="low-stock"></sh-status-badge>
          <sh-status-badge status="restock-needed"></sh-status-badge>
        </div>
      </div>

      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Static Indicator (out-of-stock)</h4>
        <sh-status-badge status="out-of-stock"></sh-status-badge>
      </div>
    </div>
  `,
};

// Interactive Playground
export const Playground: Story = {
  args: {
    status: 'in-stock',
    showIndicator: true,
    label: '',
  },
  render: (args) => `
    <sh-status-badge
      status="${args.status}"
      ?showIndicator="${args.showIndicator}"
      label="${args.label || undefined}"
    ></sh-status-badge>
  `,
};
