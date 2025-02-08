import type { Meta, StoryObj } from "@storybook/vue3";

import Link from "../components/Link.vue";

type LinkProps = InstanceType<typeof Link>["$props"];
const meta = {
  title: "Components/Link",
  component: Link,
  tags: ["autodocs"],
  argTypes: {
    to: {
      control: "text",
    },
    disabled: {
      control: "boolean",
    },
    active: {
      control: "boolean",
    },
    activeClass: {
      control: "text",
    },
  },
  args: {
    to: "/",
    disabled: false,
    active: false,
    activeClass: "text-blue-500",
  },
} satisfies Meta<LinkProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { Link },
    setup() {
      return { args };
    },
    template: `<Link v-bind="args">This is a link</Link>`,
  }),
};
