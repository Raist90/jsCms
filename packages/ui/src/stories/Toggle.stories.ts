import type { Meta, StoryObj } from "@storybook/vue3";

import Toggle from "../components/Toggle.vue";

type ToggleProps = InstanceType<typeof Toggle>["$props"];
const meta = {
  title: "Components/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  argTypes: {
    description: {
      control: "text",
    },
    label: {
      control: "text",
    },
    disabled: {
      control: "boolean",
    },
    modelValue: {
      control: "boolean",
    },
  },
  args: {
    description: "This is a description",
    label: "Label",
    disabled: false,
    modelValue: false,
  },
} satisfies Meta<ToggleProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { Toggle },
    setup() {
      return { args };
    },
    template: `<Toggle v-bind="args" />`,
  }),
};
