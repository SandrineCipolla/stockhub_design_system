import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './sh-contribution-form.ts';

const meta: Meta = {
  title: 'Components/Molecules/ContributionForm',
  component: 'sh-contribution-form',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    itemLabel: { control: 'text', description: "Nom de l'item" },
    currentQuantity: { control: 'number', description: 'Quantité actuelle (lecture seule)' },
    disabled: { control: 'boolean', description: 'Désactive le formulaire' },
    theme: { control: 'select', options: ['light', 'dark'], description: 'Thème' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: { itemLabel: 'Lait demi-écrémé', currentQuantity: 3, theme: 'dark' },
  render: (args) => `
    <sh-contribution-form
      item-label="${args.itemLabel}"
      current-quantity="${args.currentQuantity}"
      data-theme="${args.theme}"
      style="width: 320px;"
    ></sh-contribution-form>
  `,
};

export const Disabled: Story = {
  args: { theme: 'dark' },
  render: (args) => `
    <sh-contribution-form
      item-label="Farine T65"
      current-quantity="1"
      disabled
      data-theme="${args.theme}"
      style="width: 320px;"
    ></sh-contribution-form>
  `,
};


export const InteractiveDemo: Story = {
  args: { theme: 'dark' },
  render: (args) => `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: start; max-width: 700px;">
      <sh-contribution-form
        id="contrib-form-demo"
        item-label="Lait demi-écrémé"
        current-quantity="3"
        data-theme="${args.theme}"
        style="width: 300px;"
      ></sh-contribution-form>

      <div style="background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 1.25rem; min-height: 160px;">
        <h3 style="color: #f1f5f9; font-family: system-ui; margin: 0 0 0.75rem 0; font-size: 0.9rem;">📋 Journal d'événements</h3>
        <div id="form-event-log" style="font-family: 'Courier New', monospace; font-size: 0.8rem; display: flex; flex-direction: column; gap: 0.5rem;">
          <p style="color: #94a3b8; margin: 0;">Aucun événement pour le moment...</p>
        </div>
      </div>
    </div>

    <script>
      customElements.whenDefined('sh-contribution-form').then(() => {
        const form = document.getElementById('contrib-form-demo');
        const log = document.getElementById('form-event-log');

        function addEntry(name, detail, color) {
          if (log.querySelector('p')) log.innerHTML = '';
          const entry = document.createElement('div');
          entry.style.cssText = \`padding: 0.5rem; background: \${color}20; border-left: 3px solid \${color}; border-radius: 4px;\`;
          entry.innerHTML = \`
            <div style="color: \${color}; font-weight: 600; font-size: 0.75rem;">\${name}</div>
            <div style="color: #94a3b8; font-size: 0.7rem;">\${new Date().toLocaleTimeString()}</div>
            <div style="color: #cbd5e1; font-size: 0.75rem; margin-top: 0.25rem;">\${detail ? JSON.stringify(detail) : ''}</div>
          \`;
          log.insertBefore(entry, log.firstChild);
        }

        if (form) {
          form.addEventListener('contribution-submit', (e) => addEntry('contribution-submit', e.detail, '#8b5cf6'));
          form.addEventListener('contribution-cancel', () => addEntry('contribution-cancel', null, '#94a3b8'));
        }
      });
    </script>
  `,
};

export const Playground: Story = {
  args: { itemLabel: 'Yaourts nature', currentQuantity: 6, disabled: false, theme: 'dark' },
  render: (args) => `
    <sh-contribution-form
      item-label="${args.itemLabel}"
      current-quantity="${args.currentQuantity}"
      ?disabled="${args.disabled}"
      data-theme="${args.theme}"
      style="width: 320px;"
    ></sh-contribution-form>
  `,
};
