import type {Meta, StoryObj} from '@storybook/web-components';
import { expect, userEvent } from '@storybook/test';
import './sh-button.ts';
import '../../atoms/icon/sh-icon.ts';

const meta: Meta = {
  title: 'Components/Molecules/Button',
  component: 'sh-button',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger'],
      description: 'Style variant du bouton',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille du bouton',
    },
    disabled: {
      control: 'boolean',
      description: 'Bouton désactivé',
    },
    loading: {
      control: 'boolean',
      description: 'État de chargement',
    },
    iconBefore: {
      control: 'text',
      description: 'Icône avant le texte',
    },
    iconAfter: {
      control: 'text',
      description: 'Icône après le texte',
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Thème du bouton (light ou dark)',
    },
  },
};

export default meta;
type Story = StoryObj;

// Default Primary Button
export const Primary: Story = {
  args: {
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 200px; display: flex; align-items: center; justify-content: center;">
      <sh-button variant="primary" data-theme="${args.theme}">Primary Button</sh-button>
    </div>
  `,
};

// All Variants
export const AllVariants: Story = {
  args: {
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 200px; display: flex; align-items: center; justify-content: center;">
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <sh-button variant="primary" data-theme="${args.theme}">Primary</sh-button>
        <sh-button variant="secondary" data-theme="${args.theme}">Secondary</sh-button>
        <sh-button variant="ghost" data-theme="${args.theme}">Ghost</sh-button>
        <sh-button variant="danger" data-theme="${args.theme}">Danger</sh-button>
      </div>
    </div>
  `,
};

// All Sizes
export const AllSizes: Story = {
  args: {
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 200px; display: flex; align-items: center; justify-content: center;">
      <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
        <sh-button size="sm" data-theme="${args.theme}">Small</sh-button>
        <sh-button size="md" data-theme="${args.theme}">Medium</sh-button>
        <sh-button size="lg" data-theme="${args.theme}">Large</sh-button>
      </div>
    </div>
  `,
};

// With Icon Before
export const WithIconBefore: Story = {
  args: {
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 200px; display: flex; align-items: center; justify-content: center;">
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <sh-button icon-before="Plus" variant="primary" data-theme="${args.theme}">Add Item</sh-button>
        <sh-button icon-before="Edit" variant="secondary" data-theme="${args.theme}">Edit</sh-button>
        <sh-button icon-before="Search" variant="ghost" data-theme="${args.theme}">Search</sh-button>
      </div>
    </div>
  `,
};

// With Icon After
export const WithIconAfter: Story = {
  args: {
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 200px; display: flex; align-items: center; justify-content: center;">
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <sh-button icon-after="ArrowRight" variant="primary" data-theme="${args.theme}">Continue</sh-button>
        <sh-button icon-after="ExternalLink" variant="ghost" data-theme="${args.theme}">Open</sh-button>
      </div>
    </div>
  `,
};

// Icon Only
export const IconOnly: Story = {
  args: {
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 200px; display: flex; align-items: center; justify-content: center;">
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <sh-button id="btn-home" icon-before="Home" icon-only variant="primary" data-theme="${args.theme}"></sh-button>
        <sh-button id="btn-menu" icon-before="Menu" icon-only variant="secondary" data-theme="${args.theme}"></sh-button>
        <sh-button id="btn-close" icon-before="X" icon-only variant="ghost" data-theme="${args.theme}"></sh-button>
        <sh-button id="btn-delete" icon-before="Trash2" icon-only variant="danger" data-theme="${args.theme}"></sh-button>
      </div>
    </div>
    <script>
      (function() {
        customElements.whenDefined('sh-button').then(() => {
          const homeBtn = document.getElementById('btn-home');
          const menuBtn = document.getElementById('btn-menu');
          const closeBtn = document.getElementById('btn-close');
          const deleteBtn = document.getElementById('btn-delete');

          if (homeBtn) homeBtn.ariaLabel = 'Home';
          if (menuBtn) menuBtn.ariaLabel = 'Menu';
          if (closeBtn) closeBtn.ariaLabel = 'Close';
          if (deleteBtn) deleteBtn.ariaLabel = 'Delete';
        });
      })();
    </script>
  `,
};

// Loading State
export const Loading: Story = {
  args: {
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 200px; display: flex; align-items: center; justify-content: center;">
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <sh-button loading variant="primary" data-theme="${args.theme}">Loading...</sh-button>
        <sh-button loading variant="secondary" data-theme="${args.theme}">Processing</sh-button>
        <sh-button loading variant="ghost" data-theme="${args.theme}">Saving</sh-button>
      </div>
    </div>
  `,
};

// Disabled State
export const Disabled: Story = {
  args: {
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 200px; display: flex; align-items: center; justify-content: center;">
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <sh-button disabled variant="primary" data-theme="${args.theme}">Disabled Primary</sh-button>
        <sh-button disabled variant="secondary" data-theme="${args.theme}">Disabled Secondary</sh-button>
        <sh-button disabled variant="ghost" data-theme="${args.theme}">Disabled Ghost</sh-button>
        <sh-button disabled variant="danger" data-theme="${args.theme}">Disabled Danger</sh-button>
      </div>
    </div>
  `,
};

// Ghost Variant Showcase
export const GhostShowcase: Story = {
  args: {
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 400px;">
      <div style="display: flex; gap: 1rem; flex-direction: column; align-items: flex-start;">
        <div style="padding: 2rem; background: ${args.theme === 'dark' ? '#1e293b' : 'white'}; border-radius: 8px; max-width: 100%;">
          <h4 style="margin-top: 0; color: ${args.theme === 'dark' ? '#ffffff' : '#000000'};">${args.theme === 'dark' ? 'Dark' : 'Light'} Background</h4>
          <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <sh-button variant="ghost" data-theme="${args.theme}">Cancel</sh-button>
            <sh-button variant="ghost" icon-before="Edit" data-theme="${args.theme}">Edit</sh-button>
            <sh-button variant="ghost" disabled data-theme="${args.theme}">Disabled</sh-button>
          </div>
        </div>
      </div>
    </div>
  `,
};

// Form Example
export const FormExample: Story = {
  args: {
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 300px; display: flex; align-items: center; justify-content: center;">
      <form style="display: flex; flex-direction: column; gap: 1rem; max-width: 300px; width: 100%; padding: 2rem; background: ${args.theme === 'dark' ? '#1e293b' : '#ffffff'}; border-radius: 8px;">
        <input type="text" placeholder="Username" style="padding: 8px; border: 1px solid ${args.theme === 'dark' ? '#475569' : '#ccc'}; border-radius: 4px; background: ${args.theme === 'dark' ? '#334155' : '#ffffff'}; color: ${args.theme === 'dark' ? '#ffffff' : '#000000'};" />
        <input type="password" placeholder="Password" style="padding: 8px; border: 1px solid ${args.theme === 'dark' ? '#475569' : '#ccc'}; border-radius: 4px; background: ${args.theme === 'dark' ? '#334155' : '#ffffff'}; color: ${args.theme === 'dark' ? '#ffffff' : '#000000'};" />

        <div style="display: flex; gap: 0.5rem;">
          <sh-button type="submit" variant="primary" icon-before="LogIn" style="flex: 1;" data-theme="${args.theme}">Login</sh-button>
          <sh-button type="button" variant="ghost" data-theme="${args.theme}">Cancel</sh-button>
        </div>
      </form>
    </div>
  `,
};

// Actions Example
export const ActionsExample: Story = {
  args: {
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 200px; display: flex; align-items: center; justify-content: center;">
      <div style="display: flex; gap: 0.5rem; padding: 1rem; background: ${args.theme === 'dark' ? '#1e293b' : '#f8fafc'}; border-radius: 8px;">
        <sh-button size="sm" variant="ghost" icon-before="Eye" data-theme="${args.theme}">View</sh-button>
        <sh-button size="sm" variant="ghost" icon-before="Edit" data-theme="${args.theme}">Edit</sh-button>
        <sh-button size="sm" variant="ghost" icon-before="Trash2" data-theme="${args.theme}">Delete</sh-button>
      </div>
    </div>
  `,
};

// Interactive Playground
export const Playground: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    iconBefore: '',
    iconAfter: '',
    theme: 'dark',
  },
  render: (args) => `
    <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 200px; display: flex; align-items: center; justify-content: center;">
      <sh-button
        variant="${args.variant}"
        size="${args.size}"
        ${args.disabled ? 'disabled' : ''}
        ${args.loading ? 'loading' : ''}
        ${args.iconBefore ? `icon-before="${args.iconBefore}"` : ''}
        ${args.iconAfter ? `icon-after="${args.iconAfter}"` : ''}
        data-theme="${args.theme}"
      >
        Button Text
      </sh-button>
    </div>
  `,
};

/**
 * Story d'interaction : teste le comportement du bouton avec @storybook/test.
 * Vérifie que le bouton peut être cliqué et que l'état reste correct.
 * Les résultats sont visibles dans le panneau "Interactions" de Storybook.
 */
export const InteractionTest: Story = {
  args: {
    theme: 'dark',
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    iconBefore: '',
    iconAfter: '',
  },
  parameters: {
    docs: {
      description: {
        story: "Cette story lance des tests automatisés sur le bouton avec @storybook/test. Les interactions sont visibles dans le panneau 'Interactions' de Storybook. Utile pour la CI/CD et Chromatic."
      }
    }
  },
  render: (args) => `
    <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 200px; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 1rem;">
      <sh-button
        variant="${args.variant}"
        size="${args.size}"
        ${args.disabled ? 'disabled' : ''}
        ${args.loading ? 'loading' : ''}
        ${args.iconBefore ? `icon-before="${args.iconBefore}"` : ''}
        ${args.iconAfter ? `icon-after="${args.iconAfter}"` : ''}
        data-theme="${args.theme}"
      >
        Click Me
      </sh-button>
      <div id="test-result" style="color: #94a3b8; font-size: 14px; font-weight: 500;">
        ⏳ Test en cours... (voir l'onglet "Interactions" en bas)
      </div>
    </div>
  `,
  play: async ({ canvasElement }) => {
    const resultDiv = canvasElement.querySelector('#test-result') as HTMLElement;

    try {
      // Pour les Web Components avec Shadow DOM, on doit sélectionner le custom element directement
      const shButton = canvasElement.querySelector('sh-button') as HTMLElement;
      await expect(shButton).toBeInTheDocument();

      // Accéder au bouton dans le Shadow DOM
      const button = shButton.shadowRoot?.querySelector('button') as HTMLButtonElement;
      await expect(button).toBeTruthy();

      // Vérifier que le bouton est enabled
      await expect(button.disabled).toBe(false);

      // Simuler un hover sur le custom element
      await userEvent.hover(shButton);

      // Simuler un click utilisateur réel sur le custom element
      await userEvent.click(shButton);

      // Vérifier que le bouton interne est toujours enabled après le click
      await expect(button.disabled).toBe(false);

      // Afficher le succès
      if (resultDiv) {
        resultDiv.style.color = '#10b981';
        resultDiv.innerHTML = '✅ Test réussi ! Tous les comportements sont corrects.';
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
 * Test d'interaction sur un bouton disabled.
 * Vérifie qu'un bouton désactivé ne peut pas être cliqué.
 */
export const InteractionTestDisabled: Story = {
  args: {
    theme: 'dark',
    variant: 'primary',
    size: 'md',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Teste qu'un bouton désactivé ne peut pas être cliqué et reste dans l'état disabled."
      }
    }
  },
  render: (args) => `
    <div style="background: linear-gradient(to bottom right, #0f172a, #1e1b4b); padding: 2rem; min-height: 200px; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 1rem;">
      <sh-button
        variant="${args.variant}"
        size="${args.size}"
        disabled
        data-theme="${args.theme}"
      >
        Disabled Button
      </sh-button>
      <div id="test-result" style="color: #94a3b8; font-size: 14px; font-weight: 500;">
        ⏳ Test en cours... (voir l'onglet "Interactions" en bas)
      </div>
    </div>
  `,
  play: async ({ canvasElement }) => {
    const resultDiv = canvasElement.querySelector('#test-result') as HTMLElement;

    try {
      // Sélectionner le custom element sh-button
      const shButton = canvasElement.querySelector('sh-button') as HTMLElement;
      await expect(shButton).toBeInTheDocument();

      // Vérifier que l'attribut disabled est présent sur le custom element
      await expect(shButton.hasAttribute('disabled')).toBe(true);

      // Accéder au bouton dans le Shadow DOM
      const button = shButton.shadowRoot?.querySelector('button') as HTMLButtonElement;
      await expect(button).toBeTruthy();

      // Vérifier que le bouton interne est bien disabled
      await expect(button.disabled).toBe(true);

      // Note: userEvent.click() sur un élément disabled ne fait rien (comportement attendu)
      // Le bouton doit rester disabled
      await expect(button.disabled).toBe(true);

      // Afficher le succès
      if (resultDiv) {
        resultDiv.style.color = '#10b981';
        resultDiv.innerHTML = '✅ Test réussi ! Le bouton disabled fonctionne correctement.';
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
 * Test d'interaction sur un bouton avec icônes.
 * Vérifie que les icônes sont présentes et que le bouton fonctionne.
 */
export const InteractionTestWithIcons: Story = {
  args: {
    theme: 'dark',
    variant: 'primary',
    size: 'md',
    iconBefore: 'Plus',
    iconAfter: 'ArrowRight',
  },
  parameters: {
    docs: {
      description: {
        story: "Teste un bouton avec icônes avant et après le texte."
      }
    }
  },
  render: (args) => `
    <div style="background: linear-gradient(to bottom right, #0f172a, #1e1b4b); padding: 2rem; min-height: 200px; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 1rem;">
      <sh-button
        variant="${args.variant}"
        size="${args.size}"
        icon-before="${args.iconBefore}"
        icon-after="${args.iconAfter}"
        data-theme="${args.theme}"
      >
        Add Item
      </sh-button>
      <div id="test-result" style="color: #94a3b8; font-size: 14px; font-weight: 500;">
        ⏳ Test en cours... (voir l'onglet "Interactions" en bas)
      </div>
    </div>
  `,
  play: async ({ canvasElement }) => {
    const resultDiv = canvasElement.querySelector('#test-result') as HTMLElement;

    try {
      // Sélectionner le custom element sh-button
      const shButton = canvasElement.querySelector('sh-button') as HTMLElement;
      await expect(shButton).toBeInTheDocument();

      // Vérifier que les attributs icon-before et icon-after sont présents
      await expect(shButton.getAttribute('icon-before')).toBe('Plus');
      await expect(shButton.getAttribute('icon-after')).toBe('ArrowRight');

      // Accéder au bouton dans le Shadow DOM
      const button = shButton.shadowRoot?.querySelector('button') as HTMLButtonElement;
      await expect(button).toBeTruthy();

      // Vérifier que les icônes sont présentes dans le Shadow DOM
      const icons = button.querySelectorAll('sh-icon');
      await expect(icons.length).toBe(2);

      // Cliquer sur le custom element
      await userEvent.click(shButton);

      // Le bouton doit rester actif
      await expect(button.disabled).toBe(false);

      // Afficher le succès
      if (resultDiv) {
        resultDiv.style.color = '#10b981';
        resultDiv.innerHTML = '✅ Test réussi ! 2 icônes détectées et click fonctionnel.';
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
 * Story responsive: teste le comportement hide-text-mobile.
 * En mode mobile (< 640px), le texte est masqué et les icônes sont centrées.
 * En mode desktop (≥ 640px), le texte réapparaît.
 */
export const ResponsiveText: Story = {
  args: {
    theme: 'dark',
  },
  parameters: {
    docs: {
      description: {
        story: "Teste le comportement responsive avec hide-text-mobile. Réduisez la fenêtre à moins de 640px pour voir les icônes centrées dans des boutons carrés. Au-dessus de 640px, le texte réapparaît."
      }
    }
  },
  render: (args) => `
    <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 300px;">
      <div style="max-width: 1200px; margin: 0 auto;">
        <h3 style="color: ${args.theme === 'dark' ? '#ffffff' : '#000000'}; margin-bottom: 1rem;">
          🔄 Responsive Buttons (hide-text-mobile)
        </h3>
        <p style="color: ${args.theme === 'dark' ? '#94a3b8' : '#64748b'}; margin-bottom: 2rem; font-size: 14px;">
          📱 Réduisez la fenêtre à &lt; 640px pour voir les icônes centrées.
          🖥️ Agrandissez &gt; 640px pour voir le texte réapparaître.
        </p>

        <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
          <sh-button
            hide-text-mobile
            icon-before="Plus"
            variant="primary"
            data-theme="${args.theme}">
            Ajouter
          </sh-button>

          <sh-button
            hide-text-mobile
            icon-before="Edit"
            variant="secondary"
            data-theme="${args.theme}">
            Modifier
          </sh-button>

          <sh-button
            hide-text-mobile
            icon-before="Trash2"
            variant="danger"
            data-theme="${args.theme}">
            Supprimer
          </sh-button>

          <sh-button
            hide-text-mobile
            icon-before="Search"
            variant="ghost"
            data-theme="${args.theme}">
            Rechercher
          </sh-button>
        </div>

        <div style="margin-top: 2rem; padding: 1rem; background: ${args.theme === 'dark' ? 'rgba(15, 23, 42, 0.5)' : 'rgba(248, 250, 252, 0.5)'}; border-radius: 8px; border: 1px solid ${args.theme === 'dark' ? '#334155' : '#e2e8f0'};">
          <p style="color: ${args.theme === 'dark' ? '#94a3b8' : '#64748b'}; font-size: 13px; margin: 0;">
            💡 <strong>Astuce</strong> : Utilisez les outils de développement (F12) et activez le mode responsive pour tester différentes largeurs d'écran.
          </p>
        </div>
      </div>
    </div>
  `,
};
