import type { Meta, StoryObj } from '@storybook/web-components';
import './sh-stock-item-card';

const meta: Meta = {
  title: 'Components/Organisms/StockItemCard',
  component: 'sh-stock-item-card',
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'Nom du produit'
    },
    sku: {
      control: 'text',
      description: 'SKU / Code produit'
    },
    quantity: {
      control: 'text',
      description: 'Quantité en stock'
    },
    value: {
      control: 'text',
      description: 'Valeur totale (optionnel)'
    },
    location: {
      control: 'text',
      description: 'Emplacement en entrepôt (optionnel)'
    },
    status: {
      control: 'select',
      options: ['optimal', 'low', 'critical', 'out-of-stock', 'overstocked'],
      description: 'Statut du stock',
      table: {
        defaultValue: { summary: 'optimal' }
      }
    },
    loading: {
      control: 'boolean',
      description: 'État de chargement',
      table: {
        defaultValue: { summary: 'false' }
      }
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Thème de la carte',
      table: {
        defaultValue: { summary: 'dark' }
      }
    }
  },
  args: {
    theme: 'dark',
  },
};

export default meta;
type Story = StoryObj;

// Background helper
const getBackground = (theme: string) => theme === 'dark'
  ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)'
  : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)';

/**
 * Carte de produit en stock optimal
 */
export const Optimal: Story = {
  args: {
    name: 'Peinture Acrylique 500ml - Bleu Cobalt',
    sku: 'PNT-001',
    quantity: '45',
    value: '€675',
    location: 'Atelier - Étagère 3',
    status: 'optimal',
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; min-height: 100vh; box-sizing: border-box;">
      <div style="max-width: 400px;">
        <sh-stock-item-card
          name="${args.name}"
          sku="${args.sku}"
          quantity="${args.quantity}"
          value="${args.value}"
          location="${args.location}"
          status="${args.status}"
          data-theme="${args.theme}"
          ${args.loading ? 'loading' : ''}
        ></sh-stock-item-card>
      </div>
    </div>

    <script>
      const card = document.querySelector('sh-stock-item-card');
      card.addEventListener('sh-view-click', (e) => {
        console.log('View clicked:', e.detail);
        alert('Voir les détails: ' + e.detail.name);
      });
      card.addEventListener('sh-edit-click', (e) => {
        console.log('Edit clicked:', e.detail);
        alert('Éditer: ' + e.detail.name);
      });
      card.addEventListener('sh-delete-click', (e) => {
        console.log('Delete clicked:', e.detail);
        if (confirm('Supprimer ' + e.detail.name + ' ?')) {
          console.log('Deleted!');
        }
      });
    </script>
  `,
};

/**
 * Stock faible (warning)
 */
export const LowStock: Story = {
  args: {
    name: 'Crayons Aquarelle (Boîte de 24)',
    sku: 'CRY-042',
    quantity: '8',
    value: '€240',
    location: 'Bureau - Tiroir 2',
    status: 'low',
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; min-height: 100vh; box-sizing: border-box;">
      <div style="max-width: 400px;">
        <sh-stock-item-card
          name="${args.name}"
          sku="${args.sku}"
          quantity="${args.quantity}"
          value="${args.value}"
          location="${args.location}"
          status="${args.status}"
          data-theme="${args.theme}"
        ></sh-stock-item-card>
      </div>
    </div>
  `,
};

/**
 * Stock critique (danger)
 */
export const CriticalStock: Story = {
  args: {
    name: 'Tissu Coton Bio - Blanc Écru (10m)',
    sku: 'TSU-088',
    quantity: '2',
    value: '€180',
    location: 'Cellier - Casier B',
    status: 'critical',
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; min-height: 100vh; box-sizing: border-box;">
      <div style="max-width: 400px;">
        <sh-stock-item-card
          name="${args.name}"
          sku="${args.sku}"
          quantity="${args.quantity}"
          value="${args.value}"
          location="${args.location}"
          status="${args.status}"
          data-theme="${args.theme}"
        ></sh-stock-item-card>
      </div>
    </div>
  `,
};

/**
 * Rupture de stock
 */
export const OutOfStock: Story = {
  args: {
    name: 'Papier Aquarelle 300g - Format A3',
    sku: 'PAP-156',
    quantity: '0',
    value: '€0',
    location: 'Bureau - Armoire 1',
    status: 'out-of-stock',
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; min-height: 100vh; box-sizing: border-box;">
      <div style="max-width: 400px;">
        <sh-stock-item-card
          name="${args.name}"
          sku="${args.sku}"
          quantity="${args.quantity}"
          value="${args.value}"
          location="${args.location}"
          status="${args.status}"
          data-theme="${args.theme}"
        ></sh-stock-item-card>
      </div>
    </div>
  `,
};

/**
 * Surstock
 */
export const Overstocked: Story = {
  args: {
    name: 'Pinceaux Synthétiques (Set de 5)',
    sku: 'PIN-201',
    quantity: '450',
    value: '€4,500',
    location: 'Atelier - Rangement Mural',
    status: 'overstocked',
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; min-height: 100vh; box-sizing: border-box;">
      <div style="max-width: 400px;">
        <sh-stock-item-card
          name="${args.name}"
          sku="${args.sku}"
          quantity="${args.quantity}"
          value="${args.value}"
          location="${args.location}"
          status="${args.status}"
          data-theme="${args.theme}"
        ></sh-stock-item-card>
      </div>
    </div>
  `,
};

/**
 * Sans valeur ni emplacement (minimal)
 */
export const Minimal: Story = {
  args: {
    name: 'Gomme Mie de Pain',
    sku: 'GOM-999',
    quantity: '25',
    status: 'optimal',
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; min-height: 100vh; box-sizing: border-box;">
      <div style="max-width: 400px;">
        <sh-stock-item-card
          name="${args.name}"
          sku="${args.sku}"
          quantity="${args.quantity}"
          status="${args.status}"
          data-theme="${args.theme}"
        ></sh-stock-item-card>
      </div>
    </div>
  `,
};

/**
 * État de chargement
 */
export const Loading: Story = {
  args: {
    name: 'Laptop Dell XPS 15',
    sku: 'LAP-001',
    quantity: '50',
    value: '€45,000',
    location: 'A-12-3',
    status: 'optimal',
    loading: true,
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; min-height: 100vh; box-sizing: border-box;">
      <div style="max-width: 400px;">
        <sh-stock-item-card
          name="${args.name}"
          sku="${args.sku}"
          quantity="${args.quantity}"
          value="${args.value}"
          location="${args.location}"
          status="${args.status}"
          data-theme="${args.theme}"
          ${args.loading ? 'loading' : ''}
        ></sh-stock-item-card>
      </div>
    </div>
  `,
};

/**
 * Tous les statuts côte à côte
 */
export const AllStatuses: Story = {
  args: {
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; min-height: 100vh; box-sizing: border-box;">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 1.5rem; max-width: 100%;">
        <sh-stock-item-card
          name="Peinture Acrylique 500ml - Bleu Cobalt"
          sku="PNT-001"
          quantity="45"
          value="€675"
          location="Atelier - Étagère 3"
          status="optimal"
          data-theme="${args.theme}"
        ></sh-stock-item-card>

        <sh-stock-item-card
          name="Crayons Aquarelle (Boîte de 24)"
          sku="CRY-042"
          quantity="8"
          value="€240"
          location="Bureau - Tiroir 2"
          status="low"
          data-theme="${args.theme}"
        ></sh-stock-item-card>

        <sh-stock-item-card
          name="Tissu Coton Bio - Blanc Écru (10m)"
          sku="TSU-088"
          quantity="2"
          value="€180"
          location="Cellier - Casier B"
          status="critical"
          data-theme="${args.theme}"
        ></sh-stock-item-card>

        <sh-stock-item-card
          name="Papier Aquarelle 300g - Format A3"
          sku="PAP-156"
          quantity="0"
          value="€0"
          location="Bureau - Armoire 1"
          status="out-of-stock"
          data-theme="${args.theme}"
        ></sh-stock-item-card>

        <sh-stock-item-card
          name="Pinceaux Synthétiques (Set de 5)"
          sku="PIN-201"
          quantity="450"
          value="€4,500"
          location="Atelier - Rangement Mural"
          status="overstocked"
          data-theme="${args.theme}"
        ></sh-stock-item-card>
      </div>
    </div>
  `,
};

/**
 * Grille d'inventaire réaliste
 */
export const InventoryGrid: Story = {
  args: {
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; min-height: 100vh; box-sizing: border-box;">
      <h2 style="color: ${args.theme === 'dark' ? '#f1f5f9' : '#1e293b'}; margin-bottom: 1.5rem; font-family: system-ui;">Inventaire - Matériel Créatif</h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 1.5rem; max-width: 100%;">
        <sh-stock-item-card
          name="Peinture Acrylique 500ml - Bleu Cobalt"
          sku="PNT-001"
          quantity="45"
          value="€675"
          location="Atelier - Étagère 3"
          status="optimal"
          data-theme="${args.theme}"
        ></sh-stock-item-card>

        <sh-stock-item-card
          name="Peinture Huile 200ml - Rouge Vermillon"
          sku="PNT-002"
          quantity="38"
          value="€950"
          location="Atelier - Étagère 2"
          status="optimal"
          data-theme="${args.theme}"
        ></sh-stock-item-card>

        <sh-stock-item-card
          name="Crayons Aquarelle (Boîte de 24)"
          sku="CRY-042"
          quantity="8"
          value="€240"
          location="Bureau - Tiroir 2"
          status="low"
          data-theme="${args.theme}"
        ></sh-stock-item-card>

        <sh-stock-item-card
          name="Tissu Coton Bio - Blanc Écru (10m)"
          sku="TSU-088"
          quantity="2"
          value="€180"
          location="Cellier - Casier B"
          status="critical"
          data-theme="${args.theme}"
        ></sh-stock-item-card>

        <sh-stock-item-card
          name="Papier Aquarelle 300g - Format A3"
          sku="PAP-156"
          quantity="0"
          value="€0"
          location="Bureau - Armoire 1"
          status="out-of-stock"
          data-theme="${args.theme}"
        ></sh-stock-item-card>

        <sh-stock-item-card
          name="Toile Tendue 60x80cm - Triple Épaisseur"
          sku="TOI-073"
          quantity="32"
          value="€1,280"
          location="Atelier - Rack A"
          status="optimal"
          data-theme="${args.theme}"
        ></sh-stock-item-card>

        <sh-stock-item-card
          name="Feutres Posca - Set Couleurs Pastel"
          sku="FEU-119"
          quantity="11"
          value="€330"
          location="Bureau - Tiroir 5"
          status="low"
          data-theme="${args.theme}"
        ></sh-stock-item-card>

        <sh-stock-item-card
          name="Pinceaux Synthétiques (Set de 5)"
          sku="PIN-201"
          quantity="450"
          value="€4,500"
          location="Atelier - Rangement Mural"
          status="overstocked"
          data-theme="${args.theme}"
        ></sh-stock-item-card>
      </div>
    </div>

    <script>
      document.querySelectorAll('sh-stock-item-card').forEach(card => {
        card.addEventListener('sh-view-click', (e) => {
          console.log('View:', e.detail);
        });
        card.addEventListener('sh-edit-click', (e) => {
          console.log('Edit:', e.detail);
        });
        card.addEventListener('sh-delete-click', (e) => {
          console.log('Delete:', e.detail);
        });
      });
    </script>
  `,
};
