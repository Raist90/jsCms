import { fn } from "@storybook/test";
import type { Meta, StoryObj } from "@storybook/vue3";

import Toast from "../components/Toast.vue";

type ToastProps = InstanceType<typeof Toast>["$props"];
const meta = {
  title: "Components/Toast",
  component: Toast,
  tags: ["autodocs"],
  argTypes: {
    isOpen: {
      control: { type: "boolean" },
    },
    message: {
      control: { type: "text" },
    },
  },
  args: {
    isOpen: false,
    message: "Toast content goes here",
    onClose: fn(),
    msTimeout: 2000,
  },
} satisfies Meta<ToastProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { Toast },
    setup() {
      return { args };
    },
    template: `<Toast v-bind="args" />`,
  }),
};
