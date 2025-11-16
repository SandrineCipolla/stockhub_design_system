import type { Meta, StoryObj } from '@storybook/web-components';
import { expect, userEvent } from '@storybook/test';
import './sh-stat-card';

const meta: Meta = {
  title: 'Components/Molecules/StatCard',
  component: 'sh-stat-card',
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label descriptif de la statistique'
    },
    value: {
      control: 'text',
      description: 'Valeur à afficher (nombre ou texte)'
    },
    riskLevel: {
      control: 'select',
      options: ['default', 'critical', 'high', 'medium', 'low'],
      description: 'Niveau de risque de rupture de stock',
      table: {
        defaultValue: { summary: 'default' }
      }
    },
    selected: {
      control: 'boolean',
      description: 'État sélectionné (pour filtrage)',
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

// Solid background for accessibility tests (no gradient)
const getSolidBackground = (theme: string) => theme === 'dark'
  ? '#0f172a'
  : '#f8fafc';

/**
 * Carte statistique par défaut
 */
export const Default: Story = {
  args: {
    label: 'Total Stocks',
    value: '156',
    riskLevel: 'default',
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; max-width: 200px;">
      <sh-stat-card
        label="${args.label}"
        value="${args.value}"
        risk-level="${args.riskLevel}"
        data-theme="${args.theme}"
        ${args.selected ? 'selected' : ''}
      ></sh-stat-card>
    </div>
  `,
};

/**
 * Carte sélectionnée (état actif pour filtrage)
 */
export const Selected: Story = {
  args: {
    label: 'Critique (≤3j)',
    value: '15',
    riskLevel: 'critical',
    selected: true,
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; max-width: 200px;">
      <sh-stat-card
        label="${args.label}"
        value="${args.value}"
        risk-level="${args.riskLevel}"
        data-theme="${args.theme}"
        ${args.selected ? 'selected' : ''}
      ></sh-stat-card>
    </div>
  `,
};

/**
 * Tous les niveaux de risque côte à côte
 */
export const AllRiskLevels: Story = {
  args: {
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem;">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem;">
        <sh-stat-card
          label="Total Stocks"
          value="156"
          risk-level="default"
          data-theme="${args.theme}"
        ></sh-stat-card>

        <sh-stat-card
          label="Critique (≤3j)"
          value="15"
          risk-level="critical"
          data-theme="${args.theme}"
        ></sh-stat-card>

        <sh-stat-card
          label="Élevé (4-7j)"
          value="22"
          risk-level="high"
          data-theme="${args.theme}"
        ></sh-stat-card>

        <sh-stat-card
          label="Moyen (8-14j)"
          value="32"
          risk-level="medium"
          data-theme="${args.theme}"
        ></sh-stat-card>

        <sh-stat-card
          label="Faible (15j+)"
          value="87"
          risk-level="low"
          data-theme="${args.theme}"
        ></sh-stat-card>
      </div>
    </div>
  `,
};

/**
 * Valeurs personnalisées avec slot
 */
export const CustomSlot: Story = {
  args: {
    label: 'Valeur Totale',
    riskLevel: 'low',
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; max-width: 200px;">
      <sh-stat-card
        label="${args.label}"
        risk-level="${args.riskLevel}"
        data-theme="${args.theme}"
      >
        <span style="font-size: 1.25rem;">€45,250</span>
      </sh-stat-card>
    </div>
  `,
};

/**
 * Story d'interaction : teste l'affichage de la valeur et du label.
 * Vérifie que le composant affiche correctement les données.
 * Les résultats sont visibles dans le panneau "Interactions" de Storybook.
 */
export const InteractionTest: Story = {
  args: {
    label: 'Total Stocks',
    value: '156',
    riskLevel: 'default',
    theme: 'dark',
  },
  parameters: {
    docs: {
      description: {
        story: "Cette story lance des tests automatisés sur la carte avec @storybook/test. Les interactions sont visibles dans le panneau 'Interactions' de Storybook. Utile pour la CI/CD et Chromatic."
      }
    }
  },
  render: (args) => `
    <div style="background: ${getSolidBackground(args.theme)}; padding: 2rem; min-height: 200px; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 1rem; max-width: 300px; margin: 0 auto;">
      <sh-stat-card
        label="${args.label}"
        value="${args.value}"
        risk-level="${args.riskLevel}"
        data-theme="${args.theme}"
        ${args.selected ? 'selected' : ''}
      ></sh-stat-card>
      <div id="test-result" style="color: #94a3b8; font-size: 14px; font-weight: 500;">
        ⏳ Test en cours... (voir l'onglet "Interactions" en bas)
      </div>
    </div>
  `,
  play: async ({ canvasElement }) => {
    const resultDiv = canvasElement.querySelector('#test-result') as HTMLElement;

    try {
      const card = canvasElement.querySelector('sh-stat-card');
      await expect(card).toBeInTheDocument();
      await expect(card?.shadowRoot?.querySelector('.value')).toHaveTextContent('156');
      await expect(card?.shadowRoot?.querySelector('.label')).toHaveTextContent('Total Stocks');

      // Afficher succès
      if (resultDiv) {
        resultDiv.style.color = '#10b981';
        resultDiv.innerHTML = '✅ Test réussi : Valeur et label affichés correctement';
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
 * Story d'interaction : teste l'état sélectionné.
 * Vérifie que l'attribut selected et aria-pressed fonctionnent.
 * Les résultats sont visibles dans le panneau "Interactions" de Storybook.
 */
export const InteractionTestSelected: Story = {
  args: {
    label: 'Critique (≤3j)',
    value: '15',
    riskLevel: 'critical',
    selected: true,
    theme: 'dark',
  },
  parameters: {
    docs: {
      description: {
        story: "Cette story teste l'état sélectionné de la carte et vérifie les attributs ARIA pour l'accessibilité."
      }
    }
  },
  render: (args) => `
    <div style="background: ${getSolidBackground(args.theme)}; padding: 2rem; min-height: 200px; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 1rem; max-width: 300px; margin: 0 auto;">
      <sh-stat-card
        label="${args.label}"
        value="${args.value}"
        risk-level="${args.riskLevel}"
        data-theme="${args.theme}"
        ${args.selected ? 'selected' : ''}
      ></sh-stat-card>
      <div id="test-result" style="color: #94a3b8; font-size: 14px; font-weight: 500;">
        ⏳ Test en cours... (voir l'onglet "Interactions" en bas)
      </div>
    </div>
  `,
  play: async ({ canvasElement }) => {
    const resultDiv = canvasElement.querySelector('#test-result') as HTMLElement;

    try {
      const card = canvasElement.querySelector('sh-stat-card');
      await expect(card).toBeInTheDocument();
      await expect(card).toHaveAttribute('selected');
      await expect(card?.shadowRoot?.querySelector('[aria-pressed="true"]')).toBeInTheDocument();

      // Afficher succès
      if (resultDiv) {
        resultDiv.style.color = '#10b981';
        resultDiv.innerHTML = '✅ Test réussi : État sélectionné et aria-pressed="true"';
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
 * Story d'interaction : teste le filtrage interactif Analytics.
 * Simule le comportement réel avec plusieurs cartes et changement de sélection au clic.
 * Les résultats sont visibles dans le panneau "Interactions" de Storybook.
 */
export const InteractionTestAnalyticsFilters: Story = {
  args: {
    theme: 'dark',
  },
  parameters: {
    docs: {
      description: {
        story: "Cette story teste le cas d'usage réel de la page Analytics avec filtrage interactif. Click sur une carte pour la sélectionner et désélectionner les autres."
      }
    }
  },
  render: (args) => `
    <div style="background: ${getSolidBackground(args.theme)}; padding: 2rem; min-height: 400px;">
      <h2 style="color: ${args.theme === 'dark' ? 'white' : 'black'}; margin-bottom: 1rem; font-size: 1.5rem; font-weight: bold;">
        Analyses IA & Prédictions
      </h2>
      <p style="color: ${args.theme === 'dark' ? '#9ca3af' : '#6b7280'}; margin-bottom: 1.5rem;">
        Filtrer par niveau de risque
      </p>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 1rem; margin-bottom: 2.5rem;">
        <sh-stat-card
          id="filter-all"
          label="Total Stocks"
          value="156"
          risk-level="default"
          data-theme="${args.theme}"
          selected
        ></sh-stat-card>

        <sh-stat-card
          id="filter-critical"
          label="Critique (≤3j)"
          value="15"
          risk-level="critical"
          data-theme="${args.theme}"
        ></sh-stat-card>

        <sh-stat-card
          id="filter-high"
          label="Élevé (4-7j)"
          value="22"
          risk-level="high"
          data-theme="${args.theme}"
        ></sh-stat-card>

        <sh-stat-card
          id="filter-medium"
          label="Moyen (8-14j)"
          value="32"
          risk-level="medium"
          data-theme="${args.theme}"
        ></sh-stat-card>

        <sh-stat-card
          id="filter-low"
          label="Faible (15j+)"
          value="87"
          risk-level="low"
          data-theme="${args.theme}"
        ></sh-stat-card>
      </div>

      <div id="test-result" style="color: #94a3b8; font-size: 14px; font-weight: 500; padding-top: 1rem; border-top: 1px solid ${args.theme === 'dark' ? '#334155' : '#e2e8f0'};">
        ⏳ Test en cours... (voir l'onglet "Interactions" en bas)
      </div>

      <script>
        (function() {
          const cards = document.querySelectorAll('sh-stat-card');
          cards.forEach(card => {
            card.addEventListener('sh-stat-click', (e) => {
              // Deselect all
              cards.forEach(c => c.removeAttribute('selected'));
              // Select clicked
              e.target.setAttribute('selected', '');
            });
          });
        })();
      </script>
    </div>
  `,
  play: async ({ canvasElement }) => {
    const resultDiv = canvasElement.querySelector('#test-result') as HTMLElement;

    try {
      const allCard = canvasElement.querySelector('#filter-all');
      const criticalCard = canvasElement.querySelector('#filter-critical');

      // Verify initial state: "all" is selected
      await expect(allCard).toHaveAttribute('selected');
      await expect(criticalCard).not.toHaveAttribute('selected');

      // Click on critical card
      const criticalButton = criticalCard?.shadowRoot?.querySelector('[role="button"]');
      if (criticalButton) {
        await userEvent.click(criticalButton as HTMLElement);

        // Wait a bit for the click handler
        await new Promise(resolve => setTimeout(resolve, 100));

        // Verify critical is now selected and all is deselected
        await expect(criticalCard).toHaveAttribute('selected');
        await expect(allCard).not.toHaveAttribute('selected');
      }

      // Afficher succès
      if (resultDiv) {
        resultDiv.style.color = '#10b981';
        resultDiv.innerHTML = '✅ Test réussi : Filtrage interactif fonctionne (All → Critical)';
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
