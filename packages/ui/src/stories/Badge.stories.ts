import type { Meta, StoryObj } from "@storybook/vue3";

import Badge from "../components/Badge.vue";

type BadgeProps = InstanceType<typeof Badge>["$props"];
const meta = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    solid: {
      control: "boolean",
    },
    status: {
      control: "select",
      options: ["error", "success", "warning", "info"],
    },
  },
  args: {
    solid: true,
    status: "info",
  },
} satisfies Meta<BadgeProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { Badge },
    setup() {
      return { args };
    },
    template: `<Badge v-bind="args">This is an ${args.status} message</Badge>`,
  }),
};
