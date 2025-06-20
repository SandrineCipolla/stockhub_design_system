import {html} from "lit"
import type {Meta, StoryObj} from "@storybook/web-components"
import "./sh-icon.ts"

const meta: Meta = {
    title: "StockHub/Atoms/Icon",
    component: "sh-icon",
    parameters: {
        docs: {
            description: {
                component: "Système d'icônes StockHub basé sur Lucide avec support des tailles, couleurs et interactions.",
            },
        },
    },
    argTypes: {
        name: {
            control: "select",
            options: [
                "package",
                "trending-up",
                "alert-triangle",
                "plus",
                "search",
                "bar-chart",
                "eye",
                "edit",
                "trash",
                "sun",
                "moon",
                "bell",
                "user",
                "home",
                "settings",
                "download",
                "refresh",
                "filter",
                "more-vertical",
                "chevron-right",
                "arrow-up-right",
                "arrow-down-right",
                "minus",
                "calendar",
                "map-pin",
            ],
            description: "Nom de l'icône",
        },
        size: {
            control: "select",
            options: ["xs", "sm", "md", "lg", "xl"],
            description: "Taille de l'icône",
        },
        color: {
            control: "select",
            options: ["inherit", "primary", "success", "warning", "danger", "muted"],
            description: "Couleur de l'icône",
        },
        clickable: {
            control: "boolean",
            description: "Icône cliquable avec effets hover",
        },
        spin: {
            control: "boolean",
            description: "Animation de rotation",
        },
    },
}

export default meta
type Story = StoryObj

// Story par défaut
export const Default: Story = {
    args: {
        name: "package",
        size: "md",
        color: "inherit",
        clickable: false,
        spin: false,
    },
}

// Toutes les icônes StockHub
export const AllIcons: Story = {
    render: () => html`
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 16px; padding: 16px; background: #1e293b; border-radius: 12px;">
      ${[
        "package",
        "trending-up",
        "alert-triangle",
        "plus",
        "search",
        "bar-chart",
        "eye",
        "edit",
        "trash",
        "sun",
        "moon",
        "bell",
        "user",
        "home",
        "settings",
        "download",
        "refresh",
        "filter",
        "more-vertical",
        "chevron-right",
        "arrow-up-right",
        "arrow-down-right",
        "minus",
        "calendar",
        "map-pin",
    ].map(
        (iconName) => html`
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px; background: #334155; border-radius: 8px; color: #f8fafc;">
          <sh-icon name="${iconName}" size="lg" color="primary"></sh-icon>
          <span style="font-size: 12px; text-align: center; color: #cbd5e1;">${iconName}</span>
        </div>
      `,
    )}
    </div>
  `,
}

// Tailles
export const Sizes: Story = {
    render: () => html`
    <div style="display: flex; align-items: center; gap: 16px; padding: 16px; background: #1e293b; border-radius: 12px;">
      <div style="text-align: center; color: #f8fafc;">
        <sh-icon name="package" size="xs" color="primary"></sh-icon>
        <p style="margin: 8px 0 0 0; font-size: 12px; color: #cbd5e1;">XS</p>
      </div>
      <div style="text-align: center; color: #f8fafc;">
        <sh-icon name="package" size="sm" color="primary"></sh-icon>
        <p style="margin: 8px 0 0 0; font-size: 12px; color: #cbd5e1;">SM</p>
      </div>
      <div style="text-align: center; color: #f8fafc;">
        <sh-icon name="package" size="md" color="primary"></sh-icon>
        <p style="margin: 8px 0 0 0; font-size: 12px; color: #cbd5e1;">MD</p>
      </div>
      <div style="text-align: center; color: #f8fafc;">
        <sh-icon name="package" size="lg" color="primary"></sh-icon>
        <p style="margin: 8px 0 0 0; font-size: 12px; color: #cbd5e1;">LG</p>
      </div>
      <div style="text-align: center; color: #f8fafc;">
        <sh-icon name="package" size="xl" color="primary"></sh-icon>
        <p style="margin: 8px 0 0 0; font-size: 12px; color: #cbd5e1;">XL</p>
      </div>
    </div>
  `,
}

// Couleurs
export const Colors: Story = {
    render: () => html`
    <div style="display: flex; align-items: center; gap: 16px; padding: 16px; background: #1e293b; border-radius: 12px;">
      <div style="text-align: center;">
        <sh-icon name="package" size="lg" color="inherit" style="color: #f8fafc;"></sh-icon>
        <p style="margin: 8px 0 0 0; font-size: 12px; color: #cbd5e1;">Inherit</p>
      </div>
      <div style="text-align: center;">
        <sh-icon name="package" size="lg" color="primary"></sh-icon>
        <p style="margin: 8px 0 0 0; font-size: 12px; color: #cbd5e1;">Primary</p>
      </div>
      <div style="text-align: center;">
        <sh-icon name="package" size="lg" color="success"></sh-icon>
        <p style="margin: 8px 0 0 0; font-size: 12px; color: #cbd5e1;">Success</p>
      </div>
      <div style="text-align: center;">
        <sh-icon name="package" size="lg" color="warning"></sh-icon>
        <p style="margin: 8px 0 0 0; font-size: 12px; color: #cbd5e1;">Warning</p>
      </div>
      <div style="text-align: center;">
        <sh-icon name="package" size="lg" color="danger"></sh-icon>
        <p style="margin: 8px 0 0 0; font-size: 12px; color: #cbd5e1;">Danger</p>
      </div>
      <div style="text-align: center;">
        <sh-icon name="package" size="lg" color="muted"></sh-icon>
        <p style="margin: 8px 0 0 0; font-size: 12px; color: #cbd5e1;">Muted</p>
      </div>
    </div>
  `,
}

// États interactifs
export const Interactive: Story = {
    render: () => html`
    <div style="display: flex; align-items: center; gap: 16px; padding: 16px; background: #1e293b; border-radius: 12px;">
      <div style="text-align: center;">
        <sh-icon name="settings" size="lg" color="primary" clickable></sh-icon>
        <p style="margin: 8px 0 0 0; font-size: 12px; color: #cbd5e1;">Clickable</p>
      </div>
      <div style="text-align: center;">
        <sh-icon name="refresh" size="lg" color="primary" spin></sh-icon>
        <p style="margin: 8px 0 0 0; font-size: 12px; color: #cbd5e1;">Spinning</p>
      </div>
      <div style="text-align: center;">
        <sh-icon name="bell" size="lg" color="warning" clickable></sh-icon>
        <p style="margin: 8px 0 0 0; font-size: 12px; color: #cbd5e1;">Notification</p>
      </div>
    </div>
  `,
}

// Cas d'usage StockHub
export const StockHubUsage: Story = {
    render: () => html`
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px; padding: 16px;">
      <!-- Métriques -->
      <div style="background: #334155; padding: 16px; border-radius: 12px; border: 1px solid rgba(139, 92, 246, 0.1);">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
          <sh-icon name="package" size="lg" color="primary"></sh-icon>
          <h3 style="margin: 0; color: #f8fafc; font-size: 16px;">Total Produits</h3>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 24px; font-weight: bold; color: #f8fafc;">248</span>
          <sh-icon name="arrow-up-right" size="sm" color="success"></sh-icon>
          <span style="font-size: 14px; color: #22c55e;">+12</span>
        </div>
      </div>

      <!-- Actions -->
      <div style="background: #334155; padding: 16px; border-radius: 12px; border: 1px solid rgba(139, 92, 246, 0.1);">
        <h3 style="margin: 0 0 12px 0; color: #f8fafc; font-size: 16px;">Actions</h3>
        <div style="display: flex; gap: 8px;">
          <sh-icon name="plus" size="md" color="primary" clickable></sh-icon>
          <sh-icon name="edit" size="md" color="muted" clickable></sh-icon>
          <sh-icon name="trash" size="md" color="danger" clickable></sh-icon>
          <sh-icon name="eye" size="md" color="muted" clickable></sh-icon>
        </div>
      </div>

      <!-- Navigation -->
      <div style="background: #334155; padding: 16px; border-radius: 12px; border: 1px solid rgba(139, 92, 246, 0.1);">
        <h3 style="margin: 0 0 12px 0; color: #f8fafc; font-size: 16px;">Navigation</h3>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <div style="display: flex; align-items: center; gap: 8px; color: #cbd5e1;">
            <sh-icon name="home" size="sm" color="muted"></sh-icon>
            <span style="font-size: 14px;">Tableau de bord</span>
            <sh-icon name="chevron-right" size="xs" color="muted" style="margin-left: auto;"></sh-icon>
          </div>
          <div style="display: flex; align-items: center; gap: 8px; color: #cbd5e1;">
            <sh-icon name="package" size="sm" color="primary"></sh-icon>
            <span style="font-size: 14px;">Produits</span>
            <sh-icon name="chevron-right" size="xs" color="muted" style="margin-left: auto;"></sh-icon>
          </div>
        </div>
      </div>
    </div>
  `,
}
