import type { Meta, StoryObj } from "@storybook/vue3";

import Button from "../components/Button.vue";

type ButtonProps = InstanceType<typeof Button>["$props"];
const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
    },
    extended: {
      control: "boolean",
    },
    type: {
      control: "select",
      options: ["button", "submit", "reset"],
    },
    variant: {
      control: "select",
      options: ["primary", "secondary", "danger", "warning"],
    },
  },
  args: {
    disabled: false,
    extended: false,
    type: "button",
    variant: "primary",
  },
} satisfies Meta<ButtonProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: `<Button v-bind="args">This is a message</Button>`,
  }),
};
