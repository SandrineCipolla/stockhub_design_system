import type {StorybookConfig} from "@storybook/web-components-vite"

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y"
    // Retirez cette ligne si l'addon n'est pas installé
    // "@storybook/addon-design-tokens"
  ],
  framework: {
    name: "@storybook/web-components-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  }
  // Retirez cette ligne si les répertoires n'existent pas
  // staticDirs: ['../public', '../src/assets'],
}

export default config