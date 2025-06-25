import "../src/style.css";

import type { Preview } from "@storybook/vue3";

const preview: Preview = {
  parameters: {
    backgrounds: {
      values: [{ name: "Default", value: "#18181b" }],
      default: "Default",
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
