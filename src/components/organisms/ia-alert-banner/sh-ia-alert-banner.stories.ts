import type { Meta, StoryObj } from '@storybook/web-components';
import './sh-ia-alert-banner';

const meta: Meta = {
  title: 'Components/Organisms/IaAlertBanner',
  component: 'sh-ia-alert-banner',
  tags: ['autodocs'],
  argTypes: {
    count: {
      control: 'number',
      description: 'Nombre d\'alertes'
    },
    severity: {
      control: 'select',
      options: ['critical', 'warning', 'info'],
      description: 'Niveau de sévérité'
    },
    message: {
      control: 'text',
      description: 'Message principal'
    },
    expanded: {
      control: 'boolean',
      description: 'Afficher les détails'
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Thème'
    }
  },
  args: {
    theme: 'dark',
  },
};

export default meta;
type Story = StoryObj;

const getBackground = (theme: string) => theme === 'dark'
  ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)'
  : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)';

const sampleAlerts = [
  { product: 'Acrylique Jaune Cadmium', message: 'Risque de rupture détecté', severity: 'critical' },
  { product: 'Feutrine Rouge', message: 'Risque de rupture détecté', severity: 'critical' },
  { product: 'Riz Basmati', message: 'Risque de rupture détecté', severity: 'warning' },
  { product: 'Acrylique Rouge Vermillon', message: 'Risque de rupture détecté', severity: 'critical' },
  { product: 'Levure Chimique', message: 'Risque de rupture détecté', severity: 'warning' },
];

/**
 * Alerte critique (comme dans StockHub V2)
 */
export const Critical: Story = {
  args: {
    count: 5,
    severity: 'critical',
    message: 'stocks nécessitent votre attention',
    expanded: true,
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; min-height: 400px; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
      <sh-ia-alert-banner
        id="alert-critical"
        count="${args.count}"
        severity="${args.severity}"
        message="${args.message}"
        ?expanded="${args.expanded}"
        data-theme="${args.theme}"
      ></sh-ia-alert-banner>
    </div>

    <script>
      customElements.whenDefined('sh-ia-alert-banner').then(() => {
        const banner = document.getElementById('alert-critical');
        if (banner) {
          banner.alerts = ${JSON.stringify(sampleAlerts)};

          banner.addEventListener('sh-ia-alert-item-click', (e) => {
            console.log('Alert item clicked:', e.detail);
            alert('Navigation vers: ' + e.detail.product);
          });
        }
      });
    </script>
  `,
};

/**
 * Alerte warning
 */
export const Warning: Story = {
  args: {
    count: 3,
    severity: 'warning',
    message: 'stocks à surveiller',
    expanded: true,
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; min-height: 400px; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
      <sh-ia-alert-banner
        id="alert-warning"
        count="${args.count}"
        severity="${args.severity}"
        message="${args.message}"
        ?expanded="${args.expanded}"
        data-theme="${args.theme}"
      ></sh-ia-alert-banner>
    </div>

    <script>
      customElements.whenDefined('sh-ia-alert-banner').then(() => {
        const banner = document.getElementById('alert-warning');
        if (banner) {
          banner.alerts = ${JSON.stringify(sampleAlerts.slice(0, 3))};
        }
      });
    </script>
  `,
};

/**
 * Alerte info
 */
export const Info: Story = {
  args: {
    count: 2,
    severity: 'info',
    message: 'suggestions disponibles',
    expanded: true,
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; min-height: 400px; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
      <sh-ia-alert-banner
        id="alert-info"
        count="${args.count}"
        severity="${args.severity}"
        message="${args.message}"
        ?expanded="${args.expanded}"
        data-theme="${args.theme}"
      ></sh-ia-alert-banner>
    </div>

    <script>
      customElements.whenDefined('sh-ia-alert-banner').then(() => {
        const banner = document.getElementById('alert-info');
        if (banner) {
          banner.alerts = ${JSON.stringify(sampleAlerts.slice(0, 2))};
        }
      });
    </script>
  `,
};

/**
 * Bandeau réduit
 */
export const Collapsed: Story = {
  args: {
    count: 5,
    severity: 'critical',
    message: 'stocks nécessitent votre attention',
    expanded: false,
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; min-height: 200px; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
      <sh-ia-alert-banner
        id="alert-collapsed"
        count="${args.count}"
        severity="${args.severity}"
        message="${args.message}"
        ?expanded="${args.expanded}"
        data-theme="${args.theme}"
      ></sh-ia-alert-banner>
    </div>

    <script>
      customElements.whenDefined('sh-ia-alert-banner').then(() => {
        const banner = document.getElementById('alert-collapsed');
        if (banner) {
          banner.alerts = ${JSON.stringify(sampleAlerts)};
        }
      });
    </script>
  `,
};

/**
 * Sans alertes détaillées
 */
export const NoDetails: Story = {
  args: {
    count: 5,
    severity: 'critical',
    message: 'stocks nécessitent votre attention',
    expanded: true,
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; min-height: 200px; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
      <sh-ia-alert-banner
        count="${args.count}"
        severity="${args.severity}"
        message="${args.message}"
        ?expanded="${args.expanded}"
        data-theme="${args.theme}"
      ></sh-ia-alert-banner>
    </div>
  `,
};

/**
 * Intégré dans une page
 */
export const InPage: Story = {
  args: {
    count: 5,
    severity: 'critical',
    message: 'stocks nécessitent votre attention',
    expanded: true,
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; min-height: 100vh; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
      <h1 style="margin: 0 0 1.5rem 0;">Dashboard</h1>

      <sh-ia-alert-banner
        id="alert-page"
        count="${args.count}"
        severity="${args.severity}"
        message="${args.message}"
        ?expanded="${args.expanded}"
        data-theme="${args.theme}"
      ></sh-ia-alert-banner>

      <h2 style="margin: 2rem 0 1rem 0;">Mes Stocks Récents (18)</h2>
      <div style="padding: 2rem; background: ${args.theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)'}; border-radius: 8px; border: 1px solid ${args.theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'};">
        <p style="margin: 0; color: ${args.theme === 'dark' ? '#9ca3af' : '#6b7280'};">
          Les cartes de stock apparaîtraient ici...
        </p>
      </div>
    </div>

    <script>
      customElements.whenDefined('sh-ia-alert-banner').then(() => {
        const banner = document.getElementById('alert-page');
        if (banner) {
          banner.alerts = ${JSON.stringify(sampleAlerts)};

          banner.addEventListener('sh-ia-alert-item-click', (e) => {
            console.log('Navigating to:', e.detail.product);
          });
        }
      });
    </script>
  `,
};

/**
 * Playground interactif
 */
export const Playground: Story = {
  args: {
    count: 5,
    severity: 'critical',
    message: 'stocks nécessitent votre attention',
    expanded: true,
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; min-height: 400px; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
      <sh-ia-alert-banner
        id="alert-playground"
        count="${args.count}"
        severity="${args.severity}"
        message="${args.message}"
        ?expanded="${args.expanded}"
        data-theme="${args.theme}"
      ></sh-ia-alert-banner>
    </div>

    <script>
      customElements.whenDefined('sh-ia-alert-banner').then(() => {
        const banner = document.getElementById('alert-playground');
        if (banner) {
          banner.alerts = ${JSON.stringify(sampleAlerts)};
        }
      });
    </script>
  `,
};
