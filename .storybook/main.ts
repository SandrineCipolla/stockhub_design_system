import type {StorybookConfig} from "@storybook/web-components-vite"

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y", // ← AJOUTER pour l'accessibilité
    "@storybook/addon-design-tokens", // ← AJOUTER pour les tokens (optionnel)
  ],
  framework: {
    name: "@storybook/web-components-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
}

export default config