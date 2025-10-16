import type {Meta, StoryObj} from '@storybook/web-components';
import './sh-quantity-input.ts';

const meta: Meta = {
    title: 'Components/Molecules/QuantityInput',
    component: 'sh-quantity-input',
    tags: ['autodocs'],
    argTypes: {
        value: { control: 'text' },
        dirty: { control: 'boolean' },
        hideArrows: { control: 'boolean' }
    },
};

export default meta;
type Story = StoryObj;

export const QuantityInput: Story = {
    args: {
        value: '10',
        dirty: false,
        hideArrows: false,
    },
    render: (args) => `<sh-quantity-input value="${args.value}" ?dirty="${args.dirty}" ?hideArrows="${args.hideArrows}"></sh-quantity-input>`,
};
