import type { Preview } from "@storybook/vue3";
import "../src/style.css";

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
