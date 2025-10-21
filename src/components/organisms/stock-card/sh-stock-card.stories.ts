import type { Meta, StoryObj } from '@storybook/web-components';
import './sh-stock-card';

const meta: Meta = {
  title: 'Components/Organisms/StockCard',
  component: 'sh-stock-card',
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'Nom du stock'
    },
    category: {
      control: 'text',
      description: 'Catégorie du produit'
    },
    lastUpdate: {
      control: 'text',
      description: 'Date/heure de dernière mise à jour'
    },
    percentage: {
      control: 'text',
      description: 'Pourcentage de stock disponible'
    },
    quantity: {
      control: 'text',
      description: 'Sous-texte de quantité (ex: "1 tube")'
    },
    value: {
      control: 'text',
      description: 'Valeur totale du stock'
    },
    status: {
      control: 'select',
      options: ['optimal', 'low', 'critical', 'out-of-stock', 'overstocked'],
      description: 'Statut du stock',
      table: {
        defaultValue: { summary: 'optimal' }
      }
    },
    iaCount: {
      control: 'number',
      description: "Nombre d'alertes IA (0 = pas de badge)",
      table: {
        defaultValue: { summary: '0' }
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
 * Stock optimal - comme dans StockHub V2
 */
export const Optimal: Story = {
  args: {
    name: 'Acrylique Bleu Cobalt',
    category: 'Peinture',
    lastUpdate: 'Mis à jour il y a 3i',
    percentage: '65',
    quantity: '1 tube',
    value: '€12',
    status: 'optimal',
    iaCount: 0,
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; min-height: 100vh; box-sizing: border-box;">
      <div style="max-width: 400px;">
        <sh-stock-card
          id="stock-card-optimal"
          name="${args.name}"
          category="${args.category}"
          last-update="${args.lastUpdate}"
          percentage="${args.percentage}"
          quantity="${args.quantity}"
          value="${args.value}"
          status="${args.status}"
          data-theme="${args.theme}"
          ${args.loading ? 'loading' : ''}
        ></sh-stock-card>
      </div>
    </div>

    <script>
      customElements.whenDefined('sh-stock-card').then(() => {
        const card = document.getElementById('stock-card-optimal');
        if (card) {
          card.iaCount = ${args.iaCount || 0};

          card.addEventListener('sh-session-click', (e) => {
            console.log('Session clicked:', e.detail);
            alert('Enregistrer session: ' + e.detail.name);
          });
          card.addEventListener('sh-details-click', (e) => {
            console.log('Details clicked:', e.detail);
            alert('Voir détails: ' + e.detail.name);
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
        }
      });
    </script>
  `,
};

/**
 * Stock faible avec alerte IA
 */
export const LowWithIA: Story = {
  args: {
    name: 'Acrylique Rouge Vermillon',
    category: 'Peinture',
    lastUpdate: 'Mis à jour il y a 1sem',
    percentage: '15',
    quantity: '1 tube',
    value: '€12',
    status: 'low',
    iaCount: 1,
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; min-height: 100vh; box-sizing: border-box;">
      <div style="max-width: 400px;">
        <sh-stock-card
          id="stock-card-low"
          name="${args.name}"
          category="${args.category}"
          last-update="${args.lastUpdate}"
          percentage="${args.percentage}"
          quantity="${args.quantity}"
          value="${args.value}"
          status="${args.status}"
          data-theme="${args.theme}"
        ></sh-stock-card>
      </div>
    </div>

    <script>
      customElements.whenDefined('sh-stock-card').then(() => {
        const card = document.getElementById('stock-card-low');
        if (card) {
          card.iaCount = ${args.iaCount || 0};
        }
      });
    </script>
  `,
};

/**
 * Stock critique
 */
export const Critical: Story = {
  args: {
    name: 'Peinture Acrylique Jaune Cadmium',
    category: 'Peinture',
    lastUpdate: 'Mis à jour il y a 2j',
    percentage: '5',
    quantity: '2 tubes',
    value: '€24',
    status: 'critical',
    iaCount: 2,
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; min-height: 100vh; box-sizing: border-box;">
      <div style="max-width: 400px;">
        <sh-stock-card
          id="stock-card-critical"
          name="${args.name}"
          category="${args.category}"
          last-update="${args.lastUpdate}"
          percentage="${args.percentage}"
          quantity="${args.quantity}"
          value="${args.value}"
          status="${args.status}"
          data-theme="${args.theme}"
        ></sh-stock-card>
      </div>
    </div>

    <script>
      customElements.whenDefined('sh-stock-card').then(() => {
        const card = document.getElementById('stock-card-critical');
        if (card) {
          card.iaCount = ${args.iaCount || 0};
        }
      });
    </script>
  `,
};

/**
 * Rupture de stock
 */
export const OutOfStock: Story = {
  args: {
    name: 'Feutrine Rouge',
    category: 'Textile',
    lastUpdate: 'Mis à jour il y a 5j',
    percentage: '0',
    quantity: '0 rouleau',
    value: '€0',
    status: 'out-of-stock',
    iaCount: 1,
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; min-height: 100vh; box-sizing: border-box;">
      <div style="max-width: 400px;">
        <sh-stock-card
          id="stock-card-out"
          name="${args.name}"
          category="${args.category}"
          last-update="${args.lastUpdate}"
          percentage="${args.percentage}"
          quantity="${args.quantity}"
          value="${args.value}"
          status="${args.status}"
          data-theme="${args.theme}"
        ></sh-stock-card>
      </div>
    </div>

    <script>
      customElements.whenDefined('sh-stock-card').then(() => {
        const card = document.getElementById('stock-card-out');
        if (card) {
          card.iaCount = ${args.iaCount || 0};
        }
      });
    </script>
  `,
};

/**
 * Surstock
 */
export const Overstocked: Story = {
  args: {
    name: 'Pinceaux Synthétiques',
    category: 'Outils',
    lastUpdate: 'Mis à jour il y a 1h',
    percentage: '180',
    quantity: '450 unités',
    value: '€4,500',
    status: 'overstocked',
    iaCount: 0,
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; min-height: 100vh; box-sizing: border-box;">
      <div style="max-width: 400px;">
        <sh-stock-card
          id="stock-card-over"
          name="${args.name}"
          category="${args.category}"
          last-update="${args.lastUpdate}"
          percentage="${args.percentage}"
          quantity="${args.quantity}"
          value="${args.value}"
          status="${args.status}"
          data-theme="${args.theme}"
        ></sh-stock-card>
      </div>
    </div>

    <script>
      customElements.whenDefined('sh-stock-card').then(() => {
        const card = document.getElementById('stock-card-over');
        if (card) {
          card.iaCount = ${args.iaCount || 0};
        }
      });
    </script>
  `,
};

/**
 * Minimal (sans catégorie ni mise à jour)
 */
export const Minimal: Story = {
  args: {
    name: 'Gomme Mie de Pain',
    percentage: '80',
    quantity: '25 unités',
    value: '€125',
    status: 'optimal',
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; min-height: 100vh; box-sizing: border-box;">
      <div style="max-width: 400px;">
        <sh-stock-card
          id="stock-card-minimal"
          name="${args.name}"
          percentage="${args.percentage}"
          quantity="${args.quantity}"
          value="${args.value}"
          status="${args.status}"
          data-theme="${args.theme}"
        ></sh-stock-card>
      </div>
    </div>

    <script>
      customElements.whenDefined('sh-stock-card').then(() => {
        const card = document.getElementById('stock-card-minimal');
        if (card) {
          card.iaCount = 0;
        }
      });
    </script>
  `,
};

/**
 * État de chargement
 */
export const Loading: Story = {
  args: {
    name: 'Acrylique Bleu Cobalt',
    category: 'Peinture',
    lastUpdate: 'Mis à jour il y a 3i',
    percentage: '65',
    quantity: '1 tube',
    value: '€12',
    status: 'optimal',
    loading: true,
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; min-height: 100vh; box-sizing: border-box;">
      <div style="max-width: 400px;">
        <sh-stock-card
          id="stock-card-loading"
          name="${args.name}"
          category="${args.category}"
          last-update="${args.lastUpdate}"
          percentage="${args.percentage}"
          quantity="${args.quantity}"
          value="${args.value}"
          status="${args.status}"
          data-theme="${args.theme}"
          ${args.loading ? 'loading' : ''}
        ></sh-stock-card>
      </div>
    </div>

    <script>
      customElements.whenDefined('sh-stock-card').then(() => {
        const card = document.getElementById('stock-card-loading');
        if (card) {
          card.iaCount = 0;
        }
      });
    </script>
  `,
};

/**
 * Dashboard - Grille de stocks (comme dans StockHub V2)
 */
export const Dashboard: Story = {
  args: {
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; min-height: 100vh; box-sizing: border-box;">
      <div style="margin-bottom: 2rem;">
        <h1 style="color: ${args.theme === 'dark' ? '#f1f5f9' : '#1e293b'}; font-family: system-ui; margin: 0 0 0.5rem 0;">Mes Stocks Récents (18)</h1>
        <button style="background: var(--color-primary-500); color: white; border: none; padding: 0.5rem 1rem; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 600;">
          Exporter
        </button>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 1.5rem;">
        <sh-stock-card
          id="dash-card-1"
          name="Acrylique Bleu Cobalt"
          category="Peinture"
          last-update="Mis à jour il y a 3i"
          percentage="65"
          quantity="1 tube"
          value="€12"
          status="optimal"
          data-theme="${args.theme}"
        ></sh-stock-card>

        <sh-stock-card
          id="dash-card-2"
          name="Acrylique Rouge Vermillon"
          category="Peinture"
          last-update="Mis à jour il y a 1sem"
          percentage="15"
          quantity="1 tube"
          value="€12"
          status="low"
          data-theme="${args.theme}"
        ></sh-stock-card>

        <sh-stock-card
          id="dash-card-3"
          name="Peinture Acrylique Jaune Cadmium"
          category="Peinture"
          last-update="Mis à jour il y a 2j"
          percentage="5"
          quantity="2 tubes"
          value="€24"
          status="critical"
          data-theme="${args.theme}"
        ></sh-stock-card>

        <sh-stock-card
          id="dash-card-4"
          name="Tissu Coton Bio - Blanc"
          category="Textile"
          last-update="Mis à jour il y a 4j"
          percentage="45"
          quantity="10 mètres"
          value="€180"
          status="optimal"
          data-theme="${args.theme}"
        ></sh-stock-card>

        <sh-stock-card
          id="dash-card-5"
          name="Feutrine Rouge"
          category="Textile"
          last-update="Mis à jour il y a 5j"
          percentage="0"
          quantity="0 rouleau"
          value="€0"
          status="out-of-stock"
          data-theme="${args.theme}"
        ></sh-stock-card>

        <sh-stock-card
          id="dash-card-6"
          name="Pinceaux Synthétiques"
          category="Outils"
          last-update="Mis à jour il y a 1h"
          percentage="180"
          quantity="450 unités"
          value="€4,500"
          status="overstocked"
          data-theme="${args.theme}"
        ></sh-stock-card>
      </div>
    </div>

    <script>
      customElements.whenDefined('sh-stock-card').then(() => {
        // Set iaCount for cards that need it
        const card1 = document.getElementById('dash-card-1');
        const card2 = document.getElementById('dash-card-2');
        const card3 = document.getElementById('dash-card-3');
        const card4 = document.getElementById('dash-card-4');
        const card5 = document.getElementById('dash-card-5');
        const card6 = document.getElementById('dash-card-6');

        if (card1) card1.iaCount = 0;
        if (card2) card2.iaCount = 1;
        if (card3) card3.iaCount = 2;
        if (card4) card4.iaCount = 0;
        if (card5) card5.iaCount = 1;
        if (card6) card6.iaCount = 0;

        // Add event listeners
        document.querySelectorAll('sh-stock-card').forEach(card => {
          card.addEventListener('sh-session-click', (e) => {
            console.log('Session:', e.detail);
          });
          card.addEventListener('sh-details-click', (e) => {
            console.log('Details:', e.detail);
          });
          card.addEventListener('sh-edit-click', (e) => {
            console.log('Edit:', e.detail);
          });
          card.addEventListener('sh-delete-click', (e) => {
            console.log('Delete:', e.detail);
          });
        });
      });
    </script>
  `,
};
