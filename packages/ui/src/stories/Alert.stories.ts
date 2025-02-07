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
  args: {},
} satisfies Meta<AlertProps>;

export default meta;
type Story = StoryObj<typeof meta>;

function renderAlert(args: AlertProps) {
  return () => ({
    components: { Alert },
    setup() {
      return { args };
    },
    template: `<Alert v-bind="args">This is an ${args.status} message</Alert>`,
  });
}

export const Error: Story = {
  args: {
    status: "error",
  },
  render: renderAlert({ status: "error" }),
};

export const Success: Story = {
  args: {
    status: "success",
  },
  render: renderAlert({ status: "success" }),
};

export const Warning: Story = {
  args: {
    status: "warning",
  },
  render: renderAlert({ status: "warning" }),
};

export const Info: Story = {
  args: {
    status: "info",
  },
  render: renderAlert({ status: "info" }),
};
