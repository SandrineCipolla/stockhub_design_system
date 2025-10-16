import type {Meta, StoryObj} from "@storybook/web-components"
import "./sh-icon.ts"

const meta: Meta = {
    title: "Components/Atoms/Icon",
    component: "sh-icon",
    parameters: {
        docs: {
            description: {
                component: "Système d'icônes StockHub basé sur Lucide avec support des tailles, couleurs et interactions. Utilise la bibliothèque Lucide pour une compatibilité totale avec StockHub V2.",
            },
        },
    },
    argTypes: {
        name: {
            control: "select",
            options: [
                "Package",
                "TrendingUp",
                "AlertTriangle",
                "Plus",
                "Search",
                "BarChart",
                "Eye",
                "Edit",
                "Trash2",
                "Sun",
                "Moon",
                "Bell",
                "User",
                "Home",
                "Settings",
                "Download",
                "RefreshCw",
                "Filter",
                "MoreVertical",
                "ChevronRight",
                "ArrowUpRight",
                "ArrowDownRight",
                "Minus",
                "Calendar",
                "MapPin",
            ],
            description: "Nom de l'icône Lucide (PascalCase)",
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
        name: "Package",
        size: "md",
        color: "inherit",
        clickable: false,
        spin: false,
    },
    render: (args) => `<sh-icon name="${args.name}" size="${args.size}" color="${args.color}" ?clickable="${args.clickable}" ?spin="${args.spin}"></sh-icon>`,
}

// Toutes les icônes StockHub principales
export const AllIcons: Story = {
    render: () => `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 16px; padding: 16px; background: #1e293b; border-radius: 12px;">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px; background: #334155; border-radius: 8px; color: #f8fafc;">
          <sh-icon name="Package" size="lg" color="primary"></sh-icon>
          <span style="font-size: 12px; text-align: center; color: #cbd5e1;">Package</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px; background: #334155; border-radius: 8px; color: #f8fafc;">
          <sh-icon name="TrendingUp" size="lg" color="primary"></sh-icon>
          <span style="font-size: 12px; text-align: center; color: #cbd5e1;">TrendingUp</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px; background: #334155; border-radius: 8px; color: #f8fafc;">
          <sh-icon name="AlertTriangle" size="lg" color="primary"></sh-icon>
          <span style="font-size: 12px; text-align: center; color: #cbd5e1;">AlertTriangle</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px; background: #334155; border-radius: 8px; color: #f8fafc;">
          <sh-icon name="Plus" size="lg" color="primary"></sh-icon>
          <span style="font-size: 12px; text-align: center; color: #cbd5e1;">Plus</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px; background: #334155; border-radius: 8px; color: #f8fafc;">
          <sh-icon name="Search" size="lg" color="primary"></sh-icon>
          <span style="font-size: 12px; text-align: center; color: #cbd5e1;">Search</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px; background: #334155; border-radius: 8px; color: #f8fafc;">
          <sh-icon name="BarChart" size="lg" color="primary"></sh-icon>
          <span style="font-size: 12px; text-align: center; color: #cbd5e1;">BarChart</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px; background: #334155; border-radius: 8px; color: #f8fafc;">
          <sh-icon name="Eye" size="lg" color="primary"></sh-icon>
          <span style="font-size: 12px; text-align: center; color: #cbd5e1;">Eye</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px; background: #334155; border-radius: 8px; color: #f8fafc;">
          <sh-icon name="Edit" size="lg" color="primary"></sh-icon>
          <span style="font-size: 12px; text-align: center; color: #cbd5e1;">Edit</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px; background: #334155; border-radius: 8px; color: #f8fafc;">
          <sh-icon name="Trash2" size="lg" color="primary"></sh-icon>
          <span style="font-size: 12px; text-align: center; color: #cbd5e1;">Trash2</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px; background: #334155; border-radius: 8px; color: #f8fafc;">
          <sh-icon name="Bell" size="lg" color="primary"></sh-icon>
          <span style="font-size: 12px; text-align: center; color: #cbd5e1;">Bell</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px; background: #334155; border-radius: 8px; color: #f8fafc;">
          <sh-icon name="User" size="lg" color="primary"></sh-icon>
          <span style="font-size: 12px; text-align: center; color: #cbd5e1;">User</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px; background: #334155; border-radius: 8px; color: #f8fafc;">
          <sh-icon name="Home" size="lg" color="primary"></sh-icon>
          <span style="font-size: 12px; text-align: center; color: #cbd5e1;">Home</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px; background: #334155; border-radius: 8px; color: #f8fafc;">
          <sh-icon name="Settings" size="lg" color="primary"></sh-icon>
          <span style="font-size: 12px; text-align: center; color: #cbd5e1;">Settings</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px; background: #334155; border-radius: 8px; color: #f8fafc;">
          <sh-icon name="Download" size="lg" color="primary"></sh-icon>
          <span style="font-size: 12px; text-align: center; color: #cbd5e1;">Download</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px; background: #334155; border-radius: 8px; color: #f8fafc;">
          <sh-icon name="RefreshCw" size="lg" color="primary"></sh-icon>
          <span style="font-size: 12px; text-align: center; color: #cbd5e1;">RefreshCw</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px; background: #334155; border-radius: 8px; color: #f8fafc;">
          <sh-icon name="Filter" size="lg" color="primary"></sh-icon>
          <span style="font-size: 12px; text-align: center; color: #cbd5e1;">Filter</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px; background: #334155; border-radius: 8px; color: #f8fafc;">
          <sh-icon name="MoreVertical" size="lg" color="primary"></sh-icon>
          <span style="font-size: 12px; text-align: center; color: #cbd5e1;">MoreVertical</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px; background: #334155; border-radius: 8px; color: #f8fafc;">
          <sh-icon name="ChevronRight" size="lg" color="primary"></sh-icon>
          <span style="font-size: 12px; text-align: center; color: #cbd5e1;">ChevronRight</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px; background: #334155; border-radius: 8px; color: #f8fafc;">
          <sh-icon name="ArrowUpRight" size="lg" color="primary"></sh-icon>
          <span style="font-size: 12px; text-align: center; color: #cbd5e1;">ArrowUpRight</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px; background: #334155; border-radius: 8px; color: #f8fafc;">
          <sh-icon name="ArrowDownRight" size="lg" color="primary"></sh-icon>
          <span style="font-size: 12px; text-align: center; color: #cbd5e1;">ArrowDownRight</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px; background: #334155; border-radius: 8px; color: #f8fafc;">
          <sh-icon name="Minus" size="lg" color="primary"></sh-icon>
          <span style="font-size: 12px; text-align: center; color: #cbd5e1;">Minus</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px; background: #334155; border-radius: 8px; color: #f8fafc;">
          <sh-icon name="Calendar" size="lg" color="primary"></sh-icon>
          <span style="font-size: 12px; text-align: center; color: #cbd5e1;">Calendar</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px; background: #334155; border-radius: 8px; color: #f8fafc;">
          <sh-icon name="MapPin" size="lg" color="primary"></sh-icon>
          <span style="font-size: 12px; text-align: center; color: #cbd5e1;">MapPin</span>
        </div>
    </div>
  `,
}

// Tailles
export const Sizes: Story = {
    render: () => `
    <div style="display: flex; align-items: center; gap: 16px; padding: 16px; background: #1e293b; border-radius: 12px;">
      <div style="text-align: center; color: #f8fafc;">
        <sh-icon name="Package" size="xs" color="primary"></sh-icon>
        <p style="margin: 8px 0 0 0; font-size: 12px; color: #cbd5e1;">XS</p>
      </div>
      <div style="text-align: center; color: #f8fafc;">
        <sh-icon name="Package" size="sm" color="primary"></sh-icon>
        <p style="margin: 8px 0 0 0; font-size: 12px; color: #cbd5e1;">SM</p>
      </div>
      <div style="text-align: center; color: #f8fafc;">
        <sh-icon name="Package" size="md" color="primary"></sh-icon>
        <p style="margin: 8px 0 0 0; font-size: 12px; color: #cbd5e1;">MD</p>
      </div>
      <div style="text-align: center; color: #f8fafc;">
        <sh-icon name="Package" size="lg" color="primary"></sh-icon>
        <p style="margin: 8px 0 0 0; font-size: 12px; color: #cbd5e1;">LG</p>
      </div>
      <div style="text-align: center; color: #f8fafc;">
        <sh-icon name="Package" size="xl" color="primary"></sh-icon>
        <p style="margin: 8px 0 0 0; font-size: 12px; color: #cbd5e1;">XL</p>
      </div>
    </div>
  `,
}

// Couleurs
export const Colors: Story = {
    render: () => `
    <div style="display: flex; align-items: center; gap: 16px; padding: 16px; background: #1e293b; border-radius: 12px;">
      <div style="text-align: center;">
        <sh-icon name="Package" size="lg" color="inherit" style="color: #f8fafc;"></sh-icon>
        <p style="margin: 8px 0 0 0; font-size: 12px; color: #cbd5e1;">Inherit</p>
      </div>
      <div style="text-align: center;">
        <sh-icon name="Package" size="lg" color="primary"></sh-icon>
        <p style="margin: 8px 0 0 0; font-size: 12px; color: #cbd5e1;">Primary</p>
      </div>
      <div style="text-align: center;">
        <sh-icon name="Package" size="lg" color="success"></sh-icon>
        <p style="margin: 8px 0 0 0; font-size: 12px; color: #cbd5e1;">Success</p>
      </div>
      <div style="text-align: center;">
        <sh-icon name="Package" size="lg" color="warning"></sh-icon>
        <p style="margin: 8px 0 0 0; font-size: 12px; color: #cbd5e1;">Warning</p>
      </div>
      <div style="text-align: center;">
        <sh-icon name="Package" size="lg" color="danger"></sh-icon>
        <p style="margin: 8px 0 0 0; font-size: 12px; color: #cbd5e1;">Danger</p>
      </div>
      <div style="text-align: center;">
        <sh-icon name="Package" size="lg" color="muted"></sh-icon>
        <p style="margin: 8px 0 0 0; font-size: 12px; color: #cbd5e1;">Muted</p>
      </div>
    </div>
  `,
}

// États interactifs
export const Interactive: Story = {
    render: () => `
    <div style="display: flex; align-items: center; gap: 16px; padding: 16px; background: #1e293b; border-radius: 12px;">
      <div style="text-align: center;">
        <sh-icon name="Settings" size="lg" color="primary" clickable></sh-icon>
        <p style="margin: 8px 0 0 0; font-size: 12px; color: #cbd5e1;">Clickable</p>
      </div>
      <div style="text-align: center;">
        <sh-icon name="RefreshCw" size="lg" color="primary" spin></sh-icon>
        <p style="margin: 8px 0 0 0; font-size: 12px; color: #cbd5e1;">Spinning</p>
      </div>
      <div style="text-align: center;">
        <sh-icon name="Bell" size="lg" color="warning" clickable></sh-icon>
        <p style="margin: 8px 0 0 0; font-size: 12px; color: #cbd5e1;">Notification</p>
      </div>
    </div>
  `,
}

// Cas d'usage StockHub
export const StockHubUsage: Story = {
    render: () => `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px; padding: 16px;">
      <!-- Métriques -->
      <div style="background: #334155; padding: 16px; border-radius: 12px; border: 1px solid rgba(139, 92, 246, 0.1);">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
          <sh-icon name="Package" size="lg" color="primary"></sh-icon>
          <h3 style="margin: 0; color: #f8fafc; font-size: 16px;">Total Produits</h3>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 24px; font-weight: bold; color: #f8fafc;">248</span>
          <sh-icon name="ArrowUpRight" size="sm" color="success"></sh-icon>
          <span style="font-size: 14px; color: #22c55e;">+12</span>
        </div>
      </div>

      <!-- Actions -->
      <div style="background: #334155; padding: 16px; border-radius: 12px; border: 1px solid rgba(139, 92, 246, 0.1);">
        <h3 style="margin: 0 0 12px 0; color: #f8fafc; font-size: 16px;">Actions</h3>
        <div style="display: flex; gap: 8px;">
          <sh-icon name="Plus" size="md" color="primary" clickable></sh-icon>
          <sh-icon name="Edit" size="md" color="muted" clickable></sh-icon>
          <sh-icon name="Trash2" size="md" color="danger" clickable></sh-icon>
          <sh-icon name="Eye" size="md" color="muted" clickable></sh-icon>
        </div>
      </div>

      <!-- Navigation -->
      <div style="background: #334155; padding: 16px; border-radius: 12px; border: 1px solid rgba(139, 92, 246, 0.1);">
        <h3 style="margin: 0 0 12px 0; color: #f8fafc; font-size: 16px;">Navigation</h3>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <div style="display: flex; align-items: center; gap: 8px; color: #cbd5e1;">
            <sh-icon name="Home" size="sm" color="muted"></sh-icon>
            <span style="font-size: 14px;">Tableau de bord</span>
            <sh-icon name="ChevronRight" size="xs" color="muted" style="margin-left: auto;"></sh-icon>
          </div>
          <div style="display: flex; align-items: center; gap: 8px; color: #cbd5e1;">
            <sh-icon name="Package" size="sm" color="primary"></sh-icon>
            <span style="font-size: 14px;">Produits</span>
            <sh-icon name="ChevronRight" size="xs" color="muted" style="margin-left: auto;"></sh-icon>
          </div>
        </div>
      </div>
    </div>
  `,
}
