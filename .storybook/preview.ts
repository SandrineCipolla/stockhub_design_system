import type { Preview } from '@storybook/web-components'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

export const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
      viewport: {
          viewports: INITIAL_VIEWPORTS,
      },
  },
    decorators: [
        (Story) => `<div style="padding: 20px;">${Story()}</div>`,
    ],

};
