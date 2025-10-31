import type {Meta, StoryObj} from '@storybook/web-components';
import {expect, userEvent} from '@storybook/test';
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

/**
 * Test d'interaction : Click sur header pour expand/collapse
 */
export const InteractionTestHeaderClick: Story = {
  args: {
    count: 5,
    severity: 'critical',
    message: 'stocks nécessitent votre attention',
    expanded: true,
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; min-height: 500px; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
      <sh-ia-alert-banner
        id="alert-header-test"
        count="${args.count}"
        severity="${args.severity}"
        message="${args.message}"
        ?expanded="${args.expanded}"
        data-theme="${args.theme}"
      ></sh-ia-alert-banner>

      <div id="test-result" style="margin-top: 2rem; padding: 1rem; background: rgba(0,0,0,0.2); border-radius: 8px;">
        En attente du test...
      </div>
    </div>

    <script>
      customElements.whenDefined('sh-ia-alert-banner').then(() => {
        const banner = document.getElementById('alert-header-test');
        if (banner) {
          banner.alerts = ${JSON.stringify(sampleAlerts)};
        }
      });
    </script>
  `,
  play: async ({ canvasElement }) => {
    const resultDiv = canvasElement.querySelector('#test-result') as HTMLElement;

    try {
      // Attendre que le composant soit défini
      await customElements.whenDefined('sh-ia-alert-banner');
      await new Promise(resolve => setTimeout(resolve, 100));

      // Sélectionner le composant
      const banner = canvasElement.querySelector('#alert-header-test') as any;
      await expect(banner).toBeInTheDocument();

      // Vérifier état initial (expanded = true)
      await expect(banner.expanded).toBe(true);

      // Écouter l'événement toggle
      let toggleEventFired = false;
      let toggleDetail: any = null;

      banner.addEventListener('sh-ia-alert-toggle', ((e: CustomEvent) => {
        toggleEventFired = true;
        toggleDetail = e.detail;
      }) as EventListener);

      // Accéder au Shadow DOM et cliquer sur le header
      const alertHeader = banner.shadowRoot?.querySelector('.alert-header') as HTMLElement;
      await expect(alertHeader).toBeTruthy();

      await userEvent.click(alertHeader);
      await new Promise(resolve => setTimeout(resolve, 100));

      // Vérifier que l'événement a été émis
      await expect(toggleEventFired).toBe(true);
      await expect(toggleDetail?.expanded).toBe(false);

      // Vérifier que le composant est maintenant collapsed
      await expect(banner.expanded).toBe(false);

      // Vérifier que le contenu est caché
      const alertDetails = banner.shadowRoot?.querySelector('.alert-details');
      await expect(alertDetails).toBeFalsy();

      // Cliquer à nouveau pour expand
      await userEvent.click(alertHeader);
      await new Promise(resolve => setTimeout(resolve, 100));

      // Vérifier que le composant est à nouveau expanded
      await expect(banner.expanded).toBe(true);

      // Vérifier que le contenu est visible
      const alertDetailsExpanded = banner.shadowRoot?.querySelector('.alert-details');
      await expect(alertDetailsExpanded).toBeTruthy();

      if (resultDiv) {
        resultDiv.style.color = '#10b981';
        resultDiv.innerHTML = '✅ Test réussi : Click sur header toggle expand/collapse correctement';
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
 * Test d'interaction : Click sur toggle button
 */
export const InteractionTestToggleButton: Story = {
  args: {
    count: 5,
    severity: 'warning',
    message: 'stocks à surveiller',
    expanded: true,
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; min-height: 500px; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
      <sh-ia-alert-banner
        id="alert-toggle-test"
        count="${args.count}"
        severity="${args.severity}"
        message="${args.message}"
        ?expanded="${args.expanded}"
        data-theme="${args.theme}"
      ></sh-ia-alert-banner>

      <div id="test-result" style="margin-top: 2rem; padding: 1rem; background: rgba(0,0,0,0.2); border-radius: 8px;">
        En attente du test...
      </div>
    </div>

    <script>
      customElements.whenDefined('sh-ia-alert-banner').then(() => {
        const banner = document.getElementById('alert-toggle-test');
        if (banner) {
          banner.alerts = ${JSON.stringify(sampleAlerts)};
        }
      });
    </script>
  `,
  play: async ({ canvasElement }) => {
    const resultDiv = canvasElement.querySelector('#test-result') as HTMLElement;

    try {
      await customElements.whenDefined('sh-ia-alert-banner');
      await new Promise(resolve => setTimeout(resolve, 100));

      const banner = canvasElement.querySelector('#alert-toggle-test') as any;
      await expect(banner).toBeInTheDocument();

      // Vérifier état initial
      await expect(banner.expanded).toBe(true);

      // Écouter l'événement
      let toggleCount = 0;

      banner.addEventListener('sh-ia-alert-toggle', () => {
        toggleCount++;
      });

      // Accéder au toggle button dans le Shadow DOM
      const toggleButton = banner.shadowRoot?.querySelector('.toggle-button') as HTMLButtonElement;
      await expect(toggleButton).toBeTruthy();

      // Vérifier l'aria-label initial
      await expect(toggleButton.getAttribute('aria-label')).toBe('Masquer les détails');

      // Cliquer sur le toggle button
      await userEvent.click(toggleButton);
      await new Promise(resolve => setTimeout(resolve, 100));

      // Vérifier que l'état a changé
      await expect(banner.expanded).toBe(false);
      await expect(toggleCount).toBe(1);

      // Vérifier que l'aria-label a changé
      await expect(toggleButton.getAttribute('aria-label')).toBe('Afficher les détails');

      // Vérifier la rotation de l'icône
      const toggleIcon = banner.shadowRoot?.querySelector('.toggle-icon');
      await expect(toggleIcon?.classList.contains('collapsed')).toBe(true);

      // Toggle à nouveau
      await userEvent.click(toggleButton);
      await new Promise(resolve => setTimeout(resolve, 100));

      await expect(banner.expanded).toBe(true);
      await expect(toggleCount).toBe(2);
      await expect(toggleIcon?.classList.contains('collapsed')).toBe(false);

      if (resultDiv) {
        resultDiv.style.color = '#10b981';
        resultDiv.innerHTML = '✅ Test réussi : Toggle button fonctionne, icône tourne, aria-label correct';
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
 * Test d'interaction : Click sur item individuel
 */
export const InteractionTestItemClick: Story = {
  args: {
    count: 5,
    severity: 'critical',
    message: 'stocks nécessitent votre attention',
    expanded: true,
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; min-height: 500px; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
      <sh-ia-alert-banner
        id="alert-item-test"
        count="${args.count}"
        severity="${args.severity}"
        message="${args.message}"
        ?expanded="${args.expanded}"
        data-theme="${args.theme}"
      ></sh-ia-alert-banner>

      <div id="test-result" style="margin-top: 2rem; padding: 1rem; background: rgba(0,0,0,0.2); border-radius: 8px;">
        En attente du test...
      </div>
    </div>

    <script>
      customElements.whenDefined('sh-ia-alert-banner').then(() => {
        const banner = document.getElementById('alert-item-test');
        if (banner) {
          banner.alerts = ${JSON.stringify(sampleAlerts)};
        }
      });
    </script>
  `,
  play: async ({ canvasElement }) => {
    const resultDiv = canvasElement.querySelector('#test-result') as HTMLElement;

    try {
      await customElements.whenDefined('sh-ia-alert-banner');
      await new Promise(resolve => setTimeout(resolve, 100));

      const banner = canvasElement.querySelector('#alert-item-test') as any;
      await expect(banner).toBeInTheDocument();

      // Écouter l'événement item-click
      let itemClickEventFired = false;
      let clickedAlert: any = null;

      banner.addEventListener('sh-ia-alert-item-click', ((e: CustomEvent) => {
        itemClickEventFired = true;
        clickedAlert = e.detail;
      }) as EventListener);

      // Vérifier que la liste est visible
      const alertDetails = banner.shadowRoot?.querySelector('.alert-details');
      await expect(alertDetails).toBeTruthy();

      // Trouver tous les items
      const alertItems = banner.shadowRoot?.querySelectorAll('.alert-item');
      await expect(alertItems?.length).toBeGreaterThan(0);

      // Cliquer sur le premier item
      const firstItem = alertItems?.[0] as HTMLElement;
      await expect(firstItem).toBeTruthy();

      await userEvent.click(firstItem);
      await new Promise(resolve => setTimeout(resolve, 100));

      // Vérifier que l'événement a été émis
      await expect(itemClickEventFired).toBe(true);
      await expect(clickedAlert).toBeTruthy();

      // Vérifier le contenu du detail
      await expect(clickedAlert.product).toBe('Acrylique Jaune Cadmium');
      await expect(clickedAlert.message).toBe('Risque de rupture détecté');
      await expect(clickedAlert.severity).toBe('critical');

      // Cliquer sur le deuxième item
      itemClickEventFired = false;
      clickedAlert = null;

      const secondItem = alertItems?.[1] as HTMLElement;
      await userEvent.click(secondItem);
      await new Promise(resolve => setTimeout(resolve, 100));

      await expect(itemClickEventFired).toBe(true);
      await expect(clickedAlert.product).toBe('Feutrine Rouge');

      if (resultDiv) {
        resultDiv.style.color = '#10b981';
        resultDiv.innerHTML = '✅ Test réussi : Click sur items émettent sh-ia-alert-item-click avec le bon payload';
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
 * Test d'interaction : État collapsed par défaut
 */
export const InteractionTestCollapsedState: Story = {
  args: {
    count: 5,
    severity: 'info',
    message: 'suggestions disponibles',
    expanded: false,
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; min-height: 500px; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
      <sh-ia-alert-banner
        id="alert-collapsed-test"
        count="${args.count}"
        severity="${args.severity}"
        message="${args.message}"
        data-theme="${args.theme}"
      ></sh-ia-alert-banner>

      <div id="test-result" style="margin-top: 2rem; padding: 1rem; background: rgba(0,0,0,0.2); border-radius: 8px;">
        En attente du test...
      </div>
    </div>

    <script>
      customElements.whenDefined('sh-ia-alert-banner').then(() => {
        const banner = document.getElementById('alert-collapsed-test');
        if (banner) {
          banner.alerts = ${JSON.stringify(sampleAlerts)};
          banner.expanded = false; // Setter via JS pour éviter le problème du binding booléen
        }
      });
    </script>
  `,
  play: async ({ canvasElement }) => {
    const resultDiv = canvasElement.querySelector('#test-result') as HTMLElement;

    try {
      await customElements.whenDefined('sh-ia-alert-banner');
      await new Promise(resolve => setTimeout(resolve, 200)); // Attendre que le script initialise expanded=false

      const banner = canvasElement.querySelector('#alert-collapsed-test') as any;
      await expect(banner).toBeInTheDocument();

      // Vérifier état initial collapsed
      await expect(banner.expanded).toBe(false);

      // Vérifier que le contenu n'est pas visible
      let alertDetails = banner.shadowRoot?.querySelector('.alert-details');
      await expect(alertDetails).toBeFalsy();

      // Vérifier que l'icône est dans l'état collapsed
      const toggleIcon = banner.shadowRoot?.querySelector('.toggle-icon');
      await expect(toggleIcon?.classList.contains('collapsed')).toBe(true);

      // Expand via click
      const alertHeader = banner.shadowRoot?.querySelector('.alert-header') as HTMLElement;
      await userEvent.click(alertHeader);
      await new Promise(resolve => setTimeout(resolve, 100));

      // Vérifier que le contenu est maintenant visible
      alertDetails = banner.shadowRoot?.querySelector('.alert-details');
      await expect(alertDetails).toBeTruthy();

      // Vérifier que la liste d'alertes est affichée
      const alertsList = banner.shadowRoot?.querySelector('.alerts-list');
      await expect(alertsList).toBeTruthy();

      const alertItems = banner.shadowRoot?.querySelectorAll('.alert-item');
      await expect(alertItems?.length).toBe(5);

      if (resultDiv) {
        resultDiv.style.color = '#10b981';
        resultDiv.innerHTML = '✅ Test réussi : État collapsed correct, contenu caché puis visible après expand';
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
 * Test d'interaction : Hover sur items
 */
export const InteractionTestHoverItems: Story = {
  args: {
    count: 3,
    severity: 'warning',
    message: 'stocks à surveiller',
    expanded: true,
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; min-height: 500px; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
      <sh-ia-alert-banner
        id="alert-hover-test"
        count="${args.count}"
        severity="${args.severity}"
        message="${args.message}"
        ?expanded="${args.expanded}"
        data-theme="${args.theme}"
      ></sh-ia-alert-banner>

      <div id="test-result" style="margin-top: 2rem; padding: 1rem; background: rgba(0,0,0,0.2); border-radius: 8px;">
        En attente du test...
      </div>
    </div>

    <script>
      customElements.whenDefined('sh-ia-alert-banner').then(() => {
        const banner = document.getElementById('alert-hover-test');
        if (banner) {
          banner.alerts = ${JSON.stringify(sampleAlerts.slice(0, 3))};
        }
      });
    </script>
  `,
  play: async ({ canvasElement }) => {
    const resultDiv = canvasElement.querySelector('#test-result') as HTMLElement;

    try {
      await customElements.whenDefined('sh-ia-alert-banner');
      await new Promise(resolve => setTimeout(resolve, 100));

      const banner = canvasElement.querySelector('#alert-hover-test') as any;
      await expect(banner).toBeInTheDocument();

      // Trouver un item
      const alertItems = banner.shadowRoot?.querySelectorAll('.alert-item');
      await expect(alertItems?.length).toBe(3);

      const firstItem = alertItems?.[0] as HTMLElement;
      await expect(firstItem).toBeTruthy();

      // Vérifier que l'item a la classe alert-item et est cliquable
      await expect(firstItem.classList.contains('alert-item')).toBe(true);

      // Simuler le hover en utilisant userEvent
      await userEvent.hover(firstItem);
      await new Promise(resolve => setTimeout(resolve, 100));

      // Vérifier que le curseur est pointer
      const computedStyle = window.getComputedStyle(firstItem);
      await expect(computedStyle.cursor).toBe('pointer');

      // Unhover
      await userEvent.unhover(firstItem);

      if (resultDiv) {
        resultDiv.style.color = '#10b981';
        resultDiv.innerHTML = '✅ Test réussi : Items ont cursor pointer et répondent au hover';
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
