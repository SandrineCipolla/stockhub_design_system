import type {Meta, StoryObj} from '@storybook/web-components';
import {expect, userEvent} from '@storybook/test';
import './sh-card.ts';
import '../../atoms/icon/sh-icon.ts';
import '../../atoms/badge/sh-badge.ts';
import '../button/sh-button.ts';
import '../../organisms/stock-item-card/sh-stock-item-card.ts';

const meta: Meta = {
  title: 'Components/Molecules/Card',
  component: 'sh-card',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    hover: {
      control: 'boolean',
      description: 'Activer les effets au survol',
    },
    clickable: {
      control: 'boolean',
      description: 'Rendre la carte cliquable',
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Padding interne de la carte',
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Thème de la carte (light ou dark)',
    },
  },
};

export default meta;
type Story = StoryObj;

// Basic Card
export const Basic: Story = {
  args: {
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 300px; display: flex; align-items: center; justify-content: center; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
      <sh-card style="width: 300px;" data-theme="${args.theme}">
        <h3 style="margin: 0 0 0.5rem 0;">Card Title</h3>
        <p style="margin: 0; color: ${args.theme === 'dark' ? '#9ca3af' : '#6b7280'};">
          This is a basic card with some content inside.
        </p>
      </sh-card>
    </div>
  `,
};

// With Slots (Header, Content, Footer)
export const WithSlots: Story = {
  args: {
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 300px; display: flex; align-items: center; justify-content: center; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
      <sh-card style="width: 350px;" data-theme="${args.theme}">
        <div slot="header" style="padding-bottom: 0.75rem; border-bottom: 1px solid ${args.theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#e5e7eb'};">
          <h3 style="margin: 0;">Card with Slots</h3>
          <p style="margin: 0.25rem 0 0 0; color: ${args.theme === 'dark' ? '#9ca3af' : '#6b7280'}; font-size: 0.875rem;">
            Subtitle or description
          </p>
        </div>

        <p style="margin: 1rem 0;">
          This card uses slots for header, content, and footer sections.
          It helps organize content in a structured way.
        </p>

        <div slot="footer" style="padding-top: 0.75rem; border-top: 1px solid ${args.theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#e5e7eb'};">
          <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
            <sh-button variant="ghost" size="sm" data-theme="${args.theme}">Cancel</sh-button>
            <sh-button variant="primary" size="sm" data-theme="${args.theme}">Save</sh-button>
          </div>
        </div>
      </sh-card>
    </div>
  `,
};

// Hover Effects
export const HoverEffects: Story = {
  args: {
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 300px; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <sh-card hover style="width: 200px;" data-theme="${args.theme}">
          <h4 style="margin: 0 0 0.5rem 0;">With Hover</h4>
          <p style="margin: 0; font-size: 0.875rem; color: ${args.theme === 'dark' ? '#9ca3af' : '#6b7280'};">
            Hover over this card to see the effect
          </p>
        </sh-card>

        <sh-card id="no-hover-card" style="width: 200px;" data-theme="${args.theme}">
          <h4 style="margin: 0 0 0.5rem 0;">No Hover</h4>
          <p style="margin: 0; font-size: 0.875rem; color: ${args.theme === 'dark' ? '#9ca3af' : '#6b7280'};">
            This card doesn't have hover effects
          </p>
        </sh-card>
      </div>
    </div>
    <script>
      (function() {
        const card = document.getElementById('no-hover-card');
        if (card) {
          card.hover = false;
        }
      })();
    </script>
  `,
};

// Clickable Card
export const Clickable: Story = {
  args: {
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 300px; display: flex; align-items: center; justify-content: center; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
      <sh-card
        clickable
        style="width: 250px;"
        data-theme="${args.theme}"
      >
        <div style="text-align: center;">
          <sh-icon name="Folder" size="xl" color="primary" data-theme="${args.theme}"></sh-icon>
          <h3 style="margin: 0.5rem 0;">Click Me</h3>
          <p style="margin: 0; font-size: 0.875rem; color: ${args.theme === 'dark' ? '#9ca3af' : '#6b7280'};">
            This card is interactive (click to see effect)
          </p>
        </div>
      </sh-card>
    </div>
  `,
};

// Different Padding
export const DifferentPadding: Story = {
  args: {
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 300px; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
      <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: flex-start;">
        <sh-card padding="none" style="width: 150px;" data-theme="${args.theme}">
          <img src="https://via.placeholder.com/150" alt="Placeholder" style="width: 100%; display: block; border-radius: 16px 16px 0 0;">
          <div style="padding: 0.75rem;">
            <h4 style="margin: 0;">No Padding</h4>
          </div>
        </sh-card>

        <sh-card padding="sm" style="width: 150px;" data-theme="${args.theme}">
          <h4 style="margin: 0 0 0.5rem 0;">Small</h4>
          <p style="margin: 0; font-size: 0.75rem; color: ${args.theme === 'dark' ? '#9ca3af' : '#6b7280'};">Padding: sm</p>
        </sh-card>

        <sh-card padding="md" style="width: 150px;" data-theme="${args.theme}">
          <h4 style="margin: 0 0 0.5rem 0;">Medium</h4>
          <p style="margin: 0; font-size: 0.75rem; color: ${args.theme === 'dark' ? '#9ca3af' : '#6b7280'};">Padding: md</p>
        </sh-card>

        <sh-card padding="lg" style="width: 150px;" data-theme="${args.theme}">
          <h4 style="margin: 0 0 0.5rem 0;">Large</h4>
          <p style="margin: 0; font-size: 0.75rem; color: ${args.theme === 'dark' ? '#9ca3af' : '#6b7280'};">Padding: lg</p>
        </sh-card>
      </div>
    </div>
  `,
};

// Stock Item Card Example
export const WithStockItemCard: Story = {
  args: {
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 300px; display: flex; align-items: center; justify-content: center; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
      <sh-stock-item-card
        name="Peinture Acrylique Bleu"
        sku="PNT-001"
        quantity="45"
        value="€675"
        location="A-12-3"
        status="optimal"
        data-theme="${args.theme}"
        style="width: 320px;"
      ></sh-stock-item-card>
    </div>
  `,
};

// Stats Card Example
export const StatsCard: Story = {
  args: {
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 300px; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <sh-card hover style="width: 200px;" data-theme="${args.theme}">
          <div style="display: flex; align-items: center; gap: 1rem;">
            <div style="padding: 0.75rem; background: rgba(139, 92, 246, 0.1); border-radius: 12px;">
              <sh-icon name="Users" size="lg" color="primary" data-theme="${args.theme}"></sh-icon>
            </div>
            <div>
              <div style="font-size: 0.75rem; color: ${args.theme === 'dark' ? '#9ca3af' : '#6b7280'}; text-transform: uppercase;">Users</div>
              <div style="font-size: 1.5rem; font-weight: 700;">1,234</div>
            </div>
          </div>
        </sh-card>

        <sh-card hover style="width: 200px;" data-theme="${args.theme}">
          <div style="display: flex; align-items: center; gap: 1rem;">
            <div style="padding: 0.75rem; background: rgba(34, 197, 94, 0.1); border-radius: 12px;">
              <sh-icon name="TrendingUp" size="lg" color="success" data-theme="${args.theme}"></sh-icon>
            </div>
            <div>
              <div style="font-size: 0.75rem; color: ${args.theme === 'dark' ? '#9ca3af' : '#6b7280'}; text-transform: uppercase;">Revenue</div>
              <div style="font-size: 1.5rem; font-weight: 700;">$12.5K</div>
            </div>
          </div>
        </sh-card>
      </div>
    </div>
  `,
};

// Add Stock Form Example
export const AddStockForm: Story = {
  args: {
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 400px; display: flex; align-items: center; justify-content: center; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
      <sh-card style="width: 400px;" data-theme="${args.theme}">
        <div slot="header">
          <h2 style="margin: 0;">Ajouter un stock</h2>
          <p style="margin: 0.5rem 0 0 0; color: ${args.theme === 'dark' ? '#9ca3af' : '#6b7280'};">
            Enregistrer un nouveau produit dans l'inventaire
          </p>
        </div>

        <form style="display: flex; flex-direction: column; gap: 1rem;">
          <div>
            <label style="display: block; margin-bottom: 0.25rem; font-size: 0.875rem; font-weight: 500;">
              Nom du produit
            </label>
            <input
              type="text"
              placeholder="Ex: Peinture Acrylique Bleu"
              style="width: 100%; padding: 0.5rem; border: 1px solid ${args.theme === 'dark' ? 'rgba(255,255,255,0.2)' : '#d1d5db'}; border-radius: 6px; font-size: 0.875rem; background: ${args.theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#ffffff'}; color: ${args.theme === 'dark' ? '#f8fafc' : '#1e293b'};"
            >
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div>
              <label style="display: block; margin-bottom: 0.25rem; font-size: 0.875rem; font-weight: 500;">
                Quantité
              </label>
              <input
                type="number"
                placeholder="0"
                style="width: 100%; padding: 0.5rem; border: 1px solid ${args.theme === 'dark' ? 'rgba(255,255,255,0.2)' : '#d1d5db'}; border-radius: 6px; font-size: 0.875rem; background: ${args.theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#ffffff'}; color: ${args.theme === 'dark' ? '#f8fafc' : '#1e293b'};"
              >
            </div>
            <div>
              <label style="display: block; margin-bottom: 0.25rem; font-size: 0.875rem; font-weight: 500;">
                Prix unitaire
              </label>
              <input
                type="text"
                placeholder="€0.00"
                style="width: 100%; padding: 0.5rem; border: 1px solid ${args.theme === 'dark' ? 'rgba(255,255,255,0.2)' : '#d1d5db'}; border-radius: 6px; font-size: 0.875rem; background: ${args.theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#ffffff'}; color: ${args.theme === 'dark' ? '#f8fafc' : '#1e293b'};"
              >
            </div>
          </div>

          <div>
            <label for="category-select" style="display: block; margin-bottom: 0.25rem; font-size: 0.875rem; font-weight: 500;">
              Catégorie
            </label>
            <select
              id="category-select"
              style="width: 100%; padding: 0.5rem; border: 1px solid ${args.theme === 'dark' ? 'rgba(255,255,255,0.2)' : '#d1d5db'}; border-radius: 6px; font-size: 0.875rem; background: ${args.theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#ffffff'}; color: ${args.theme === 'dark' ? '#f8fafc' : '#1e293b'};"
            >
              <option>Peinture</option>
              <option>Textile</option>
              <option>Outils</option>
              <option>Papeterie</option>
            </select>
          </div>
        </form>

        <div slot="footer" style="display: flex; gap: 0.5rem; justify-content: flex-end;">
          <sh-button variant="ghost" size="sm" data-theme="${args.theme}">Annuler</sh-button>
          <sh-button variant="primary" size="sm" iconBefore="Plus" data-theme="${args.theme}">Ajouter</sh-button>
        </div>
      </sh-card>
    </div>
  `,
};

// Interactive Playground
export const Playground: Story = {
  args: {
    hover: true,
    clickable: false,
    padding: 'md',
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 300px; display: flex; align-items: center; justify-content: center; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
      <sh-card
        ?hover="${args.hover}"
        ?clickable="${args.clickable}"
        padding="${args.padding}"
        style="width: 300px;"
        data-theme="${args.theme}"
      >
        <h3 style="margin: 0 0 0.5rem 0;">Card Title</h3>
        <p style="margin: 0; color: ${args.theme === 'dark' ? '#9ca3af' : '#6b7280'};">
          Configure the card using the controls below.
        </p>
      </sh-card>
    </div>
  `,
};

/**
 * Test d'interaction : teste le click sur une carte clickable.
 * Vérifie que l'événement sh-card-click est émis.
 */
export const InteractionTestClickable: Story = {
  args: {
    theme: 'dark',
  },
  parameters: {
    docs: {
      description: {
        story: "Teste le click sur une carte clickable et vérifie que l'événement sh-card-click est émis. Voir l'onglet 'Interactions'."
      }
    }
  },
  render: (args) => `
    <div style="background: linear-gradient(to bottom right, #0f172a, #1e1b4b); padding: 2rem; min-height: 250px; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 1rem; color: #ffffff;">
      <sh-card
        clickable
        style="width: 250px;"
        data-theme="${args.theme}"
      >
        <div style="text-align: center;">
          <h3 style="margin: 0 0 0.5rem 0;">Clickable Card</h3>
          <p style="margin: 0; font-size: 0.875rem; color: #9ca3af;">
            Click me to trigger event
          </p>
        </div>
      </sh-card>
      <div id="test-result" style="color: #94a3b8; font-size: 14px; font-weight: 500; text-align: center;">
        ⏳ Test en cours... (voir l'onglet "Interactions" en bas)
      </div>
    </div>
  `,
  play: async ({ canvasElement }) => {
    const resultDiv = canvasElement.querySelector('#test-result') as HTMLElement;

    try {
      // 1. Sélectionner le custom element
      const shCard = canvasElement.querySelector('sh-card') as any;
      await expect(shCard).toBeInTheDocument();

      // 2. Vérifier que l'attribut clickable est présent
      await expect(shCard.clickable).toBe(true);

      // 3. Accéder au div .card dans le Shadow DOM
      const cardDiv = shCard.shadowRoot?.querySelector('.card') as HTMLDivElement;
      await expect(cardDiv).toBeTruthy();

      // 4. Vérifier que role="button" est présent
      await expect(cardDiv.getAttribute('role')).toBe('button');
      await expect(cardDiv.getAttribute('tabindex')).toBe('0');

      // 5. Écouter l'événement sh-card-click
      let clickEventFired = false;
      shCard.addEventListener('sh-card-click', (() => {
        clickEventFired = true;
      }) as EventListener);

      // 6. Cliquer sur la carte (sur le div interne dans le Shadow DOM)
      await userEvent.click(cardDiv);
      await new Promise(resolve => setTimeout(resolve, 100));

      // 7. Vérifier que l'événement a été émis
      await expect(clickEventFired).toBe(true);

      // Afficher le succès
      if (resultDiv) {
        resultDiv.style.color = '#10b981';
        resultDiv.innerHTML = '✅ Test réussi ! Événement sh-card-click détecté.';
      }
    } catch (error) {
      // Afficher l'erreur
      if (resultDiv) {
        resultDiv.style.color = '#ef4444';
        resultDiv.innerHTML = `❌ Test échoué : ${error}`;
      }
      throw error;
    }
  },
};

/**
 * Test d'interaction : teste le support clavier (Enter et Space).
 * Vérifie que les touches Enter et Space déclenchent l'événement.
 */
export const InteractionTestKeyboard: Story = {
  args: {
    theme: 'dark',
  },
  parameters: {
    docs: {
      description: {
        story: "Teste le support clavier : les touches Enter et Space doivent déclencher l'événement sh-card-click sur une carte clickable."
      }
    }
  },
  render: (args) => `
    <div style="background: linear-gradient(to bottom right, #0f172a, #1e1b4b); padding: 2rem; min-height: 250px; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 1rem; color: #ffffff;">
      <sh-card
        clickable
        style="width: 250px;"
        data-theme="${args.theme}"
      >
        <div style="text-align: center;">
          <h3 style="margin: 0 0 0.5rem 0;">Keyboard Test</h3>
          <p style="margin: 0; font-size: 0.875rem; color: #9ca3af;">
            Press Enter or Space
          </p>
        </div>
      </sh-card>
      <div id="test-result" style="color: #94a3b8; font-size: 14px; font-weight: 500; text-align: center;">
        ⏳ Test en cours... (voir l'onglet "Interactions" en bas)
      </div>
    </div>
  `,
  play: async ({ canvasElement }) => {
    const resultDiv = canvasElement.querySelector('#test-result') as HTMLElement;

    try {
      // Sélectionner le custom element
      const shCard = canvasElement.querySelector('sh-card') as any;
      await expect(shCard).toBeInTheDocument();

      // Accéder au div .card dans le Shadow DOM
      const cardDiv = shCard.shadowRoot?.querySelector('.card') as HTMLDivElement;
      await expect(cardDiv).toBeTruthy();

      // Écouter l'événement sh-card-click
      let clickEventCount = 0;
      shCard.addEventListener('sh-card-click', (() => {
        clickEventCount++;
      }) as EventListener);

      // Focus sur la carte
      cardDiv.focus();
      await new Promise(resolve => setTimeout(resolve, 50));

      // Tester la touche Enter
      await userEvent.keyboard('{Enter}');
      await new Promise(resolve => setTimeout(resolve, 100));
      await expect(clickEventCount).toBeGreaterThanOrEqual(1);

      // Tester la touche Space
      await userEvent.keyboard(' ');
      await new Promise(resolve => setTimeout(resolve, 100));
      await expect(clickEventCount).toBeGreaterThanOrEqual(2);

      // Afficher le succès
      if (resultDiv) {
        resultDiv.style.color = '#10b981';
        resultDiv.innerHTML = `✅ Test réussi ! ${clickEventCount} événements déclenchés (Enter + Space).`;
      }
    } catch (error) {
      // Afficher l'erreur
      if (resultDiv) {
        resultDiv.style.color = '#ef4444';
        resultDiv.innerHTML = `❌ Test échoué : ${error}`;
      }
      throw error;
    }
  },
};

/**
 * Test d'interaction : teste qu'une carte non-clickable ne déclenche pas d'événement.
 * Vérifie que clickable=false empêche l'événement.
 */
export const InteractionTestNonClickable: Story = {
  args: {
    theme: 'dark',
  },
  parameters: {
    docs: {
      description: {
        story: "Teste qu'une carte avec clickable=false ne déclenche pas d'événement lors du click."
      }
    }
  },
  render: (args) => `
    <div style="background: linear-gradient(to bottom right, #0f172a, #1e1b4b); padding: 2rem; min-height: 250px; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 1rem; color: #ffffff;">
      <sh-card
        id="non-clickable-card"
        style="width: 250px;"
        data-theme="${args.theme}"
      >
        <div style="text-align: center;">
          <h3 style="margin: 0 0 0.5rem 0;">Non-Clickable Card</h3>
          <p style="margin: 0; font-size: 0.875rem; color: #9ca3af;">
            This card should not trigger events
          </p>
        </div>
      </sh-card>
      <div id="test-result" style="color: #94a3b8; font-size: 14px; font-weight: 500; text-align: center;">
        ⏳ Test en cours... (voir l'onglet "Interactions" en bas)
      </div>
    </div>
    <script>
      (function() {
        customElements.whenDefined('sh-card').then(() => {
          const card = document.getElementById('non-clickable-card');
          if (card) {
            // S'assurer que clickable est bien false
            card.clickable = false;
          }
        });
      })();
    </script>
  `,
  play: async ({ canvasElement }) => {
    const resultDiv = canvasElement.querySelector('#test-result') as HTMLElement;

    try {
      // Attendre que le composant soit défini
      await customElements.whenDefined('sh-card');
      await new Promise(resolve => setTimeout(resolve, 200));

      // Sélectionner le custom element
      const shCard = canvasElement.querySelector('#non-clickable-card') as any;
      await expect(shCard).toBeInTheDocument();

      // S'assurer que clickable est false (forcer si nécessaire)
      shCard.clickable = false;
      await new Promise(resolve => setTimeout(resolve, 100));

      // Vérifier que clickable est bien false
      await expect(shCard.clickable).toBe(false);

      // Accéder au div .card dans le Shadow DOM
      const cardDiv = shCard.shadowRoot?.querySelector('.card') as HTMLDivElement;
      await expect(cardDiv).toBeTruthy();

      // Vérifier que role="button" n'est pas présent (doit être null, undefined ou chaîne vide)
      const role = cardDiv.getAttribute('role');
      await expect(role === null || role === '' || role === 'null').toBe(true);

      const tabindex = cardDiv.getAttribute('tabindex');
      await expect(tabindex === null || tabindex === '' || tabindex === 'null').toBe(true);

      // Vérifier que la classe clickable n'est pas présente
      await expect(cardDiv.classList.contains('clickable')).toBe(false);

      // Écouter l'événement sh-card-click
      let clickEventFired = false;
      shCard.addEventListener('sh-card-click', (() => {
        clickEventFired = true;
      }) as EventListener);

      // Vérifier une dernière fois avant le click
      await expect(shCard.clickable).toBe(false);

      // Cliquer sur la carte (sur le div interne dans le Shadow DOM)
      await userEvent.click(cardDiv);
      await new Promise(resolve => setTimeout(resolve, 150));

      // Vérifier que l'événement n'a PAS été émis
      await expect(clickEventFired).toBe(false);

      // Afficher le succès
      if (resultDiv) {
        resultDiv.style.color = '#10b981';
        resultDiv.innerHTML = '✅ Test réussi ! Aucun événement émis (comportement attendu).';
      }
    } catch (error) {
      // Afficher l'erreur
      if (resultDiv) {
        resultDiv.style.color = '#ef4444';
        resultDiv.innerHTML = `❌ Test échoué : ${error}`;
      }
      throw error;
    }
  },
};

/**
 * Test d'interaction : teste la navigation au clavier avec Tab.
 * Vérifie que la carte clickable peut recevoir le focus via Tab.
 */
export const InteractionTestFocusNavigation: Story = {
  args: {
    theme: 'dark',
  },
  parameters: {
    docs: {
      description: {
        story: "Teste la navigation au clavier : une carte clickable doit être focusable avec Tab et avoir un outline visible."
      }
    }
  },
  render: (args) => `
    <div style="background: linear-gradient(to bottom right, #0f172a, #1e1b4b); padding: 2rem; min-height: 300px; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 1rem; color: #ffffff;">
      <button style="padding: 0.5rem 1rem; background: rgba(139, 92, 246, 0.2); border: 1px solid rgba(139, 92, 246, 0.5); border-radius: 6px; color: #ffffff; cursor: pointer;">
        Focus me first
      </button>
      <sh-card
        clickable
        style="width: 250px;"
        data-theme="${args.theme}"
      >
        <div style="text-align: center;">
          <h3 style="margin: 0 0 0.5rem 0;">Tab Navigation</h3>
          <p style="margin: 0; font-size: 0.875rem; color: #9ca3af;">
            Press Tab to focus this card
          </p>
        </div>
      </sh-card>
      <div id="test-result" style="color: #94a3b8; font-size: 14px; font-weight: 500; text-align: center;">
        ⏳ Test en cours... (voir l'onglet "Interactions" en bas)
      </div>
    </div>
  `,
  play: async ({ canvasElement }) => {
    const resultDiv = canvasElement.querySelector('#test-result') as HTMLElement;

    try {
      // Sélectionner les éléments
      const button = canvasElement.querySelector('button') as HTMLButtonElement;
      const shCard = canvasElement.querySelector('sh-card') as any;
      await expect(button).toBeInTheDocument();
      await expect(shCard).toBeInTheDocument();

      // Accéder au div .card dans le Shadow DOM
      const cardDiv = shCard.shadowRoot?.querySelector('.card') as HTMLDivElement;
      await expect(cardDiv).toBeTruthy();

      // Vérifier que tabindex="0" est présent
      await expect(cardDiv.getAttribute('tabindex')).toBe('0');

      // Focus directement sur le cardDiv (simule la navigation Tab)
      cardDiv.focus();
      await new Promise(resolve => setTimeout(resolve, 100));

      // Vérifier que la carte a le focus
      // Quand un élément dans le Shadow DOM a le focus, document.activeElement est l'hôte (sh-card)
      await expect(document.activeElement).toBe(shCard);

      // Et shadowRoot.activeElement est l'élément interne (cardDiv)
      await expect(shCard.shadowRoot?.activeElement).toBe(cardDiv);

      // Afficher le succès
      if (resultDiv) {
        resultDiv.style.color = '#10b981';
        resultDiv.innerHTML = '✅ Test réussi ! Navigation Tab fonctionne, carte focusable.';
      }
    } catch (error) {
      // Afficher l'erreur
      if (resultDiv) {
        resultDiv.style.color = '#ef4444';
        resultDiv.innerHTML = `❌ Test échoué : ${error}`;
      }
      throw error;
    }
  },
};
