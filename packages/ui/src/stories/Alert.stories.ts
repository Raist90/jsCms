import type { Meta, StoryObj } from "@storybook/vue3";

import Alert from "../components/Alert.vue";

type AlertProps = InstanceType<typeof Alert>["$props"];
const meta = {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
  argTypes: {
    status: {
      control: "select",
      options: ["error", "success", "warning", "info"],
    },
  },
  args: {
    status: "info",
  },
} satisfies Meta<AlertProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { Alert },
    setup() {
      return { args };
    },
    template: `<Alert v-bind="args">This is an ${args.status} message</Alert>`,
  }),
};
