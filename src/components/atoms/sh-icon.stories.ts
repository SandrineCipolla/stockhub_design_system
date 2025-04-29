import {html} from 'lit';
import {Meta, StoryObj} from '@storybook/web-components';
import './sh-icon';

//métadonnées
const meta: Meta = {
    title: 'Components/atoms/Icon',
    component: 'sh-icon',
};

export default meta;

// Types
type ShIconArgs = {
    name: string;
};

type Story = StoryObj<ShIconArgs>;

//Histoires
export const Login: Story = ({ name }: ShIconArgs) => html`<sh-icon name="${name}"></sh-icon>`;
Login.args = {
    name: 'login',
};

export const Logout: Story = ({ name }: ShIconArgs) => html`<sh-icon name="${name}"></sh-icon>`;
Logout.args = {
    name: 'logout',
};

export const Delete: Story = ({ name }: ShIconArgs) => html`<sh-icon name="${name}"></sh-icon>`;
Delete.args = {
    name: 'delete',
};

export const Edit: Story = ({ name }: ShIconArgs) => html`<sh-icon name="${name}"></sh-icon>`;
Edit.args = {
    name: 'edit',
};

export const Menu: Story = ({ name }: ShIconArgs) => html`<sh-icon name="${name}"></sh-icon>`;
Menu.args = {
    name: 'menu',
};

export const Close: Story = ({ name }: ShIconArgs) => html`<sh-icon name="${name}"></sh-icon>`;
Close.args = {
    name: 'close',
};

export const Home: Story = ({ name }: ShIconArgs) => html`<sh-icon name="${name}"></sh-icon>`;
Home.args = {
    name: 'home',
};

export const Add: Story = ({ name }: ShIconArgs) => html`<sh-icon name="${name}"></sh-icon>`;
Add.args = {
    name: 'add',
};

export const Danger: Story = ({ name }: ShIconArgs) => html`<sh-icon name="${name}"></sh-icon>`;
Danger.args = {
    name: 'danger',
};

export const Back: Story = ({ name }: ShIconArgs) => html`<sh-icon name="${name}"></sh-icon>`;
Back.args = {
    name: 'back',
};

export const Search: Story = ({ name }: ShIconArgs) => html`<sh-icon name="${name}"></sh-icon>`;
Search.args = {
    name: 'search',
};

export const Sync: Story = ({ name }: ShIconArgs) => html`<sh-icon name="${name}"></sh-icon>`;
Sync.args = {
    name: 'sync',
};


export const Default: Story = ({ name }: ShIconArgs) => html`<sh-icon name="${name}"></sh-icon>`;
Default.args = {
    name: 'default',
};