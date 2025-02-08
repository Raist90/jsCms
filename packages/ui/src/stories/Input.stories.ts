import type { Meta, StoryObj } from "@storybook/vue3";

import Input from "../components/Input.vue";

type InputProps = InstanceType<typeof Input>["$props"];
const meta = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    description: {
      control: "text",
    },
    disabled: {
      control: "boolean",
    },
    error: {
      control: "text",
    },
    label: {
      control: "text",
    },
    name: {
      control: "text",
    },
    required: {
      control: "boolean",
    },
    type: {
      control: "select",
      options: ["text"],
    },
    withButton: {
      control: "boolean",
    },
  },
  args: {
    description: "This is a description",
    disabled: false,
    label: "Label",
    name: "name",
    required: false,
    type: "text",
    withButton: false,
    error: undefined,
  },
} satisfies Meta<InputProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { Input },
    setup() {
      return { args };
    },
    template: `<Input v-bind="args" />`,
  }),
};

export const WithError: Story = {
  args: {
    description: "This is a description",
    disabled: false,
    label: "Label",
    name: "name",
    required: true,
    type: "text",
    withButton: false,
    error: "This in an error message",
  },

  render: (args) => ({
    components: {
      Input,
    },

    setup() {
      return { args };
    },

    template: `<Input v-bind="args" />`,
  }),
};
