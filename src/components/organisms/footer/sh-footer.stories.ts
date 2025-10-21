import type { Meta, StoryObj } from '@storybook/web-components';
import './sh-footer';

const meta: Meta = {
  title: 'Components/Organisms/Footer',
  component: 'sh-footer',
  tags: ['autodocs'],
  argTypes: {
    appName: {
      control: 'text',
      description: 'Nom de l\'application'
    },
    year: {
      control: 'text',
      description: 'Année du copyright'
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

/**
 * Footer par défaut
 */
export const Default: Story = {
  args: {
    appName: 'STOCK HUB',
    year: '2025',
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; min-height: 100vh; display: flex; flex-direction: column;">
      <div style="flex: 1; padding: 2rem; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
        <h1>Page Content</h1>
        <p>Le footer est en bas de la page...</p>
      </div>

      <sh-footer
        app-name="${args.appName}"
        year="${args.year}"
        data-theme="${args.theme}"
      ></sh-footer>
    </div>

    <script>
      customElements.whenDefined('sh-footer').then(() => {
        const footer = document.querySelector('sh-footer');
        if (footer) {
          footer.addEventListener('sh-footer-link-click', (e) => {
            console.log('Link clicked:', e.detail.link);
            alert('Navigation vers: ' + e.detail.link);
          });
        }
      });
    </script>
  `,
};

/**
 * Footer isolé
 */
export const Isolated: Story = {
  args: {
    appName: 'STOCK HUB',
    year: '2025',
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem;">
      <sh-footer
        app-name="${args.appName}"
        year="${args.year}"
        data-theme="${args.theme}"
      ></sh-footer>
    </div>

    <script>
      customElements.whenDefined('sh-footer').then(() => {
        const footer = document.querySelector('sh-footer');
        if (footer) {
          footer.addEventListener('sh-footer-link-click', (e) => {
            console.log('Link clicked:', e.detail.link);
          });
        }
      });
    </script>
  `,
};

/**
 * Thème light
 */
export const LightTheme: Story = {
  args: {
    appName: 'STOCK HUB',
    year: '2025',
    theme: 'light',
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; min-height: 100vh; display: flex; flex-direction: column;">
      <div style="flex: 1; padding: 2rem; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
        <h1>Page Content (Light Theme)</h1>
        <p>Le footer s'adapte au thème clair...</p>
      </div>

      <sh-footer
        app-name="${args.appName}"
        year="${args.year}"
        data-theme="${args.theme}"
      ></sh-footer>
    </div>
  `,
};

/**
 * Nom d'application personnalisé
 */
export const CustomAppName: Story = {
  args: {
    appName: 'MY INVENTORY',
    year: '2025',
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem;">
      <sh-footer
        app-name="${args.appName}"
        year="${args.year}"
        data-theme="${args.theme}"
      ></sh-footer>
    </div>
  `,
};

/**
 * Version mobile
 */
export const Mobile: Story = {
  args: {
    appName: 'STOCK HUB',
    year: '2025',
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem;">
      <div style="max-width: 375px; margin: 0 auto; border: 2px solid ${args.theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}; border-radius: 8px; overflow: hidden;">
        <div style="padding: 2rem; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
          <h2 style="margin: 0 0 0.5rem 0; font-size: 1.25rem;">Mobile View</h2>
          <p style="margin: 0; font-size: 0.875rem; color: ${args.theme === 'dark' ? '#9ca3af' : '#6b7280'};">Les liens s'empilent verticalement sur mobile</p>
        </div>

        <sh-footer
          app-name="${args.appName}"
          year="${args.year}"
          data-theme="${args.theme}"
        ></sh-footer>
      </div>
    </div>
  `,
};

/**
 * Playground interactif
 */
export const Playground: Story = {
  args: {
    appName: 'STOCK HUB',
    year: '2025',
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; min-height: 100vh; display: flex; flex-direction: column;">
      <div style="flex: 1; padding: 2rem; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
        <p>Configurez le footer avec les contrôles ci-dessous</p>
      </div>

      <sh-footer
        app-name="${args.appName}"
        year="${args.year}"
        data-theme="${args.theme}"
      ></sh-footer>
    </div>
  `,
};
