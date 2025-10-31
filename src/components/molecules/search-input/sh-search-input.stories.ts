import type { Meta, StoryObj } from '@storybook/web-components';
import { expect, userEvent } from '@storybook/test';
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

/**
 * Test d'interaction : teste la recherche avec événements.
 * Vérifie la saisie de texte et les événements sh-search et sh-search-change.
 */
export const InteractionTest: Story = {
  args: {
    placeholder: 'Rechercher un produit...',
    theme: 'dark',
  },
  parameters: {
    docs: {
      description: {
        story: "Teste la saisie de texte et vérifie que les événements sh-search et sh-search-change sont émis correctement. Voir l'onglet 'Interactions'."
      }
    }
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; min-height: 250px; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 1rem;">
      <sh-search-input
        placeholder="${args.placeholder}"
        data-theme="${args.theme}"
      ></sh-search-input>
      <div id="test-result" style="color: #94a3b8; font-size: 14px; font-weight: 500; text-align: center;">
        ⏳ Test en cours... (voir l'onglet "Interactions" en bas)
      </div>
    </div>
  `,
  play: async ({ canvasElement }) => {
    const resultDiv = canvasElement.querySelector('#test-result') as HTMLElement;

    try {
      // 1. Sélectionner le custom element
      const searchInput = canvasElement.querySelector('sh-search-input') as HTMLElement;
      await expect(searchInput).toBeInTheDocument();

      // 2. Accéder à l'input dans le Shadow DOM
      const input = searchInput.shadowRoot?.querySelector('input') as HTMLInputElement;
      await expect(input).toBeTruthy();
      await expect(input.value).toBe('');

      // 3. Écouter les événements
      let searchChangeCount = 0;
      let searchCount = 0;
      let lastSearchValue = '';
      let lastChangeValue = '';

      searchInput.addEventListener('sh-search-change', ((e: CustomEvent) => {
        searchChangeCount++;
        lastChangeValue = e.detail.value;
      }) as EventListener);

      searchInput.addEventListener('sh-search', ((e: CustomEvent) => {
        searchCount++;
        lastSearchValue = e.detail.value;
      }) as EventListener);

      // 4. Taper du texte
      await userEvent.type(input, 'Acrylic');

      // 5. Attendre un peu pour que les événements soient traités
      await new Promise(resolve => setTimeout(resolve, 100));

      // 6. Vérifier que les événements ont été émis
      // sh-search-change devrait avoir été émis plusieurs fois (1 par caractère)
      await expect(searchChangeCount).toBeGreaterThan(0);
      // sh-search devrait avoir été émis (pas de debounce)
      await expect(searchCount).toBeGreaterThan(0);
      // Les valeurs doivent correspondre
      await expect(lastSearchValue).toBe('Acrylic');
      await expect(lastChangeValue).toBe('Acrylic');

      // Afficher le succès
      if (resultDiv) {
        resultDiv.style.color = '#10b981';
        resultDiv.innerHTML = `✅ Test réussi ! ${searchChangeCount} changements et ${searchCount} recherches détectés.`;
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
 * Test d'interaction : teste le bouton clear.
 * Vérifie que cliquer sur le bouton X vide l'input et émet l'événement sh-search-clear.
 */
export const InteractionTestClear: Story = {
  args: {
    placeholder: 'Rechercher un produit...',
    clearable: true,
    theme: 'dark',
  },
  parameters: {
    docs: {
      description: {
        story: "Teste le bouton clear : saisie de texte, apparition du bouton X, click sur X, valeur vidée et événement émis."
      }
    }
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; min-height: 250px; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 1rem;">
      <sh-search-input
        placeholder="${args.placeholder}"
        clearable
        data-theme="${args.theme}"
      ></sh-search-input>
      <div id="test-result" style="color: #94a3b8; font-size: 14px; font-weight: 500; text-align: center;">
        ⏳ Test en cours... (voir l'onglet "Interactions" en bas)
      </div>
    </div>
  `,
  play: async ({ canvasElement }) => {
    const resultDiv = canvasElement.querySelector('#test-result') as HTMLElement;

    try {
      // Sélectionner le custom element
      const searchInput = canvasElement.querySelector('sh-search-input') as HTMLElement;
      await expect(searchInput).toBeInTheDocument();

      // Accéder à l'input dans le Shadow DOM
      const input = searchInput.shadowRoot?.querySelector('input') as HTMLInputElement;
      await expect(input).toBeTruthy();

      // Au départ, pas de bouton clear (value est vide)
      let clearButton = searchInput.shadowRoot?.querySelector('.clear-button') as HTMLButtonElement | null;
      await expect(clearButton).toBeNull();

      // Taper du texte
      await userEvent.type(input, 'Paint');
      await new Promise(resolve => setTimeout(resolve, 100));

      // Maintenant le bouton clear devrait apparaître
      clearButton = searchInput.shadowRoot?.querySelector('.clear-button') as HTMLButtonElement;
      await expect(clearButton).toBeTruthy();

      // Écouter l'événement sh-search-clear
      let clearEventFired = false;
      searchInput.addEventListener('sh-search-clear', (() => {
        clearEventFired = true;
      }) as EventListener);

      // Cliquer sur le bouton clear
      await userEvent.click(clearButton);
      await new Promise(resolve => setTimeout(resolve, 100));

      // Vérifier que l'événement a été émis
      await expect(clearEventFired).toBe(true);

      // Vérifier que l'input est vide
      await expect(input.value).toBe('');

      // Le bouton clear devrait avoir disparu
      clearButton = searchInput.shadowRoot?.querySelector('.clear-button') as HTMLButtonElement | null;
      await expect(clearButton).toBeNull();

      // Afficher le succès
      if (resultDiv) {
        resultDiv.style.color = '#10b981';
        resultDiv.innerHTML = '✅ Test réussi ! Bouton clear détecté, événement émis, valeur vidée.';
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
 * Test d'interaction : teste le debounce.
 * Vérifie que l'événement sh-search est retardé selon le debounce.
 */
export const InteractionTestDebounce: Story = {
  args: {
    placeholder: 'Rechercher un produit...',
    debounce: 300,
    theme: 'dark',
  },
  parameters: {
    docs: {
      description: {
        story: "Teste le debounce : l'événement sh-search se déclenche 300ms après avoir arrêté de taper, tandis que sh-search-change est immédiat."
      }
    }
  },
  render: (args) => `
    <div style="background: ${getBackground(args.theme)}; padding: 2rem; min-height: 250px; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 1rem;">
      <sh-search-input
        placeholder="${args.placeholder}"
        debounce="300"
        data-theme="${args.theme}"
      ></sh-search-input>
      <div id="test-result" style="color: #94a3b8; font-size: 14px; font-weight: 500; text-align: center;">
        ⏳ Test en cours... (voir l'onglet "Interactions" en bas)
      </div>
    </div>
  `,
  play: async ({ canvasElement }) => {
    const resultDiv = canvasElement.querySelector('#test-result') as HTMLElement;

    try {
      // Sélectionner le custom element
      const searchInput = canvasElement.querySelector('sh-search-input') as HTMLElement;
      await expect(searchInput).toBeInTheDocument();

      // Accéder à l'input dans le Shadow DOM
      const input = searchInput.shadowRoot?.querySelector('input') as HTMLInputElement;
      await expect(input).toBeTruthy();

      // Écouter les événements
      let searchChangeCount = 0;
      let searchCount = 0;

      searchInput.addEventListener('sh-search-change', (() => {
        searchChangeCount++;
      }) as EventListener);

      searchInput.addEventListener('sh-search', (() => {
        searchCount++;
      }) as EventListener);

      // Taper du texte
      await userEvent.type(input, 'Brush');

      // Juste après avoir tapé, sh-search-change devrait avoir été émis plusieurs fois
      await new Promise(resolve => setTimeout(resolve, 50));
      await expect(searchChangeCount).toBeGreaterThan(0);

      // Mais sh-search ne devrait PAS encore avoir été émis (debounce 300ms)
      const searchCountBefore = searchCount;

      // Attendre que le debounce se termine (300ms + marge)
      await new Promise(resolve => setTimeout(resolve, 350));

      // Maintenant sh-search devrait avoir été émis
      await expect(searchCount).toBeGreaterThan(searchCountBefore);

      // Afficher le succès
      if (resultDiv) {
        resultDiv.style.color = '#10b981';
        resultDiv.innerHTML = `✅ Test réussi ! Debounce fonctionnel : ${searchChangeCount} changements immédiats, ${searchCount} recherche(s) après délai.`;
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
