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
