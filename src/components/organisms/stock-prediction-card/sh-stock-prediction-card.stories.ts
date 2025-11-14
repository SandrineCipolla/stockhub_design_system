import type { Meta, StoryObj } from '@storybook/web-components';
import { expect, userEvent, within } from '@storybook/test';
import './sh-stock-prediction-card';

const meta: Meta = {
  title: 'Components/Organisms/StockPredictionCard',
  component: 'sh-stock-prediction-card',
  tags: ['autodocs'],
  argTypes: {
    stockName: {
      control: 'text',
      description: 'Nom du stock',
    },
    stockId: {
      control: 'text',
      description: 'Identifiant unique du stock',
    },
    riskLevel: {
      control: 'select',
      options: ['critical', 'high', 'medium', 'low'],
      description: 'Niveau de risque de rupture',
    },
    daysUntilRupture: {
      control: 'number',
      description: 'Nombre de jours avant rupture (null = aucun risque)',
    },
    dateOfRupture: {
      control: 'text',
      description: 'Date de rupture estimée (ISO string)',
    },
    confidence: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Confiance de la prédiction ML (0-100%)',
    },
    dailyConsumptionRate: {
      control: 'number',
      description: 'Taux de consommation quotidien',
    },
    currentQuantity: {
      control: 'number',
      description: 'Quantité actuelle en stock',
    },
    daysUntilRupturePessimistic: {
      control: 'number',
      description: 'Estimation pessimiste (jours)',
    },
    daysUntilRuptureOptimistic: {
      control: 'number',
      description: 'Estimation optimiste (jours)',
    },
    recommendedReorderDate: {
      control: 'text',
      description: 'Date recommandée pour réapprovisionner',
    },
    recommendedReorderQuantity: {
      control: 'number',
      description: 'Quantité recommandée à commander',
    },
    showDetails: {
      control: 'boolean',
      description: 'Afficher la section détails',
    },
    clickable: {
      control: 'boolean',
      description: 'Carte cliquable',
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Thème de couleur',
    },
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

// Helper pour générer une date dans le futur
const getFutureDate = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
};

export const Critical: Story = {
  args: {
    stockName: 'Café Arabica Bio',
    stockId: 'stock-001',
    riskLevel: 'critical',
    daysUntilRupture: 2,
    dateOfRupture: getFutureDate(2),
    confidence: 92,
    dailyConsumptionRate: 15.5,
    currentQuantity: 31,
    daysUntilRupturePessimistic: 1,
    daysUntilRuptureOptimistic: 4,
    recommendedReorderDate: getFutureDate(1),
    recommendedReorderQuantity: 100,
    showDetails: true,
    clickable: false,
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; min-height: 100vh; box-sizing: border-box;">
      <div style="max-width: 400px;">
        <sh-stock-prediction-card
          stock-name="${args.stockName}"
          stock-id="${args.stockId}"
          risk-level="${args.riskLevel}"
          days-until-rupture="${args.daysUntilRupture}"
          date-of-rupture="${args.dateOfRupture}"
          confidence="${args.confidence}"
          daily-consumption-rate="${args.dailyConsumptionRate}"
          current-quantity="${args.currentQuantity}"
          days-until-rupture-pessimistic="${args.daysUntilRupturePessimistic}"
          days-until-rupture-optimistic="${args.daysUntilRuptureOptimistic}"
          recommended-reorder-date="${args.recommendedReorderDate}"
          recommended-reorder-quantity="${args.recommendedReorderQuantity}"
          ${args.showDetails ? 'show-details' : ''}
          ${args.clickable ? 'clickable' : ''}
          data-theme="${args.theme}"
        ></sh-stock-prediction-card>
      </div>
    </div>
  `,
};

export const High: Story = {
  args: {
    stockName: 'Thé Vert Matcha Premium',
    stockId: 'stock-002',
    riskLevel: 'high',
    daysUntilRupture: 5,
    dateOfRupture: getFutureDate(5),
    confidence: 88,
    dailyConsumptionRate: 12.3,
    currentQuantity: 62,
    daysUntilRupturePessimistic: 4,
    daysUntilRuptureOptimistic: 7,
    recommendedReorderDate: getFutureDate(3),
    recommendedReorderQuantity: 80,
    showDetails: true,
    clickable: false,
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; min-height: 100vh; box-sizing: border-box;">
      <div style="max-width: 400px;">
        <sh-stock-prediction-card
          stock-name="${args.stockName}"
          stock-id="${args.stockId}"
          risk-level="${args.riskLevel}"
          days-until-rupture="${args.daysUntilRupture}"
          date-of-rupture="${args.dateOfRupture}"
          confidence="${args.confidence}"
          daily-consumption-rate="${args.dailyConsumptionRate}"
          current-quantity="${args.currentQuantity}"
          days-until-rupture-pessimistic="${args.daysUntilRupturePessimistic}"
          days-until-rupture-optimistic="${args.daysUntilRuptureOptimistic}"
          recommended-reorder-date="${args.recommendedReorderDate}"
          recommended-reorder-quantity="${args.recommendedReorderQuantity}"
          ${args.showDetails ? 'show-details' : ''}
          ${args.clickable ? 'clickable' : ''}
          data-theme="${args.theme}"
        ></sh-stock-prediction-card>
      </div>
    </div>
  `,
};

export const Medium: Story = {
  args: {
    stockName: 'Sucre de Canne Bio',
    stockId: 'stock-003',
    riskLevel: 'medium',
    daysUntilRupture: 10,
    dateOfRupture: getFutureDate(10),
    confidence: 85,
    dailyConsumptionRate: 8.7,
    currentQuantity: 87,
    daysUntilRupturePessimistic: 8,
    daysUntilRuptureOptimistic: 12,
    recommendedReorderDate: getFutureDate(7),
    recommendedReorderQuantity: 60,
    showDetails: true,
    clickable: false,
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; min-height: 100vh; box-sizing: border-box;">
      <div style="max-width: 400px;">
        <sh-stock-prediction-card
          stock-name="${args.stockName}"
          stock-id="${args.stockId}"
          risk-level="${args.riskLevel}"
          days-until-rupture="${args.daysUntilRupture}"
          date-of-rupture="${args.dateOfRupture}"
          confidence="${args.confidence}"
          daily-consumption-rate="${args.dailyConsumptionRate}"
          current-quantity="${args.currentQuantity}"
          days-until-rupture-pessimistic="${args.daysUntilRupturePessimistic}"
          days-until-rupture-optimistic="${args.daysUntilRuptureOptimistic}"
          recommended-reorder-date="${args.recommendedReorderDate}"
          recommended-reorder-quantity="${args.recommendedReorderQuantity}"
          ${args.showDetails ? 'show-details' : ''}
          ${args.clickable ? 'clickable' : ''}
          data-theme="${args.theme}"
        ></sh-stock-prediction-card>
      </div>
    </div>
  `,
};

export const Low: Story = {
  args: {
    stockName: 'Lait d\'Amande Vanille',
    stockId: 'stock-004',
    riskLevel: 'low',
    daysUntilRupture: 18,
    dateOfRupture: getFutureDate(18),
    confidence: 82,
    dailyConsumptionRate: 5.2,
    currentQuantity: 94,
    daysUntilRupturePessimistic: 15,
    daysUntilRuptureOptimistic: 21,
    recommendedReorderDate: getFutureDate(14),
    recommendedReorderQuantity: 50,
    showDetails: true,
    clickable: false,
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; min-height: 100vh; box-sizing: border-box;">
      <div style="max-width: 400px;">
        <sh-stock-prediction-card
          stock-name="${args.stockName}"
          stock-id="${args.stockId}"
          risk-level="${args.riskLevel}"
          days-until-rupture="${args.daysUntilRupture}"
          date-of-rupture="${args.dateOfRupture}"
          confidence="${args.confidence}"
          daily-consumption-rate="${args.dailyConsumptionRate}"
          current-quantity="${args.currentQuantity}"
          days-until-rupture-pessimistic="${args.daysUntilRupturePessimistic}"
          days-until-rupture-optimistic="${args.daysUntilRuptureOptimistic}"
          recommended-reorder-date="${args.recommendedReorderDate}"
          recommended-reorder-quantity="${args.recommendedReorderQuantity}"
          ${args.showDetails ? 'show-details' : ''}
          ${args.clickable ? 'clickable' : ''}
          data-theme="${args.theme}"
        ></sh-stock-prediction-card>
      </div>
    </div>
  `,
};

export const NoRuptureDetected: Story = {
  args: {
    stockName: 'Chocolat Noir 70%',
    stockId: 'stock-005',
    riskLevel: 'low',
    daysUntilRupture: null,
    dateOfRupture: '',
    confidence: 95,
    dailyConsumptionRate: 3.1,
    currentQuantity: 150,
    daysUntilRupturePessimistic: null,
    daysUntilRuptureOptimistic: null,
    recommendedReorderDate: '',
    recommendedReorderQuantity: 0,
    showDetails: false,
    clickable: false,
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; min-height: 100vh; box-sizing: border-box;">
      <div style="max-width: 400px;">
        <sh-stock-prediction-card
          stock-name="${args.stockName}"
          stock-id="${args.stockId}"
          risk-level="${args.riskLevel}"
          confidence="${args.confidence}"
          daily-consumption-rate="${args.dailyConsumptionRate}"
          current-quantity="${args.currentQuantity}"
          ${args.showDetails ? 'show-details' : ''}
          ${args.clickable ? 'clickable' : ''}
          data-theme="${args.theme}"
        ></sh-stock-prediction-card>
      </div>
    </div>
  `,
};

export const WithoutDetails: Story = {
  args: {
    stockName: 'Miel de Lavande',
    stockId: 'stock-006',
    riskLevel: 'medium',
    daysUntilRupture: 9,
    dateOfRupture: getFutureDate(9),
    confidence: 87,
    dailyConsumptionRate: 6.8,
    currentQuantity: 61,
    daysUntilRupturePessimistic: 7,
    daysUntilRuptureOptimistic: 11,
    recommendedReorderDate: '',
    recommendedReorderQuantity: 0,
    showDetails: false,
    clickable: false,
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; min-height: 100vh; box-sizing: border-box;">
      <div style="max-width: 400px;">
        <sh-stock-prediction-card
          stock-name="${args.stockName}"
          stock-id="${args.stockId}"
          risk-level="${args.riskLevel}"
          days-until-rupture="${args.daysUntilRupture}"
          date-of-rupture="${args.dateOfRupture}"
          confidence="${args.confidence}"
          daily-consumption-rate="${args.dailyConsumptionRate}"
          current-quantity="${args.currentQuantity}"
          days-until-rupture-pessimistic="${args.daysUntilRupturePessimistic}"
          days-until-rupture-optimistic="${args.daysUntilRuptureOptimistic}"
          ${args.showDetails ? 'show-details' : ''}
          ${args.clickable ? 'clickable' : ''}
          data-theme="${args.theme}"
        ></sh-stock-prediction-card>
      </div>
    </div>
  `,
};

export const DarkMode: Story = {
  args: {
    stockName: 'Café Arabica Bio',
    stockId: 'stock-007',
    riskLevel: 'critical',
    daysUntilRupture: 2,
    dateOfRupture: getFutureDate(2),
    confidence: 92,
    dailyConsumptionRate: 15.5,
    currentQuantity: 31,
    daysUntilRupturePessimistic: 1,
    daysUntilRuptureOptimistic: 4,
    recommendedReorderDate: getFutureDate(1),
    recommendedReorderQuantity: 100,
    showDetails: true,
    clickable: false,
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; min-height: 100vh; box-sizing: border-box;">
      <div style="max-width: 400px;">
        <sh-stock-prediction-card
          stock-name="${args.stockName}"
          stock-id="${args.stockId}"
          risk-level="${args.riskLevel}"
          days-until-rupture="${args.daysUntilRupture}"
          date-of-rupture="${args.dateOfRupture}"
          confidence="${args.confidence}"
          daily-consumption-rate="${args.dailyConsumptionRate}"
          current-quantity="${args.currentQuantity}"
          days-until-rupture-pessimistic="${args.daysUntilRupturePessimistic}"
          days-until-rupture-optimistic="${args.daysUntilRuptureOptimistic}"
          recommended-reorder-date="${args.recommendedReorderDate}"
          recommended-reorder-quantity="${args.recommendedReorderQuantity}"
          ${args.showDetails ? 'show-details' : ''}
          ${args.clickable ? 'clickable' : ''}
          data-theme="${args.theme}"
        ></sh-stock-prediction-card>
      </div>
    </div>
  `,
};

export const Clickable: Story = {
  args: {
    stockName: 'Café Arabica Bio',
    stockId: 'stock-008',
    riskLevel: 'high',
    daysUntilRupture: 5,
    dateOfRupture: getFutureDate(5),
    confidence: 88,
    dailyConsumptionRate: 12.3,
    currentQuantity: 62,
    daysUntilRupturePessimistic: 4,
    daysUntilRuptureOptimistic: 7,
    recommendedReorderDate: getFutureDate(3),
    recommendedReorderQuantity: 80,
    showDetails: true,
    clickable: true,
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; min-height: 100vh; box-sizing: border-box;">
      <div style="max-width: 400px;">
        <sh-stock-prediction-card
          stock-name="${args.stockName}"
          stock-id="${args.stockId}"
          risk-level="${args.riskLevel}"
          days-until-rupture="${args.daysUntilRupture}"
          date-of-rupture="${args.dateOfRupture}"
          confidence="${args.confidence}"
          daily-consumption-rate="${args.dailyConsumptionRate}"
          current-quantity="${args.currentQuantity}"
          days-until-rupture-pessimistic="${args.daysUntilRupturePessimistic}"
          days-until-rupture-optimistic="${args.daysUntilRuptureOptimistic}"
          recommended-reorder-date="${args.recommendedReorderDate}"
          recommended-reorder-quantity="${args.recommendedReorderQuantity}"
          ${args.showDetails ? 'show-details' : ''}
          ${args.clickable ? 'clickable' : ''}
          data-theme="${args.theme}"
        ></sh-stock-prediction-card>
      </div>
    </div>
    <script>
      document.querySelector('sh-stock-prediction-card').addEventListener('sh-stock-prediction-click', (e) => {
        console.log('Card clicked:', e.detail);
        alert('Prédiction cliquée: ' + e.detail.stockName + ' (' + e.detail.riskLevel + ')');
      });
    </script>
  `,
};

export const Grid: Story = {
  args: {
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; min-height: 100vh; box-sizing: border-box;">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1rem;">
        <sh-stock-prediction-card
          stock-name="Café Arabica Bio"
          risk-level="critical"
          days-until-rupture="2"
          date-of-rupture="${getFutureDate(2)}"
          confidence="92"
          daily-consumption-rate="15.5"
          current-quantity="31"
          days-until-rupture-pessimistic="1"
          days-until-rupture-optimistic="4"
          recommended-reorder-date="${getFutureDate(1)}"
          recommended-reorder-quantity="100"
          show-details
          data-theme="${args.theme}"
        ></sh-stock-prediction-card>

        <sh-stock-prediction-card
          stock-name="Thé Vert Matcha"
          risk-level="high"
          days-until-rupture="5"
          date-of-rupture="${getFutureDate(5)}"
          confidence="88"
          daily-consumption-rate="12.3"
          current-quantity="62"
          days-until-rupture-pessimistic="4"
          days-until-rupture-optimistic="7"
          show-details
          data-theme="${args.theme}"
        ></sh-stock-prediction-card>

        <sh-stock-prediction-card
          stock-name="Sucre de Canne"
          risk-level="medium"
          days-until-rupture="10"
          date-of-rupture="${getFutureDate(10)}"
          confidence="85"
          daily-consumption-rate="8.7"
          current-quantity="87"
          days-until-rupture-pessimistic="8"
          days-until-rupture-optimistic="12"
          show-details
          data-theme="${args.theme}"
        ></sh-stock-prediction-card>

        <sh-stock-prediction-card
          stock-name="Lait d'Amande"
          risk-level="low"
          days-until-rupture="18"
          confidence="82"
          daily-consumption-rate="5.2"
          current-quantity="94"
          show-details
          data-theme="${args.theme}"
        ></sh-stock-prediction-card>
      </div>
    </div>
  `,
};

/**
 * Test d'interaction - Click sur carte cliquable
 */
export const InteractionTestClickable: Story = {
  args: {
    stockName: 'Café Arabica Bio - Test Click',
    stockId: 'stock-test-001',
    riskLevel: 'critical',
    daysUntilRupture: 2,
    dateOfRupture: getFutureDate(2),
    confidence: 92,
    dailyConsumptionRate: 15.5,
    currentQuantity: 31,
    daysUntilRupturePessimistic: 1,
    daysUntilRuptureOptimistic: 4,
    recommendedReorderDate: getFutureDate(1),
    recommendedReorderQuantity: 100,
    showDetails: true,
    clickable: true,
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; min-height: 600px;">
      <div style="max-width: 400px;">
        <sh-stock-prediction-card
          id="stock-prediction-test-click"
          stock-name="${args.stockName}"
          stock-id="${args.stockId}"
          risk-level="${args.riskLevel}"
          days-until-rupture="${args.daysUntilRupture}"
          date-of-rupture="${args.dateOfRupture}"
          confidence="${args.confidence}"
          daily-consumption-rate="${args.dailyConsumptionRate}"
          current-quantity="${args.currentQuantity}"
          days-until-rupture-pessimistic="${args.daysUntilRupturePessimistic}"
          days-until-rupture-optimistic="${args.daysUntilRuptureOptimistic}"
          recommended-reorder-date="${args.recommendedReorderDate}"
          recommended-reorder-quantity="${args.recommendedReorderQuantity}"
          ${args.showDetails ? 'show-details' : ''}
          ${args.clickable ? 'clickable' : ''}
          data-theme="${args.theme}"
        ></sh-stock-prediction-card>
      </div>

      <div id="test-result" style="margin-top: 2rem; padding: 1rem; background: #1e293b; border-radius: 8px; color: white;">
        En attente du test...
      </div>
    </div>
  `,
  play: async ({ canvasElement }) => {
    const resultDiv = canvasElement.querySelector('#test-result') as HTMLElement;

    try {
      await customElements.whenDefined('sh-stock-prediction-card');
      await new Promise(resolve => setTimeout(resolve, 100));

      const card = canvasElement.querySelector('#stock-prediction-test-click') as any;
      await expect(card).toBeInTheDocument();

      // Test 1: Vérifier que la carte est cliquable
      await expect(card.clickable).toBe(true);
      resultDiv.innerHTML = '✓ Test 1: Carte cliquable détectée';

      // Test 2: Click sur la carte et vérifier l'événement
      let clickEventFired = false;
      let eventDetail: any = null;

      card.addEventListener('sh-stock-prediction-click', (e: CustomEvent) => {
        clickEventFired = true;
        eventDetail = e.detail;
      });

      const predictionCard = card.shadowRoot?.querySelector('.prediction-card');
      await userEvent.click(predictionCard as HTMLElement);
      await new Promise(resolve => setTimeout(resolve, 50));

      await expect(clickEventFired).toBe(true);
      resultDiv.innerHTML += '<br>✓ Test 2: Événement sh-stock-prediction-click émis';

      // Test 3: Vérifier le payload de l'événement
      await expect(eventDetail).toBeDefined();
      await expect(eventDetail.stockId).toBe('stock-test-001');
      await expect(eventDetail.stockName).toBe('Café Arabica Bio - Test Click');
      await expect(eventDetail.riskLevel).toBe('critical');
      await expect(eventDetail.daysUntilRupture).toBe(2);
      resultDiv.innerHTML += '<br>✓ Test 3: Payload de l\'événement correct';

      resultDiv.innerHTML += '<br><br><strong style="color: #10b981;">✅ Tous les tests passés!</strong>';
    } catch (error) {
      resultDiv.innerHTML = `<strong style="color: #ef4444;">❌ Erreur:</strong> ${error}`;
      throw error;
    }
  },
};

/**
 * Test d'interaction - Affichage conditionnel des détails
 */
export const InteractionTestShowDetails: Story = {
  args: {
    stockName: 'Thé Vert Matcha - Test Details',
    stockId: 'stock-test-002',
    riskLevel: 'high',
    daysUntilRupture: 5,
    dateOfRupture: getFutureDate(5),
    confidence: 88,
    dailyConsumptionRate: 12.3,
    currentQuantity: 62,
    daysUntilRupturePessimistic: 4,
    daysUntilRuptureOptimistic: 7,
    recommendedReorderDate: getFutureDate(3),
    recommendedReorderQuantity: 80,
    showDetails: true,
    clickable: false,
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; min-height: 600px;">
      <div style="max-width: 400px;">
        <sh-stock-prediction-card
          id="stock-prediction-test-details"
          stock-name="${args.stockName}"
          stock-id="${args.stockId}"
          risk-level="${args.riskLevel}"
          days-until-rupture="${args.daysUntilRupture}"
          date-of-rupture="${args.dateOfRupture}"
          confidence="${args.confidence}"
          daily-consumption-rate="${args.dailyConsumptionRate}"
          current-quantity="${args.currentQuantity}"
          days-until-rupture-pessimistic="${args.daysUntilRupturePessimistic}"
          days-until-rupture-optimistic="${args.daysUntilRuptureOptimistic}"
          recommended-reorder-date="${args.recommendedReorderDate}"
          recommended-reorder-quantity="${args.recommendedReorderQuantity}"
          ${args.showDetails ? 'show-details' : ''}
          data-theme="${args.theme}"
        ></sh-stock-prediction-card>
      </div>

      <div id="test-result" style="margin-top: 2rem; padding: 1rem; background: #1e293b; border-radius: 8px; color: white;">
        En attente du test...
      </div>
    </div>
  `,
  play: async ({ canvasElement }) => {
    const resultDiv = canvasElement.querySelector('#test-result') as HTMLElement;

    try {
      await customElements.whenDefined('sh-stock-prediction-card');
      await new Promise(resolve => setTimeout(resolve, 100));

      const card = canvasElement.querySelector('#stock-prediction-test-details') as any;
      await expect(card).toBeInTheDocument();

      // Test 1: Vérifier que showDetails est true
      await expect(card.showDetails).toBe(true);
      resultDiv.innerHTML = '✓ Test 1: showDetails = true';

      // Test 2: Vérifier que la section détails est affichée
      const detailsSection = card.shadowRoot?.querySelector('.details');
      await expect(detailsSection).toBeInTheDocument();
      resultDiv.innerHTML += '<br>✓ Test 2: Section détails affichée';

      // Test 3: Vérifier que les éléments de détails sont présents
      const detailItems = card.shadowRoot?.querySelectorAll('.detail-item');
      await expect(detailItems.length).toBeGreaterThan(0);
      resultDiv.innerHTML += '<br>✓ Test 3: Éléments de détails présents';

      // Test 4: Vérifier que la recommandation est affichée
      const recommendation = card.shadowRoot?.querySelector('.recommendation');
      await expect(recommendation).toBeInTheDocument();
      resultDiv.innerHTML += '<br>✓ Test 4: Recommandation affichée';

      resultDiv.innerHTML += '<br><br><strong style="color: #10b981;">✅ Tous les tests passés!</strong>';
    } catch (error) {
      resultDiv.innerHTML = `<strong style="color: #ef4444;">❌ Erreur:</strong> ${error}`;
      throw error;
    }
  },
};

/**
 * Test d'interaction - Différents niveaux de risque
 */
export const InteractionTestRiskLevels: Story = {
  args: {
    stockName: 'Test Niveaux de Risque',
    stockId: 'stock-test-003',
    riskLevel: 'critical',
    daysUntilRupture: 2,
    dateOfRupture: getFutureDate(2),
    confidence: 92,
    dailyConsumptionRate: 15.5,
    currentQuantity: 31,
    showDetails: false,
    clickable: false,
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; min-height: 600px;">
      <div style="max-width: 400px;">
        <sh-stock-prediction-card
          id="stock-prediction-test-risk"
          stock-name="${args.stockName}"
          stock-id="${args.stockId}"
          risk-level="${args.riskLevel}"
          days-until-rupture="${args.daysUntilRupture}"
          date-of-rupture="${args.dateOfRupture}"
          confidence="${args.confidence}"
          daily-consumption-rate="${args.dailyConsumptionRate}"
          current-quantity="${args.currentQuantity}"
          data-theme="${args.theme}"
        ></sh-stock-prediction-card>
      </div>

      <div id="test-result" style="margin-top: 2rem; padding: 1rem; background: #1e293b; border-radius: 8px; color: white;">
        En attente du test...
      </div>
    </div>
  `,
  play: async ({ canvasElement }) => {
    const resultDiv = canvasElement.querySelector('#test-result') as HTMLElement;

    try {
      await customElements.whenDefined('sh-stock-prediction-card');
      await new Promise(resolve => setTimeout(resolve, 100));

      const card = canvasElement.querySelector('#stock-prediction-test-risk') as any;
      await expect(card).toBeInTheDocument();

      // Test 1: Vérifier le niveau de risque initial (critical)
      await expect(card.riskLevel).toBe('critical');
      await expect(card.getAttribute('risk-level')).toBe('critical');
      resultDiv.innerHTML = '✓ Test 1: Niveau de risque critical détecté';

      // Test 2: Vérifier l'icône pour critical (AlertTriangle)
      const icon = card.shadowRoot?.querySelector('sh-icon');
      await expect(icon).toBeInTheDocument();
      await expect(icon.getAttribute('name')).toBe('AlertTriangle');
      resultDiv.innerHTML += '<br>✓ Test 2: Icône AlertTriangle affichée';

      // Test 3: Vérifier la barre de progression
      const progressBar = card.shadowRoot?.querySelector('.progress-bar');
      await expect(progressBar).toBeInTheDocument();
      resultDiv.innerHTML += '<br>✓ Test 3: Barre de progression présente';

      // Test 4: Vérifier le badge de confiance
      const confidenceBadge = card.shadowRoot?.querySelector('.confidence-badge');
      await expect(confidenceBadge).toBeInTheDocument();
      await expect(confidenceBadge.textContent).toContain('92%');
      resultDiv.innerHTML += '<br>✓ Test 4: Badge de confiance affiche 92%';

      resultDiv.innerHTML += '<br><br><strong style="color: #10b981;">✅ Tous les tests passés!</strong>';
    } catch (error) {
      resultDiv.innerHTML = `<strong style="color: #ef4444;">❌ Erreur:</strong> ${error}`;
      throw error;
    }
  },
};
