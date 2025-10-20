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
        theme: {
            control: "select",
            options: ["light", "dark"],
            description: "Thème de l'icône (light ou dark)",
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
        theme: "dark",
    },
    render: (args) => `
        <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 200px; display: flex; align-items: center; justify-content: center; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
            <sh-icon name="${args.name}" size="${args.size}" color="${args.color}" ?clickable="${args.clickable}" ?spin="${args.spin}" data-theme="${args.theme}"></sh-icon>
        </div>
    `,
}

// Toutes les icônes StockHub principales
export const AllIcons: Story = {
    args: {
        theme: "dark",
    },
    render: (args) => {
        const icons = ["Package", "TrendingUp", "AlertTriangle", "Plus", "Search", "BarChart", "Eye", "Edit", "Trash2", "Bell", "User", "Home", "Settings", "Download", "RefreshCw", "Filter", "MoreVertical", "ChevronRight", "ArrowUpRight", "ArrowDownRight", "Minus", "Calendar", "MapPin"];
        return `
    <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 400px;">
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 16px; padding: 16px; background: ${args.theme === 'dark' ? '#1e293b' : '#ffffff'}; border-radius: 12px;">
        ${icons.map(icon => `
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px; background: ${args.theme === 'dark' ? '#334155' : '#f1f5f9'}; border-radius: 8px; color: ${args.theme === 'dark' ? '#f8fafc' : '#1e293b'};">
          <sh-icon name="${icon}" size="lg" color="primary" data-theme="${args.theme}"></sh-icon>
          <span style="font-size: 12px; text-align: center; color: ${args.theme === 'dark' ? '#cbd5e1' : '#64748b'};">${icon}</span>
        </div>`).join('')}
    </div>
    </div>
  `;
    }
}

// Tailles
export const Sizes: Story = {
    args: {
        theme: "dark",
    },
    render: (args) => `
    <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 200px; display: flex; align-items: center; justify-content: center;">
    <div style="display: flex; align-items: center; gap: 16px; padding: 16px; background: ${args.theme === 'dark' ? '#1e293b' : '#ffffff'}; border-radius: 12px;">
      <div style="text-align: center; color: ${args.theme === 'dark' ? '#f8fafc' : '#1e293b'};">
        <sh-icon name="Package" size="xs" color="primary" data-theme="${args.theme}"></sh-icon>
        <p style="margin: 8px 0 0 0; font-size: 12px; color: ${args.theme === 'dark' ? '#cbd5e1' : '#64748b'};">XS</p>
      </div>
      <div style="text-align: center; color: ${args.theme === 'dark' ? '#f8fafc' : '#1e293b'};">
        <sh-icon name="Package" size="sm" color="primary" data-theme="${args.theme}"></sh-icon>
        <p style="margin: 8px 0 0 0; font-size: 12px; color: ${args.theme === 'dark' ? '#cbd5e1' : '#64748b'};">SM</p>
      </div>
      <div style="text-align: center; color: ${args.theme === 'dark' ? '#f8fafc' : '#1e293b'};">
        <sh-icon name="Package" size="md" color="primary" data-theme="${args.theme}"></sh-icon>
        <p style="margin: 8px 0 0 0; font-size: 12px; color: ${args.theme === 'dark' ? '#cbd5e1' : '#64748b'};">MD</p>
      </div>
      <div style="text-align: center; color: ${args.theme === 'dark' ? '#f8fafc' : '#1e293b'};">
        <sh-icon name="Package" size="lg" color="primary" data-theme="${args.theme}"></sh-icon>
        <p style="margin: 8px 0 0 0; font-size: 12px; color: ${args.theme === 'dark' ? '#cbd5e1' : '#64748b'};">LG</p>
      </div>
      <div style="text-align: center; color: ${args.theme === 'dark' ? '#f8fafc' : '#1e293b'};">
        <sh-icon name="Package" size="xl" color="primary" data-theme="${args.theme}"></sh-icon>
        <p style="margin: 8px 0 0 0; font-size: 12px; color: ${args.theme === 'dark' ? '#cbd5e1' : '#64748b'};">XL</p>
      </div>
    </div>
    </div>
  `,
}

// Couleurs
export const Colors: Story = {
    args: {
        theme: "dark",
    },
    render: (args) => `
    <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 200px; display: flex; align-items: center; justify-content: center;">
    <div style="display: flex; align-items: center; gap: 16px; padding: 16px; background: ${args.theme === 'dark' ? '#1e293b' : '#ffffff'}; border-radius: 12px;">
      <div style="text-align: center;">
        <sh-icon name="Package" size="lg" color="inherit" style="color: ${args.theme === 'dark' ? '#f8fafc' : '#1e293b'};" data-theme="${args.theme}"></sh-icon>
        <p style="margin: 8px 0 0 0; font-size: 12px; color: ${args.theme === 'dark' ? '#cbd5e1' : '#64748b'};">Inherit</p>
      </div>
      <div style="text-align: center;">
        <sh-icon name="Package" size="lg" color="primary" data-theme="${args.theme}"></sh-icon>
        <p style="margin: 8px 0 0 0; font-size: 12px; color: ${args.theme === 'dark' ? '#cbd5e1' : '#64748b'};">Primary</p>
      </div>
      <div style="text-align: center;">
        <sh-icon name="Package" size="lg" color="success" data-theme="${args.theme}"></sh-icon>
        <p style="margin: 8px 0 0 0; font-size: 12px; color: ${args.theme === 'dark' ? '#cbd5e1' : '#64748b'};">Success</p>
      </div>
      <div style="text-align: center;">
        <sh-icon name="Package" size="lg" color="warning" data-theme="${args.theme}"></sh-icon>
        <p style="margin: 8px 0 0 0; font-size: 12px; color: ${args.theme === 'dark' ? '#cbd5e1' : '#64748b'};">Warning</p>
      </div>
      <div style="text-align: center;">
        <sh-icon name="Package" size="lg" color="danger" data-theme="${args.theme}"></sh-icon>
        <p style="margin: 8px 0 0 0; font-size: 12px; color: ${args.theme === 'dark' ? '#cbd5e1' : '#64748b'};">Danger</p>
      </div>
      <div style="text-align: center;">
        <sh-icon name="Package" size="lg" color="muted" data-theme="${args.theme}"></sh-icon>
        <p style="margin: 8px 0 0 0; font-size: 12px; color: ${args.theme === 'dark' ? '#cbd5e1' : '#64748b'};">Muted</p>
      </div>
    </div>
    </div>
  `,
}

// États interactifs
export const Interactive: Story = {
    args: {
        theme: "dark",
    },
    render: (args) => `
    <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 200px; display: flex; align-items: center; justify-content: center;">
    <div style="display: flex; align-items: center; gap: 16px; padding: 16px; background: ${args.theme === 'dark' ? '#1e293b' : '#ffffff'}; border-radius: 12px;">
      <div style="text-align: center;">
        <sh-icon name="Settings" size="lg" color="primary" clickable data-theme="${args.theme}"></sh-icon>
        <p style="margin: 8px 0 0 0; font-size: 12px; color: ${args.theme === 'dark' ? '#cbd5e1' : '#64748b'};">Clickable</p>
      </div>
      <div style="text-align: center;">
        <sh-icon name="RefreshCw" size="lg" color="primary" spin data-theme="${args.theme}"></sh-icon>
        <p style="margin: 8px 0 0 0; font-size: 12px; color: ${args.theme === 'dark' ? '#cbd5e1' : '#64748b'};">Spinning</p>
      </div>
      <div style="text-align: center;">
        <sh-icon name="Bell" size="lg" color="warning" clickable data-theme="${args.theme}"></sh-icon>
        <p style="margin: 8px 0 0 0; font-size: 12px; color: ${args.theme === 'dark' ? '#cbd5e1' : '#64748b'};">Notification</p>
      </div>
    </div>
    </div>
  `,
}

// Cas d'usage StockHub
export const StockHubUsage: Story = {
    args: {
        theme: "dark",
    },
    render: (args) => `
    <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 400px;">
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px; padding: 16px;">
      <!-- Métriques -->
      <div style="background: ${args.theme === 'dark' ? '#334155' : '#ffffff'}; padding: 16px; border-radius: 12px; border: 1px solid rgba(139, 92, 246, 0.1);">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
          <sh-icon name="Package" size="lg" color="primary" data-theme="${args.theme}"></sh-icon>
          <h3 style="margin: 0; color: ${args.theme === 'dark' ? '#f8fafc' : '#1e293b'}; font-size: 16px;">Total Produits</h3>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 24px; font-weight: bold; color: ${args.theme === 'dark' ? '#f8fafc' : '#1e293b'};">248</span>
          <sh-icon name="ArrowUpRight" size="sm" color="success" data-theme="${args.theme}"></sh-icon>
          <span style="font-size: 14px; color: #22c55e;">+12</span>
        </div>
      </div>

      <!-- Actions -->
      <div style="background: ${args.theme === 'dark' ? '#334155' : '#ffffff'}; padding: 16px; border-radius: 12px; border: 1px solid rgba(139, 92, 246, 0.1);">
        <h3 style="margin: 0 0 12px 0; color: ${args.theme === 'dark' ? '#f8fafc' : '#1e293b'}; font-size: 16px;">Actions</h3>
        <div style="display: flex; gap: 8px;">
          <sh-icon name="Plus" size="md" color="primary" clickable data-theme="${args.theme}"></sh-icon>
          <sh-icon name="Edit" size="md" color="muted" clickable data-theme="${args.theme}"></sh-icon>
          <sh-icon name="Trash2" size="md" color="danger" clickable data-theme="${args.theme}"></sh-icon>
          <sh-icon name="Eye" size="md" color="muted" clickable data-theme="${args.theme}"></sh-icon>
        </div>
      </div>

      <!-- Navigation -->
      <div style="background: ${args.theme === 'dark' ? '#334155' : '#ffffff'}; padding: 16px; border-radius: 12px; border: 1px solid rgba(139, 92, 246, 0.1);">
        <h3 style="margin: 0 0 12px 0; color: ${args.theme === 'dark' ? '#f8fafc' : '#1e293b'}; font-size: 16px;">Navigation</h3>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <div style="display: flex; align-items: center; gap: 8px; color: ${args.theme === 'dark' ? '#cbd5e1' : '#64748b'};">
            <sh-icon name="Home" size="sm" color="muted" data-theme="${args.theme}"></sh-icon>
            <span style="font-size: 14px;">Tableau de bord</span>
            <sh-icon name="ChevronRight" size="xs" color="muted" style="margin-left: auto;" data-theme="${args.theme}"></sh-icon>
          </div>
          <div style="display: flex; align-items: center; gap: 8px; color: ${args.theme === 'dark' ? '#cbd5e1' : '#64748b'};">
            <sh-icon name="Package" size="sm" color="primary" data-theme="${args.theme}"></sh-icon>
            <span style="font-size: 14px;">Produits</span>
            <sh-icon name="ChevronRight" size="xs" color="muted" style="margin-left: auto;" data-theme="${args.theme}"></sh-icon>
          </div>
        </div>
      </div>
    </div>
    </div>
  `,
}
