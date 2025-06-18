import type {Preview} from "@storybook/web-components"
// ✅ IMPORT CRITIQUE - Vérifiez que ce chemin est correct
import "../src/tokens/design-tokens.css"

const preview: Preview = {
    parameters: {
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

            // ✅ SOLUTION : Injecter les variables CSS dans le document
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
