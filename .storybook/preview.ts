import type {Preview} from "@storybook/web-components"
import 'lit/polyfill-support.js' // recommandé
// ⭐️ IMPORTANT: S'assurer que ce chemin est correct
import "../src/tokens/design-tokens.css"

// ⭐️ IMPORTANT: Importer aussi les composants principaux pour s'assurer qu'ils sont chargés
import "../src/components/atoms/icon/sh-icon.ts"
import "../src/components/molecules/button/sh-button.ts"

// Import custom elements manifest for documentation
import { setCustomElementsManifest } from '@storybook/web-components';
import customElements from '../custom-elements.json';

setCustomElementsManifest(customElements);

const preview: Preview = {
    parameters: {
        // Configuration de l'ordre des sections dans le menu
        options: {
            storySort: {
                order: [
                    'Introduction', // Pour les stories génériques
                    'Design Tokens',
                    'Icons',
                    'Components',
                    ['Atoms', ['Badge', 'Icon', 'Input', 'Logo', 'Text'],
                     'Molecules', ['Button', 'Card', 'QuantityInput', 'StatusBadge'],
                     'Organisms', ['Header']],
                    '*', // Autres sections à la fin
                ],
                method: 'alphabetical',
            },
        },
        backgrounds: {
            default: "stockhub-dark",
            values: [
                {
                    name: "stockhub-dark",
                    value: "linear-gradient(to br, #0f172a, #1e1b4b)",
                },
                {
                    name: "stockhub-light",
                    value: "linear-gradient(to br, #f8fafc, #f0ebff)",
                },
            ],
        },
        actions: { argTypesRegex: "^on[A-Z].*" },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
    },
    globalTypes: {
        theme: {
            defaultValue: "dark",
            toolbar: {
                title: "Theme",
                icon: "paintbrush",
                items: [
                    { value: "light", icon: "sun", title: "Light" },
                    { value: "dark", icon: "moon", title: "Dark" },
                ],
            },
        },
    },
    decorators: [
        (story, context) => {
            const theme = context.globals.theme || "dark"

            // ⭐️ IMPORTANT: Injecter les variables CSS dans le document
            const style = document.createElement("style")
            style.textContent = `
        :root {
          /* Variables CSS disponibles globalement */
          --font-family-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          --color-surface-primary: ${theme === "dark" ? "#1e293b" : "#ffffff"};
          --color-text-primary: ${theme === "dark" ? "#f8fafc" : "#1e293b"};
          --spacing-sm: 8px;
          --spacing-md: 12px;
          --border-radius-md: 8px;
          --color-border-secondary: ${theme === "dark" ? "rgba(139, 92, 246, 0.2)" : "rgba(139, 92, 246, 0.3)"};
          --color-primary-500: #8b5cf6;
          --transition-duration-fast: 150ms;
          --transition-timing-ease: cubic-bezier(0.4, 0, 0.2, 1);
        }
      `
            document.head.appendChild(style)

            return `
        <div data-theme="${theme}" style="
          min-height: 100vh; 
          padding: 20px;
          background: ${theme === "dark" ? "linear-gradient(to br, #0f172a, #1e1b4b)" : "linear-gradient(to br, #f8fafc, #f0ebff)"};
          color: ${theme === "dark" ? "#f8fafc" : "#1e293b"};
        ">
          ${story()}
        </div>
      `
        },
    ],
}

export default preview