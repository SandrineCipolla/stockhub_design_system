import type { Meta, StoryObj } from '@storybook/web-components';
import './sh-search-input';

const meta: Meta = {
  title: 'Components/Molecules/SearchInput',
  component: 'sh-search-input',
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Texte du placeholder'
    },
    debounce: {
      control: 'number',
      description: 'Délai de debounce en ms'
    },
    clearable: {
      control: 'boolean',
      description: 'Afficher le bouton clear'
    },
    disabled: {
      control: 'boolean',
      description: 'Désactiver l\'input'
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
 * Input de recherche simple
 */
export const Default: Story = {
  args: {
    placeholder: 'Rechercher un produit...',
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; min-height: 300px; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
      <sh-search-input
        placeholder="${args.placeholder}"
        data-theme="${args.theme}"
      ></sh-search-input>
    </div>

    <script>
      customElements.whenDefined('sh-search-input').then(() => {
        const input = document.querySelector('sh-search-input');
        if (input) {
          input.addEventListener('sh-search', (e) => {
            console.log('Search:', e.detail.value);
          });
          input.addEventListener('sh-search-change', (e) => {
            console.log('Change:', e.detail.value);
          });
        }
      });
    </script>
  `,
};

/**
 * Avec bouton clear
 */
export const WithClear: Story = {
  args: {
    placeholder: 'Rechercher un produit...',
    clearable: true,
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; min-height: 300px; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
      <sh-search-input
        id="search-clear"
        placeholder="${args.placeholder}"
        clearable
        data-theme="${args.theme}"
      ></sh-search-input>
    </div>

    <script>
      customElements.whenDefined('sh-search-input').then(() => {
        const input = document.getElementById('search-clear');
        if (input) {
          input.addEventListener('sh-search-clear', () => {
            console.log('Search cleared');
          });
        }
      });
    </script>
  `,
};

/**
 * Avec debounce (300ms)
 */
export const WithDebounce: Story = {
  args: {
    placeholder: 'Rechercher un produit...',
    debounce: 300,
    clearable: true,
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; min-height: 300px; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
      <div style="margin-bottom: 1rem;">
        <p style="margin: 0 0 0.5rem 0; font-size: 0.875rem; color: ${args.theme === 'dark' ? '#9ca3af' : '#6b7280'};">
          L'événement <code>sh-search</code> se déclenche 300ms après avoir arrêté de taper
        </p>
      </div>

      <sh-search-input
        id="search-debounce"
        placeholder="${args.placeholder}"
        debounce="300"
        clearable
        data-theme="${args.theme}"
      ></sh-search-input>

      <div style="margin-top: 1rem; padding: 1rem; background: ${args.theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)'}; border-radius: 8px;">
        <div style="font-size: 0.875rem; color: ${args.theme === 'dark' ? '#9ca3af' : '#6b7280'};">
          <div>Recherche: <span id="search-value" style="color: ${args.theme === 'dark' ? '#f8fafc' : '#1e293b'}; font-weight: 600;">-</span></div>
          <div style="margin-top: 0.25rem;">Changements: <span id="change-count" style="color: ${args.theme === 'dark' ? '#f8fafc' : '#1e293b'}; font-weight: 600;">0</span></div>
          <div style="margin-top: 0.25rem;">Recherches: <span id="search-count" style="color: ${args.theme === 'dark' ? '#f8fafc' : '#1e293b'}; font-weight: 600;">0</span></div>
        </div>
      </div>
    </div>

    <script>
      customElements.whenDefined('sh-search-input').then(() => {
        const input = document.getElementById('search-debounce');
        let changeCount = 0;
        let searchCount = 0;

        if (input) {
          input.addEventListener('sh-search-change', (e) => {
            changeCount++;
            document.getElementById('change-count').textContent = changeCount;
          });

          input.addEventListener('sh-search', (e) => {
            searchCount++;
            document.getElementById('search-value').textContent = e.detail.value || '-';
            document.getElementById('search-count').textContent = searchCount;
          });
        }
      });
    </script>
  `,
};

/**
 * Désactivé
 */
export const Disabled: Story = {
  args: {
    placeholder: 'Rechercher un produit...',
    disabled: true,
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; min-height: 300px; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
      <sh-search-input
        placeholder="${args.placeholder}"
        disabled
        data-theme="${args.theme}"
      ></sh-search-input>
    </div>
  `,
};

/**
 * Comme dans StockHub V2
 */
export const StockHubStyle: Story = {
  args: {
    placeholder: 'Rechercher un produit...',
    clearable: true,
    debounce: 300,
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; min-height: 400px; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
      <div style="max-width: 500px;">
        <sh-search-input
          placeholder="${args.placeholder}"
          clearable
          debounce="300"
          data-theme="${args.theme}"
        ></sh-search-input>

        <h2 style="margin-top: 2rem; margin-bottom: 1rem;">Mes Stocks Récents (18)</h2>
        <div style="font-size: 0.875rem; color: ${args.theme === 'dark' ? '#9ca3af' : '#6b7280'};">
          Résultats de recherche apparaîtraient ici...
        </div>
      </div>
    </div>
  `,
};

/**
 * Playground interactif
 */
export const Playground: Story = {
  args: {
    placeholder: 'Rechercher un produit...',
    debounce: 0,
    clearable: false,
    disabled: false,
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; min-height: 300px; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
      <sh-search-input
        placeholder="${args.placeholder}"
        debounce="${args.debounce}"
        ?clearable="${args.clearable}"
        ?disabled="${args.disabled}"
        data-theme="${args.theme}"
      ></sh-search-input>
    </div>
  `,
};
