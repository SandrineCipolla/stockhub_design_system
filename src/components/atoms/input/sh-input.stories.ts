import type {Meta, StoryObj} from "@storybook/web-components"
import "./sh-input.ts"

const meta = {
    title: "StockHub/Atoms/Input",
    component: "sh-input",
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: "Composant Input StockHub avec design tokens et support du thème sombre par défaut.",
            },
        },
    },
    argTypes: {
        type: {
            control: "select",
            options: ["text", "number", "email", "password", "tel"],
            description: "Type de l'input",
        },
        placeholder: {
            control: "text",
            description: "Texte de placeholder",
        },
        value: {
            control: "text",
            description: "Valeur de l'input",
        },
        error: {
            control: "boolean",
            description: "État d'erreur",
        },
        errorMessage: {
            control: "text",
            description: "Message d'erreur personnalisé",
        },
        size: {
            control: "select",
            options: ["small", "medium", "large"],
            description: "Taille de l'input",
        },
        hideArrows: {
            control: "boolean",
            description: "Masquer les flèches pour les inputs de type 'number'",
        },
        disabled: {
            control: "boolean",
            description: "État désactivé",
        },
        required: {
            control: "boolean",
            description: "Champ requis",
        },
        name: {
            control: "text",
            description: "Nom de l'input pour les formulaires",
        },
    },
} satisfies Meta

export default meta
type Story = StoryObj

// Story par défaut
export const Default: Story = {
    args: {
        type: "text",
        placeholder: "Entrez du texte...",
        size: "medium",
        error: false,
        hideArrows: false,
        disabled: false,
        required: false,
        name: "default-input",
    },
}

// Toutes les tailles
export const Sizes: Story = {
    render: () => `
        <div style="display: flex; flex-direction: column; gap: var(--spacing-lg); padding: var(--spacing-lg);">
            <div>
                <label style="display: block; margin-bottom: var(--spacing-xs); color: var(--color-text-secondary); font-size: var(--font-fontSize-sm);">Small</label>
                <sh-input size="small" placeholder="Small input" value="Small"></sh-input>
            </div>
            <div>
                <label style="display: block; margin-bottom: var(--spacing-xs); color: var(--color-text-secondary); font-size: var(--font-fontSize-sm);">Medium (défaut)</label>
                <sh-input size="medium" placeholder="Medium input" value="Medium"></sh-input>
            </div>
            <div>
                <label style="display: block; margin-bottom: var(--spacing-xs); color: var(--color-text-secondary); font-size: var(--font-fontSize-sm);">Large</label>
                <sh-input size="large" placeholder="Large input" value="Large"></sh-input>
            </div>
        </div>
    `,
}

// Types d'inputs
export const Types: Story = {
    render: () => `
        <div style="display: flex; flex-direction: column; gap: var(--spacing-lg); padding: var(--spacing-lg); max-width: 400px;">
            <div>
                <label style="display: block; margin-bottom: var(--spacing-xs); color: var(--color-text-secondary); font-size: var(--font-fontSize-sm);">Texte</label>
                <sh-input type="text" placeholder="Nom du produit" name="product-name"></sh-input>
            </div>
            <div>
                <label style="display: block; margin-bottom: var(--spacing-xs); color: var(--color-text-secondary); font-size: var(--font-fontSize-sm);">Nombre</label>
                <sh-input type="number" placeholder="Quantité" hide-arrows name="quantity"></sh-input>
            </div>
            <div>
                <label style="display: block; margin-bottom: var(--spacing-xs); color: var(--color-text-secondary); font-size: var(--font-fontSize-sm);">Email</label>
                <sh-input type="email" placeholder="contact@stockhub.com" name="email"></sh-input>
            </div>
            <div>
                <label style="display: block; margin-bottom: var(--spacing-xs); color: var(--color-text-secondary); font-size: var(--font-fontSize-sm);">Mot de passe</label>
                <sh-input type="password" placeholder="••••••••" name="password"></sh-input>
            </div>
        </div>
    `,
}

// États
export const States: Story = {
    render: () => `
        <div style="display: flex; flex-direction: column; gap: var(--spacing-lg); padding: var(--spacing-lg); max-width: 400px;">
            <div>
                <label style="display: block; margin-bottom: var(--spacing-xs); color: var(--color-text-secondary); font-size: var(--font-fontSize-sm);">Normal</label>
                <sh-input placeholder="État normal" value="Texte normal"></sh-input>
            </div>
            <div>
                <label style="display: block; margin-bottom: var(--spacing-xs); color: var(--color-text-secondary); font-size: var(--font-fontSize-sm);">Avec erreur</label>
                <sh-input placeholder="Champ requis" error error-message="Ce champ est obligatoire"></sh-input>
            </div>
            <div>
                <label style="display: block; margin-bottom: var(--spacing-xs); color: var(--color-text-secondary); font-size: var(--font-fontSize-sm);">Désactivé</label>
                <sh-input placeholder="Champ désactivé" value="Non modifiable" disabled></sh-input>
            </div>
            <div>
                <label style="display: block; margin-bottom: var(--spacing-xs); color: var(--color-text-secondary); font-size: var(--font-fontSize-sm);">Requis</label>
                <sh-input placeholder="Champ requis" required></sh-input>
            </div>
        </div>
    `,
}

// // Cas d'usage StockHub
// export const StockHubUseCases: Story = {
//     render: () => `
//         <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: var(--spacing-xl); padding: var(--spacing-lg);">
//             <div style="background: var(--color-surface-secondary); padding: var(--spacing-lg); border-radius: var(--border-radius-lg); border: 1px solid var(--color-border-subtle);">
//                 <h3 style="margin: 0 0 var(--spacing-md) 0; color: var(--color-text-primary); font-size: var(--font-fontSize-lg);">Ajout Produit</h3>
//                 <div style="display: flex; flex-direction: column; gap: var(--spacing-md);">
//                     <sh-input type="text" placeholder="Nom du produit" name="product-name" required></sh-input>
//                     <sh-input type="text" placeholder="SKU" name="sku" size="small"></sh-input>
//                     <sh-input type="number" placeholder="Quantité" name="quantity" hide-arrows></sh-input>
//                     <sh-input type="number" placeholder="Prix unitaire (€)" name="price" hide-arrows></sh-input>
//                 </div>
//             </div>
//
//             <div style="background: var(--color-surface-secondary); padding: var(--spacing-lg); border-radius: var(--border-radius-lg); border: 1px solid var(--color-border-subtle);">
//                 <h3 style="margin: 0 0 var(--spacing-md) 0; color: var(--color-text-primary); font-size: var(--font-fontSize-lg);">Recherche</h3>
//                 <div style="display: flex; flex-direction: column; gap: var(--spacing-md);">
//                     <sh-input type="text" placeholder="Rechercher un produit..." size="large" name="search"></sh-input>
//                     <sh-input type="text" placeholder="Filtrer par catégorie" name="category"></sh-input>
//                 </div>
//             </div>
//
//             <div style="background: var(--color-surface-secondary); padding: var(--spacing-lg); border-radius: var(--border-radius-lg); border: 1px solid var(--color-border-subtle);">
//                 <h3 style="margin: 0 0 var(--spacing-md) 0; color: var(--color-text-primary); font-size: var(--font-fontSize-lg);">Configuration</h3>
//                 <div style="display: flex; flex-direction: column; gap: var(--spacing-md);">
//                     <sh-input type="number" placeholder="Stock minimum" name="min-stock" size="small" hide-arrows></sh-input>
//                     <sh-input type="text" placeholder="Emplacement" name="location"></sh-input>
//                     <sh-input type="email" placeholder="Email de notification" name="notification-email"></sh-input>
//                 </div>
//             </div>
//         </div>
//     `,
// }




