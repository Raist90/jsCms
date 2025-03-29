import type { Meta, StoryObj } from "@storybook/vue3";

import DocumentFormSkeleton from "../components/DocumentFormSkeleton.vue";

type DocumentFormSkeletonProps = InstanceType<
  typeof DocumentFormSkeleton
>["$props"];
const meta = {
  title: "Components/DocumentFormSkeleton",
  component: DocumentFormSkeleton,
  tags: ["autodocs"],
  argTypes: {
    // status: {
    //   control: "select",
    //   options: ["error", "success", "warning", "info"],
    // },
  },
  args: {
    // status: "info",
  },
} satisfies Meta<DocumentFormSkeletonProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { DocumentFormSkeleton },
    setup() {
      return { args };
    },
    template: `<DocumentFormSkeleton v-bind="args" />`,
  }),
};
