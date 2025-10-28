import type { Meta, StoryObj } from '@storybook/web-components';
import './sh-page-header';
import '../header/sh-header';

const meta: Meta = {
  title: 'Components/Organisms/PageHeader',
  component: 'sh-page-header',
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Titre principal de la page'
    },
    subtitle: {
      control: 'text',
      description: 'Sous-titre descriptif'
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
 * Dashboard Header (comme dans StockHub V2)
 */
export const Dashboard: Story = {
  args: {
    title: 'Tableau de Bord',
    subtitle: 'Bienvenue dans votre espace de gestion de stocks intelligent',
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; min-height: 100vh;">
      <sh-page-header
        id="header-dashboard"
        title="${args.title}"
        subtitle="${args.subtitle}"
        data-theme="${args.theme}"
      ></sh-page-header>

      <div style="padding: 2rem; color: ${args.theme === 'dark' ? '#fff' : '#000'};">
        <p>Contenu de la page...</p>
      </div>
    </div>

    <script>
      customElements.whenDefined('sh-page-header').then(() => {
        const header = document.getElementById('header-dashboard');
        if (header) {
          header.breadcrumb = [
            { label: 'Accueil', href: '#' },
            { label: 'Dashboard' }
          ];

          header.actions = [
            { label: 'Ajouter un Stock', icon: 'Plus', variant: 'primary', handler: 'add-stock' },
            { label: 'Rapport Détaillé', icon: 'BarChart3', variant: 'ghost', handler: 'report' },
            { label: 'Recherche Avancée', icon: 'Search', variant: 'ghost', handler: 'search' }
          ];

          header.addEventListener('sh-action-add-stock', (e) => {
            console.log('Ajouter un stock clicked', e.detail);
          });

          header.addEventListener('sh-action-report', (e) => {
            console.log('Rapport détaillé clicked', e.detail);
          });

          header.addEventListener('sh-action-search', (e) => {
            console.log('Recherche avancée clicked', e.detail);
          });

          header.addEventListener('sh-breadcrumb-click', (e) => {
            console.log('Breadcrumb clicked', e.detail);
          });
        }
      });
    </script>
  `,
};

/**
 * Simple avec titre uniquement
 */
export const Simple: Story = {
  args: {
    title: 'Mes Stocks',
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; min-height: 400px;">
      <sh-page-header
        title="${args.title}"
        data-theme="${args.theme}"
      ></sh-page-header>
    </div>
  `,
};

/**
 * Avec breadcrumb uniquement
 */
export const WithBreadcrumb: Story = {
  args: {
    title: 'Détails du Stock',
    subtitle: 'Acrylique Bleu Cobalt',
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; min-height: 400px;">
      <sh-page-header
        id="header-breadcrumb"
        title="${args.title}"
        subtitle="${args.subtitle}"
        data-theme="${args.theme}"
      ></sh-page-header>
    </div>

    <script>
      customElements.whenDefined('sh-page-header').then(() => {
        const header = document.getElementById('header-breadcrumb');
        if (header) {
          header.breadcrumb = [
            { label: 'Accueil', href: '#' },
            { label: 'Dashboard', href: '#dashboard' },
            { label: 'Stocks', href: '#stocks' },
            { label: 'Détails' }
          ];
        }
      });
    </script>
  `,
};

/**
 * Avec une seule action
 */
export const SingleAction: Story = {
  args: {
    title: 'Historique',
    subtitle: 'Consultez l\'historique de vos stocks',
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; min-height: 400px;">
      <sh-page-header
        id="header-single"
        title="${args.title}"
        subtitle="${args.subtitle}"
        data-theme="${args.theme}"
      ></sh-page-header>
    </div>

    <script>
      customElements.whenDefined('sh-page-header').then(() => {
        const header = document.getElementById('header-single');
        if (header) {
          header.actions = [
            { label: 'Exporter CSV', icon: 'Download', variant: 'primary', handler: 'export' }
          ];
        }
      });
    </script>
  `,
};

/**
 * Responsive Demo
 */
export const ResponsiveDemo: Story = {
  args: {
    title: 'Tableau de Bord',
    subtitle: 'Bienvenue dans votre espace de gestion de stocks intelligent',
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; min-height: 400px;">
      <div style="max-width: 375px; margin: 0 auto; border: 2px solid ${args.theme === 'dark' ? '#444' : '#ccc'}; border-radius: 8px; overflow: hidden;">
        <sh-page-header
          id="header-responsive"
          title="${args.title}"
          subtitle="${args.subtitle}"
          data-theme="${args.theme}"
        ></sh-page-header>
      </div>
      <p style="text-align: center; margin-top: 1rem; color: ${args.theme === 'dark' ? '#fff' : '#000'};">
        Vue mobile (375px) - Boutons icon-only centrés
      </p>
    </div>

    <script>
      customElements.whenDefined('sh-page-header').then(() => {
        const header = document.getElementById('header-responsive');
        if (header) {
          header.breadcrumb = [
            { label: 'Accueil' },
            { label: 'Dashboard' }
          ];

          header.actions = [
            { label: '', icon: 'Plus', variant: 'primary', handler: 'add-stock', ariaLabel: 'Ajouter un stock' },
            { label: '', icon: 'BarChart3', variant: 'ghost', handler: 'report', ariaLabel: 'Voir les rapports' },
            { label: '', icon: 'Search', variant: 'ghost', handler: 'search', ariaLabel: 'Rechercher' }
          ];

          // Force mobile-like layout in Shadow DOM
          setTimeout(() => {
            // Force vertical stacking of content
            const content = header.shadowRoot.querySelector('.content');
            if (content) {
              content.style.flexDirection = 'column';
              content.style.alignItems = 'stretch';
            }

            // Align buttons to the left
            const actionsDiv = header.shadowRoot.querySelector('.actions');
            if (actionsDiv) {
              actionsDiv.style.justifyContent = 'flex-start';
              actionsDiv.style.gap = 'var(--spacing-sm)';
            }
          }, 50);
        }
      });
    </script>
  `,
};

/**
 * Intégration complète avec sh-header
 */
export const FullPageIntegration: Story = {
  args: {
    title: 'Tableau de Bord',
    subtitle: 'Bienvenue dans votre espace de gestion de stocks intelligent',
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; min-height: 100vh;">
      <!-- Header principal -->
      <sh-header
        id="main-header-full"
        data-theme="${args.theme}"
        user-name="Sandrine Cipolla"
        notification-count="3"
      ></sh-header>

      <!-- Page Header / Bandeau -->
      <sh-page-header
        id="header-full"
        title="${args.title}"
        subtitle="${args.subtitle}"
        data-theme="${args.theme}"
      ></sh-page-header>

      <!-- Contenu de la page -->
      <div style="padding: 2rem; max-width: 1280px; margin: 0 auto; color: ${args.theme === 'dark' ? '#fff' : '#000'};">
        <h2 style="margin-bottom: 1.5rem;">Mes Stocks Récents (18)</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem;">
          ${[1, 2, 3, 4].map(() => `
            <div style="background: ${args.theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}; padding: 1.5rem; border-radius: 8px; border: 1px solid ${args.theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'};">
              <p style="margin: 0; color: ${args.theme === 'dark' ? '#9ca3af' : '#6b7280'};">
                Carte de stock...
              </p>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <script>
      (function() {
        const mainHeader = document.getElementById('main-header-full');
        const pageHeader = document.getElementById('header-full');
        const pageContainer = mainHeader.closest('div');

        // Theme toggle handler
        document.addEventListener('theme-change', (e) => {
          const newTheme = e.detail.theme;
          console.log('Theme changed to:', newTheme);

          // Update all components
          if (mainHeader) mainHeader.setAttribute('data-theme', newTheme);
          if (pageHeader) pageHeader.setAttribute('data-theme', newTheme);

          // Update background
          if (pageContainer) {
            const bg = newTheme === 'dark'
              ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)'
              : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)';
            pageContainer.style.background = bg;
          }
        });

        // Page header setup
        customElements.whenDefined('sh-page-header').then(() => {
          if (pageHeader) {
            pageHeader.breadcrumb = [
              { label: 'Accueil', href: '#' },
              { label: 'Dashboard' }
            ];

            pageHeader.actions = [
              { label: 'Ajouter un Stock', icon: 'Plus', variant: 'primary', handler: 'add-stock' },
              { label: 'Rapport Détaillé', icon: 'BarChart3', variant: 'ghost', handler: 'report' },
              { label: 'Recherche Avancée', icon: 'Search', variant: 'ghost', handler: 'search' }
            ];
          }
        });
      })();
    </script>
  `,
};

/**
 * Playground interactif
 */
export const Playground: Story = {
  args: {
    title: 'Titre de la Page',
    subtitle: 'Description de la page',
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; min-height: 100vh;">
      <sh-page-header
        id="header-playground"
        title="${args.title}"
        subtitle="${args.subtitle}"
        data-theme="${args.theme}"
      ></sh-page-header>

      <div style="padding: 2rem; max-width: 1280px; margin: 0 auto;">
        <div style="background: ${args.theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}; padding: 1.5rem; border-radius: 8px; color: ${args.theme === 'dark' ? '#fff' : '#000'};">
          <h3 style="margin-top: 0;">Event Log</h3>
          <div id="event-log" style="font-family: monospace; font-size: 0.875rem; max-height: 300px; overflow-y: auto;"></div>
        </div>
      </div>
    </div>

    <script>
      customElements.whenDefined('sh-page-header').then(() => {
        const header = document.getElementById('header-playground');
        const log = document.getElementById('event-log');

        function addLog(message) {
          const entry = document.createElement('div');
          entry.style.padding = '0.5rem';
          entry.style.borderBottom = '1px solid ${args.theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}';
          entry.textContent = new Date().toLocaleTimeString() + ' - ' + message;
          log.insertBefore(entry, log.firstChild);
        }

        if (header) {
          header.breadcrumb = [
            { label: 'Accueil' },
            { label: 'Section' },
            { label: 'Page Actuelle' }
          ];

          header.actions = [
            { label: 'Action Primaire', icon: 'Plus', variant: 'primary', handler: 'primary' },
            { label: 'Action Secondaire', icon: 'Settings', variant: 'ghost', handler: 'secondary' },
            { label: 'Action Tertiaire', icon: 'Info', variant: 'ghost', handler: 'tertiary' }
          ];

          header.addEventListener('sh-action-primary', () => addLog('Action primaire clicked'));
          header.addEventListener('sh-action-secondary', () => addLog('Action secondaire clicked'));
          header.addEventListener('sh-action-tertiary', () => addLog('Action tertiaire clicked'));
          header.addEventListener('sh-breadcrumb-click', (e) => addLog('Breadcrumb clicked: ' + e.detail.item.label));
        }
      });
    </script>
  `,
};
