import type { Meta, StoryObj } from '@storybook/web-components';
import { expect, userEvent } from '@storybook/test';
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
      description: "Nombre d'alertes IA (0 = pas de badge). Le badge hérite automatiquement de la couleur du statut.",
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
    lastUpdate: 'Mis à jour il y a 3h',
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

/**
 * Story interactive - Démonstration "Enregistrer session"
 */
export const InteractiveEvents: Story = {
  args: {
    name: 'Acrylique Bleu Cobalt',
    category: 'Peinture',
    lastUpdate: 'Mis à jour il y a 3h',
    percentage: '65',
    quantity: '1 tube',
    value: '€12',
    status: 'optimal',
    iaCount: 1,
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; min-height: 100vh; box-sizing: border-box;">
      <div style="max-width: 800px; margin: 0 auto;">
        <h2 style="color: ${args.theme === 'dark' ? '#f1f5f9' : '#1e293b'}; font-family: system-ui; margin-bottom: 1.5rem;">
          📦 Enregistrer une Session Créative
        </h2>
        <p style="color: ${args.theme === 'dark' ? '#cbd5e1' : '#64748b'}; font-family: system-ui; margin-bottom: 2rem;">
          Cliquez sur <strong>"Enregistrer session"</strong> pour simuler l'utilisation de matériel. La quantité diminuera et le statut peut changer.
        </p>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: start;">
          <!-- Stock Card -->
          <div>
            <sh-stock-card
              id="stock-card-interactive"
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

          <!-- Event Log -->
          <div>
            <div style="background: rgba(0, 0, 0, 0.2); border: 1px solid ${args.theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}; border-radius: 12px; padding: 1.5rem; min-height: 400px;">
              <h3 style="color: ${args.theme === 'dark' ? '#f1f5f9' : '#1e293b'}; font-family: system-ui; margin: 0 0 1rem 0; font-size: 1rem;">
                📋 Journal d'événements
              </h3>
              <div id="event-log-interactive" style="font-family: 'Courier New', monospace; font-size: 0.875rem; display: flex; flex-direction: column; gap: 0.5rem;">
                <p style="color: ${args.theme === 'dark' ? '#94a3b8' : '#64748b'}; margin: 0;">
                  Aucun événement pour le moment...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <script>
      customElements.whenDefined('sh-stock-card').then(() => {
        const card = document.getElementById('stock-card-interactive');
        const log = document.getElementById('event-log-interactive');

        if (card) {
          card.iaCount = ${args.iaCount || 0};

          let currentPercentage = 65;
          let sessionCount = 0;

          function addLogEntry(eventName, detail, color) {
            if (log.querySelector('p')) {
              log.innerHTML = '';
            }

            const entry = document.createElement('div');
            entry.style.cssText = \`
              padding: 0.75rem;
              background: \${color}15;
              border-left: 3px solid \${color};
              border-radius: 4px;
              margin-bottom: 0.5rem;
            \`;

            const time = new Date().toLocaleTimeString();
            entry.innerHTML = \`
              <div style="color: \${color}; font-weight: 600; margin-bottom: 0.25rem;">
                \${eventName}
              </div>
              <div style="color: ${args.theme === 'dark' ? '#cbd5e1' : '#64748b'}; font-size: 0.75rem;">
                \${time}
              </div>
              <div style="color: ${args.theme === 'dark' ? '#e2e8f0' : '#475569'}; font-size: 0.8rem; margin-top: 0.5rem;">
                \${JSON.stringify(detail, null, 2)}
              </div>
            \`;

            log.insertBefore(entry, log.firstChild);

            // Limiter à 5 entrées
            while (log.children.length > 5) {
              log.removeChild(log.lastChild);
            }
          }

          card.addEventListener('sh-session-click', (e) => {
            sessionCount++;

            // Diminuer le pourcentage de 15% à chaque session
            currentPercentage = Math.max(0, currentPercentage - 15);

            // Mettre à jour la carte
            card.percentage = currentPercentage;
            card.lastUpdate = 'Mis à jour à l\\'instant';

            // Changer le statut selon le pourcentage
            if (currentPercentage === 0) {
              card.status = 'out-of-stock';
              card.quantity = '0 tube';
              card.value = '€0';
            } else if (currentPercentage <= 20) {
              card.status = 'critical';
              card.quantity = '1 tube';
              card.value = '€12';
              card.iaCount = 2;
            } else if (currentPercentage <= 40) {
              card.status = 'low';
              card.quantity = '1 tube';
              card.value = '€12';
              card.iaCount = 1;
            } else {
              card.status = 'optimal';
              card.quantity = '1 tube';
              card.value = '€12';
              card.iaCount = 0;
            }

            console.log('sh-session-click:', e.detail);
            addLogEntry(
              '🎨 Session #' + sessionCount + ' enregistrée',
              {
                ...e.detail,
                nouveauPourcentage: currentPercentage + '%',
                nouveauStatut: card.status
              },
              '#8b5cf6'
            );
          });

          card.addEventListener('sh-details-click', (e) => {
            console.log('sh-details-click:', e.detail);
            addLogEntry('👁️ sh-details-click', e.detail, '#3b82f6');
          });

          card.addEventListener('sh-edit-click', (e) => {
            console.log('sh-edit-click:', e.detail);
            addLogEntry('✏️ sh-edit-click', e.detail, '#10b981');
          });

          card.addEventListener('sh-delete-click', (e) => {
            console.log('sh-delete-click:', e.detail);
            addLogEntry('🗑️ sh-delete-click', e.detail, '#ef4444');
          });
        }
      });
    </script>
  `,
};

/**
 * Test d'interaction : Click sur tous les boutons d'action
 */
export const InteractionTestAllButtons: Story = {
  args: {
    name: 'Acrylique Bleu Cobalt',
    category: 'Peinture',
    lastUpdate: 'Mis à jour il y a 3h',
    percentage: '65',
    quantity: '1 tube',
    value: '€12',
    status: 'optimal',
    iaCount: 0,
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; min-height: 600px;">
      <div style="max-width: 400px;">
        <sh-stock-card
          id="stock-card-test-all"
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

      <div id="test-result" style="margin-top: 2rem; padding: 1rem; background: rgba(0,0,0,0.2); border-radius: 8px; color: white;">
        En attente du test...
      </div>
    </div>

    <script>
      customElements.whenDefined('sh-stock-card').then(() => {
        const card = document.getElementById('stock-card-test-all');
        if (card) {
          card.iaCount = ${args.iaCount || 0};
        }
      });
    </script>
  `,
  play: async ({ canvasElement }) => {
    const resultDiv = canvasElement.querySelector('#test-result') as HTMLElement;

    try {
      await customElements.whenDefined('sh-stock-card');
      await new Promise(resolve => setTimeout(resolve, 100));

      const card = canvasElement.querySelector('#stock-card-test-all') as any;
      await expect(card).toBeInTheDocument();

      // Test 1: Session button
      let sessionEvent: any = null;
      card.addEventListener('sh-session-click', ((e: CustomEvent) => {
        sessionEvent = e.detail;
      }) as EventListener);

      // Trouver le bouton "Enregistrer session" dans le Shadow DOM
      const sessionButton = Array.from(card.shadowRoot?.querySelectorAll('sh-button') || [])
        .find((btn: any) => btn.textContent?.includes('Enregistrer session')) as any;
      await expect(sessionButton).toBeTruthy();

      // Cliquer sur le bouton natif dans le Shadow DOM du sh-button
      const sessionButtonNative = sessionButton.shadowRoot?.querySelector('button');
      await userEvent.click(sessionButtonNative);
      await new Promise(resolve => setTimeout(resolve, 100));

      await expect(sessionEvent).toBeTruthy();
      await expect(sessionEvent.name).toBe('Acrylique Bleu Cobalt');
      await expect(sessionEvent.status).toBe('optimal');

      // Test 2: Details button
      let detailsEvent: any = null;
      card.addEventListener('sh-details-click', ((e: CustomEvent) => {
        detailsEvent = e.detail;
      }) as EventListener);

      const detailsButton = Array.from(card.shadowRoot?.querySelectorAll('sh-button') || [])
        .find((btn: any) => btn.textContent?.includes('Détails')) as any;
      await expect(detailsButton).toBeTruthy();

      const detailsButtonNative = detailsButton.shadowRoot?.querySelector('button');
      await userEvent.click(detailsButtonNative);
      await new Promise(resolve => setTimeout(resolve, 100));

      await expect(detailsEvent).toBeTruthy();
      await expect(detailsEvent.name).toBe('Acrylique Bleu Cobalt');
      await expect(detailsEvent.category).toBe('Peinture');
      await expect(detailsEvent.status).toBe('optimal');

      // Test 3: Edit button (icon-only avec Edit3)
      let editEvent: any = null;
      card.addEventListener('sh-edit-click', ((e: CustomEvent) => {
        editEvent = e.detail;
      }) as EventListener);

      const allButtons = Array.from(card.shadowRoot?.querySelectorAll('sh-button') || []);
      const editButton = allButtons.find((btn: any) =>
        btn.hasAttribute('icon-only') && btn.getAttribute('icon-before') === 'Edit3'
      ) as any;
      await expect(editButton).toBeTruthy();

      const editButtonNative = editButton.shadowRoot?.querySelector('button');
      await userEvent.click(editButtonNative);
      await new Promise(resolve => setTimeout(resolve, 100));

      await expect(editEvent).toBeTruthy();
      await expect(editEvent.name).toBe('Acrylique Bleu Cobalt');
      await expect(editEvent.status).toBe('optimal');

      // Test 4: Delete button (icon-only avec Trash2)
      let deleteEvent: any = null;
      card.addEventListener('sh-delete-click', ((e: CustomEvent) => {
        deleteEvent = e.detail;
      }) as EventListener);

      const deleteButton = allButtons.find((btn: any) =>
        btn.hasAttribute('icon-only') && btn.getAttribute('icon-before') === 'Trash2'
      ) as any;
      await expect(deleteButton).toBeTruthy();

      const deleteButtonNative = deleteButton.shadowRoot?.querySelector('button');
      await userEvent.click(deleteButtonNative);
      await new Promise(resolve => setTimeout(resolve, 100));

      await expect(deleteEvent).toBeTruthy();
      await expect(deleteEvent.name).toBe('Acrylique Bleu Cobalt');
      await expect(deleteEvent.status).toBe('optimal');

      if (resultDiv) {
        resultDiv.style.color = '#10b981';
        resultDiv.innerHTML = '✅ Test réussi : 4 boutons (session, details, edit, delete) avec événements et payloads corrects';
      }
    } catch (error) {
      if (resultDiv) {
        resultDiv.style.color = '#ef4444';
        resultDiv.innerHTML = `❌ Test échoué : ${error}`;
      }
      throw error;
    }
  },
};

/**
 * Test d'interaction : État loading désactive les boutons
 */
export const InteractionTestLoadingState: Story = {
  args: {
    name: 'Acrylique Rouge Vermillon',
    category: 'Peinture',
    lastUpdate: 'Mis à jour il y a 1h',
    percentage: '15',
    quantity: '1 tube',
    value: '€12',
    status: 'low',
    loading: true,
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; min-height: 600px;">
      <div style="max-width: 400px;">
        <sh-stock-card
          id="stock-card-test-loading"
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

      <div id="test-result" style="margin-top: 2rem; padding: 1rem; background: rgba(0,0,0,0.2); border-radius: 8px; color: white;">
        En attente du test...
      </div>
    </div>

    <script>
      customElements.whenDefined('sh-stock-card').then(() => {
        const card = document.getElementById('stock-card-test-loading');
        if (card) {
          card.iaCount = 0;
        }
      });
    </script>
  `,
  play: async ({ canvasElement }) => {
    const resultDiv = canvasElement.querySelector('#test-result') as HTMLElement;

    try {
      await customElements.whenDefined('sh-stock-card');
      await new Promise(resolve => setTimeout(resolve, 100));

      const card = canvasElement.querySelector('#stock-card-test-loading') as any;
      await expect(card).toBeInTheDocument();

      // Vérifier que la carte est en loading
      await expect(card.loading).toBe(true);

      // Vérifier que tous les boutons sont disabled
      const allButtons = Array.from(card.shadowRoot?.querySelectorAll('sh-button') || []);
      await expect(allButtons.length).toBe(4);

      for (const button of allButtons) {
        const btn = button as any;
        await expect(btn.disabled).toBe(true);

        // Vérifier que le bouton natif est aussi disabled
        const nativeButton = btn.shadowRoot?.querySelector('button');
        await expect(nativeButton.disabled).toBe(true);
      }

      // Vérifier que la carte a l'attribut loading
      await expect(card.hasAttribute('loading')).toBe(true);

      if (resultDiv) {
        resultDiv.style.color = '#10b981';
        resultDiv.innerHTML = '✅ Test réussi : État loading désactive les 4 boutons correctement';
      }
    } catch (error) {
      if (resultDiv) {
        resultDiv.style.color = '#ef4444';
        resultDiv.innerHTML = `❌ Test échoué : ${error}`;
      }
      throw error;
    }
  },
};

/**
 * Test d'interaction : Badge IA conditionnel
 */
export const InteractionTestIaBadge: Story = {
  args: {
    name: 'Acrylique Jaune Cadmium',
    category: 'Peinture',
    lastUpdate: 'Mis à jour il y a 2j',
    percentage: '5',
    quantity: '2 tubes',
    value: '€24',
    status: 'critical',
    iaCount: 2,
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; min-height: 600px;">
      <div style="max-width: 400px;">
        <sh-stock-card
          id="stock-card-test-ia"
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

      <div id="test-result" style="margin-top: 2rem; padding: 1rem; background: rgba(0,0,0,0.2); border-radius: 8px; color: white;">
        En attente du test...
      </div>
    </div>

    <script>
      customElements.whenDefined('sh-stock-card').then(() => {
        const card = document.getElementById('stock-card-test-ia');
        if (card) {
          card.iaCount = ${args.iaCount || 0};
        }
      });
    </script>
  `,
  play: async ({ canvasElement }) => {
    const resultDiv = canvasElement.querySelector('#test-result') as HTMLElement;

    try {
      await customElements.whenDefined('sh-stock-card');
      await new Promise(resolve => setTimeout(resolve, 200));

      const card = canvasElement.querySelector('#stock-card-test-ia') as any;
      await expect(card).toBeInTheDocument();

      // Vérifier que iaCount est 2
      await expect(card.iaCount).toBe(2);

      // Vérifier que le badge IA est présent
      const iaBadge = card.shadowRoot?.querySelector('.ia-badge');
      await expect(iaBadge).toBeTruthy();

      // Vérifier le contenu du badge
      await expect(iaBadge?.textContent).toContain('IA (2)');

      // Vérifier l'icône Sparkles
      const sparklesIcon = iaBadge?.querySelector('sh-icon[name="Sparkles"]');
      await expect(sparklesIcon).toBeTruthy();

      // Changer iaCount à 0 et vérifier que le badge disparaît
      card.iaCount = 0;
      await new Promise(resolve => setTimeout(resolve, 100));

      const iaBadgeAfter = card.shadowRoot?.querySelector('.ia-badge');
      await expect(iaBadgeAfter).toBeFalsy();

      if (resultDiv) {
        resultDiv.style.color = '#10b981';
        resultDiv.innerHTML = '✅ Test réussi : Badge IA conditionnel (visible avec count > 0, caché avec count = 0)';
      }
    } catch (error) {
      if (resultDiv) {
        resultDiv.style.color = '#ef4444';
        resultDiv.innerHTML = `❌ Test échoué : ${error}`;
      }
      throw error;
    }
  },
};

/**
 * Test d'interaction : Différents statuts
 */
export const InteractionTestStatusVariations: Story = {
  args: {
    name: 'Test Stock',
    category: 'Test',
    percentage: '50',
    quantity: '5 unités',
    value: '€100',
    status: 'optimal',
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; min-height: 600px;">
      <div style="max-width: 400px;">
        <sh-stock-card
          id="stock-card-test-status"
          name="${args.name}"
          category="${args.category}"
          percentage="${args.percentage}"
          quantity="${args.quantity}"
          value="${args.value}"
          status="${args.status}"
          data-theme="${args.theme}"
        ></sh-stock-card>
      </div>

      <div id="test-result" style="margin-top: 2rem; padding: 1rem; background: rgba(0,0,0,0.2); border-radius: 8px; color: white;">
        En attente du test...
      </div>
    </div>

    <script>
      customElements.whenDefined('sh-stock-card').then(() => {
        const card = document.getElementById('stock-card-test-status');
        if (card) {
          card.iaCount = 0;
        }
      });
    </script>
  `,
  play: async ({ canvasElement }) => {
    const resultDiv = canvasElement.querySelector('#test-result') as HTMLElement;

    try {
      await customElements.whenDefined('sh-stock-card');
      await new Promise(resolve => setTimeout(resolve, 100));

      const card = canvasElement.querySelector('#stock-card-test-status') as any;
      await expect(card).toBeInTheDocument();

      const statuses = ['optimal', 'low', 'critical', 'out-of-stock', 'overstocked'];

      for (const status of statuses) {
        card.status = status;
        await new Promise(resolve => setTimeout(resolve, 100));

        // Vérifier que la propriété status est changée
        await expect(card.status).toBe(status);

        // Vérifier que le badge de statut est présent
        const statusBadge = card.shadowRoot?.querySelector('sh-status-badge');
        await expect(statusBadge).toBeTruthy();
        await expect(statusBadge?.getAttribute('status')).toBe(status);
      }

      if (resultDiv) {
        resultDiv.style.color = '#10b981';
        resultDiv.innerHTML = '✅ Test réussi : Tous les statuts (optimal, low, critical, out-of-stock, overstocked) fonctionnent correctement';
      }
    } catch (error) {
      if (resultDiv) {
        resultDiv.style.color = '#ef4444';
        resultDiv.innerHTML = `❌ Test échoué : ${error}`;
      }
      throw error;
    }
  },
};

/**
 * Badge IA adaptatif - Hérite automatiquement de la couleur du statut
 */
export const IaBadgeColorInheritance: Story = {
  args: {
    theme: 'dark',
  },
  parameters: {
    docs: {
      description: {
        story: "Le badge IA hérite automatiquement de la couleur du statut du stock, créant une cohérence visuelle : vert (optimal), orange (low), rouge (critical). Le frontend n'a plus besoin de calculer une sévérité séparée."
      }
    }
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; min-height: 100vh; box-sizing: border-box;">
      <div style="max-width: 1200px; margin: 0 auto;">
        <h2 style="color: ${args.theme === 'dark' ? '#f1f5f9' : '#1e293b'}; font-family: system-ui; margin-bottom: 1rem;">
          🎨 Badge IA Adaptatif - Cohérence avec le Statut
        </h2>
        <p style="color: ${args.theme === 'dark' ? '#cbd5e1' : '#64748b'}; font-family: system-ui; margin-bottom: 2rem; max-width: 800px;">
          Le badge IA utilise automatiquement la même couleur que le statut du stock :
          <strong style="color: var(--color-success-400)">Vert (optimal)</strong>,
          <strong style="color: var(--color-warning-400)">Orange (low)</strong>,
          <strong style="color: var(--color-danger-400)">Rouge (critical)</strong>.
        </p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2rem;">
          <!-- Optimal (Vert) -->
          <div>
            <h3 style="color: ${args.theme === 'dark' ? '#f1f5f9' : '#1e293b'}; font-family: system-ui; font-size: 1rem; margin-bottom: 1rem;">
              ✅ Optimal - Badge Vert
            </h3>
            <sh-stock-card
              id="ia-badge-optimal"
              name="Acrylique Bleu Cobalt"
              category="Peinture"
              last-update="Mis à jour il y a 3h"
              percentage="65"
              quantity="1 tube"
              value="€12"
              status="optimal"
              data-theme="${args.theme}"
            ></sh-stock-card>
            <p style="color: ${args.theme === 'dark' ? '#94a3b8' : '#64748b'}; font-size: 0.875rem; margin-top: 1rem; font-family: system-ui;">
              Stock sain avec suggestions IA préventives
            </p>
          </div>

          <!-- Low (Orange) -->
          <div>
            <h3 style="color: ${args.theme === 'dark' ? '#f1f5f9' : '#1e293b'}; font-family: system-ui; font-size: 1rem; margin-bottom: 1rem;">
              ⚠️ Low - Badge Orange
            </h3>
            <sh-stock-card
              id="ia-badge-low"
              name="Acrylique Rouge Vermillon"
              category="Peinture"
              last-update="Mis à jour il y a 1sem"
              percentage="25"
              quantity="1 tube"
              value="€12"
              status="low"
              data-theme="${args.theme}"
            ></sh-stock-card>
            <p style="color: ${args.theme === 'dark' ? '#94a3b8' : '#64748b'}; font-size: 0.875rem; margin-top: 1rem; font-family: system-ui;">
              Stock faible avec alertes IA d'attention
            </p>
          </div>

          <!-- Critical (Rouge) -->
          <div>
            <h3 style="color: ${args.theme === 'dark' ? '#f1f5f9' : '#1e293b'}; font-family: system-ui; font-size: 1rem; margin-bottom: 1rem;">
              🚨 Critical - Badge Rouge
            </h3>
            <sh-stock-card
              id="ia-badge-critical"
              name="Acrylique Jaune Cadmium"
              category="Peinture"
              last-update="Mis à jour il y a 2j"
              percentage="5"
              quantity="2 tubes"
              value="€24"
              status="critical"
              data-theme="${args.theme}"
            ></sh-stock-card>
            <p style="color: ${args.theme === 'dark' ? '#94a3b8' : '#64748b'}; font-size: 0.875rem; margin-top: 1rem; font-family: system-ui;">
              Stock critique avec alertes IA urgentes
            </p>
          </div>
        </div>

        <div style="margin-top: 3rem; padding: 1.5rem; background: ${args.theme === 'dark' ? 'rgba(15, 23, 42, 0.5)' : 'rgba(248, 250, 252, 0.5)'}; border-radius: 12px; border: 1px solid ${args.theme === 'dark' ? '#334155' : '#e2e8f0'};">
          <h4 style="color: ${args.theme === 'dark' ? '#f1f5f9' : '#1e293b'}; font-family: system-ui; font-size: 0.95rem; margin: 0 0 0.75rem 0;">
            💡 Intégration Frontend Simplifiée
          </h4>
          <p style="color: ${args.theme === 'dark' ? '#94a3b8' : '#64748b'}; font-size: 0.875rem; margin: 0; font-family: system-ui; line-height: 1.6;">
            Le badge IA hérite automatiquement de la couleur du statut. Aucune prop supplémentaire requise :
          </p>
          <pre style="background: ${args.theme === 'dark' ? '#0f172a' : '#ffffff'}; padding: 1rem; border-radius: 8px; margin-top: 1rem; overflow-x: auto;"><code style="color: ${args.theme === 'dark' ? '#e2e8f0' : '#1e293b'}; font-size: 0.8rem; font-family: 'Courier New', monospace;">&lt;sh-stock-card
  status="critical"           <!-- détermine la couleur du badge -->
  ia-suggestions-count="3"    <!-- affiche le badge si > 0 -->
/&gt;</code></pre>
          <p style="color: ${args.theme === 'dark' ? '#94a3b8' : '#64748b'}; font-size: 0.75rem; margin: 1rem 0 0 0; font-family: system-ui; font-style: italic;">
            ✨ Avantage : Cohérence visuelle automatique entre le statut et le badge IA
          </p>
        </div>
      </div>
    </div>

    <script>
      customElements.whenDefined('sh-stock-card').then(() => {
        const cardOptimal = document.getElementById('ia-badge-optimal');
        const cardLow = document.getElementById('ia-badge-low');
        const cardCritical = document.getElementById('ia-badge-critical');

        if (cardOptimal) cardOptimal.iaCount = 1;
        if (cardLow) cardLow.iaCount = 2;
        if (cardCritical) cardCritical.iaCount = 3;
      });
    </script>
  `,
};
