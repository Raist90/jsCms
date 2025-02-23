import type { Meta, StoryObj } from "@storybook/vue3";

import InputListWrapper from "../components/InputListWrapper.vue";

type InputListWrapperProps = InstanceType<typeof InputListWrapper>["$props"];
const meta = {
  title: "Components/InputListWrapper",
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
    },
    description: {
      control: "text",
    },
    of: {
      control: "select",
      options: ["string"],
    },
    min: {
      control: "number",
    },
    max: {
      control: "number",
    },
  },
  args: {
    of: "string",
    min: 2,
    max: 4,
    label: "Label",
    description: "This is a description",
    modelValue: [],
  },
} satisfies Meta<InputListWrapperProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { InputListWrapper },
    setup() {
      return { args };
    },
    template: `<InputListWrapper v-bind="args" />`,
  }),
};
