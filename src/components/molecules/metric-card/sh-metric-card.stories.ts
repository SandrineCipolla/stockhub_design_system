import type { Meta, StoryObj } from '@storybook/web-components';
import './sh-metric-card';

const meta: Meta = {
  title: 'Components/Molecules/MetricCard',
  component: 'sh-metric-card',
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: 'text',
      description: 'Icône Lucide (PascalCase)',
      table: {
        defaultValue: { summary: 'TrendingUp' }
      }
    },
    label: {
      control: 'text',
      description: 'Label descriptif de la métrique'
    },
    value: {
      control: 'text',
      description: 'Valeur à afficher (nombre ou texte)'
    },
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'danger', 'info'],
      description: 'Variant de couleur',
      table: {
        defaultValue: { summary: 'default' }
      }
    },
    trend: {
      control: 'select',
      options: [undefined, 'increase', 'decrease'],
      description: 'Direction de la tendance',
      table: {
        defaultValue: { summary: 'undefined' }
      }
    },
    trendValue: {
      control: 'text',
      description: 'Valeur de la tendance (ex: "+12%", "-5")'
    },
    clickable: {
      control: 'boolean',
      description: 'Rend la carte cliquable',
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
 * Carte métrique par défaut avec icône TrendingUp
 */
export const Default: Story = {
  args: {
    icon: 'TrendingUp',
    label: 'Total Items',
    value: '1,234',
    variant: 'default',
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; max-width: 320px;">
      <sh-metric-card
        icon="${args.icon}"
        label="${args.label}"
        value="${args.value}"
        variant="${args.variant}"
        data-theme="${args.theme}"
        ${args.clickable ? 'clickable' : ''}
      ></sh-metric-card>
    </div>
  `,
};

/**
 * Métrique avec tendance à la hausse
 */
export const WithIncreaseTrend: Story = {
  args: {
    icon: 'Package',
    label: 'Total Produits',
    value: '156',
    variant: 'success',
    trend: 'increase',
    trendValue: '+12',
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; max-width: 320px;">
      <sh-metric-card
        icon="${args.icon}"
        label="${args.label}"
        value="${args.value}"
        variant="${args.variant}"
        trend="${args.trend}"
        trend-value="${args.trendValue}"
        data-theme="${args.theme}"
      ></sh-metric-card>
    </div>
  `,
};

/**
 * Métrique avec tendance à la baisse
 */
export const WithDecreaseTrend: Story = {
  args: {
    icon: 'AlertTriangle',
    label: 'Stock Critique',
    value: '3',
    variant: 'danger',
    trend: 'decrease',
    trendValue: '-2',
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; max-width: 320px;">
      <sh-metric-card
        icon="${args.icon}"
        label="${args.label}"
        value="${args.value}"
        variant="${args.variant}"
        trend="${args.trend}"
        trend-value="${args.trendValue}"
        data-theme="${args.theme}"
      ></sh-metric-card>
    </div>
  `,
};

/**
 * Métrique avec valeur monétaire
 */
export const MonetaryValue: Story = {
  args: {
    icon: 'DollarSign',
    label: 'Valeur Totale',
    value: '€45,250',
    variant: 'info',
    trend: 'increase',
    trendValue: '+15%',
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; max-width: 320px;">
      <sh-metric-card
        icon="${args.icon}"
        label="${args.label}"
        value="${args.value}"
        variant="${args.variant}"
        trend="${args.trend}"
        trend-value="${args.trendValue}"
        data-theme="${args.theme}"
      ></sh-metric-card>
    </div>
  `,
};

/**
 * Métrique cliquable avec effet hover
 */
export const Clickable: Story = {
  args: {
    icon: 'BarChart',
    label: 'Voir Détails',
    value: '892',
    variant: 'info',
    clickable: true,
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; max-width: 320px;">
      <sh-metric-card
        icon="${args.icon}"
        label="${args.label}"
        value="${args.value}"
        variant="${args.variant}"
        data-theme="${args.theme}"
        ${args.clickable ? 'clickable' : ''}
      ></sh-metric-card>

      <script>
        document.querySelector('sh-metric-card').addEventListener('sh-metric-click', (e) => {
          console.log('Metric clicked:', e.detail);
          alert('Carte métrique cliquée ! Voir la console pour les détails.');
        });
      </script>
    </div>
  `,
};

/**
 * Tous les variants de couleur
 */
export const AllVariants: Story = {
  args: {
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; min-height: 100vh; box-sizing: border-box;">
      <div style="display: flex; flex-wrap: wrap; gap: 1.5rem; justify-content: center;">
        <div style="flex: 1 1 300px; max-width: 320px;">
          <sh-metric-card
            icon="Package"
            label="Success Variant"
            value="156"
            variant="success"
            trend="increase"
            trend-value="+12"
            data-theme="${args.theme}"
          ></sh-metric-card>
        </div>

        <div style="flex: 1 1 300px; max-width: 320px;">
          <sh-metric-card
            icon="AlertTriangle"
            label="Warning Variant"
            value="42"
            variant="warning"
            trend="increase"
            trend-value="+3"
            data-theme="${args.theme}"
          ></sh-metric-card>
        </div>

        <div style="flex: 1 1 300px; max-width: 320px;">
          <sh-metric-card
            icon="XCircle"
            label="Danger Variant"
            value="3"
            variant="danger"
            trend="decrease"
            trend-value="-2"
            data-theme="${args.theme}"
          ></sh-metric-card>
        </div>

        <div style="flex: 1 1 300px; max-width: 320px;">
          <sh-metric-card
            icon="TrendingUp"
            label="Info Variant"
            value="€45,250"
            variant="info"
            trend="increase"
            trend-value="+15%"
            data-theme="${args.theme}"
          ></sh-metric-card>
        </div>

        <div style="flex: 1 1 300px; max-width: 320px;">
          <sh-metric-card
            icon="BarChart"
            label="Default Variant"
            value="1,234"
            variant="default"
            data-theme="${args.theme}"
          ></sh-metric-card>
        </div>
      </div>
    </div>
  `,
};

/**
 * Dashboard réaliste avec métriques StockHub V2
 */
export const DashboardExample: Story = {
  args: {
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; min-height: 100vh; box-sizing: border-box;">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; max-width: 100%;">
      <!-- Total Produits -->
      <sh-metric-card
        icon="Package"
        label="Total Produits"
        value="156"
        variant="success"
        trend="increase"
        trend-value="+12"
        data-theme="${args.theme}"
        clickable
      ></sh-metric-card>

      <!-- Stock Faible -->
      <sh-metric-card
        icon="AlertTriangle"
        label="Stock Faible"
        value="42"
        variant="warning"
        trend="increase"
        trend-value="+3"
        data-theme="${args.theme}"
        clickable
      ></sh-metric-card>

      <!-- Stock Critique -->
      <sh-metric-card
        icon="AlertCircle"
        label="Stock Critique"
        value="3"
        variant="danger"
        trend="decrease"
        trend-value="-2"
        data-theme="${args.theme}"
        clickable
      ></sh-metric-card>

      <!-- Valeur Totale -->
      <sh-metric-card
        icon="DollarSign"
        label="Valeur Totale"
        value="€45,250"
        variant="info"
        trend="increase"
        trend-value="+15%"
        data-theme="${args.theme}"
        clickable
      ></sh-metric-card>
      </div>
    </div>

    <script>
      document.querySelectorAll('sh-metric-card').forEach(card => {
        card.addEventListener('sh-metric-click', (e) => {
          console.log('Dashboard metric clicked:', e.detail);
        });
      });
    </script>
  `,
};

