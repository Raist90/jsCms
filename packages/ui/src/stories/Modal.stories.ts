import type { Meta, StoryObj } from "@storybook/vue3";
import Modal from "../components/Modal.vue";
import Button from "../components/Button.vue";

type ModalProps = InstanceType<typeof Modal>["$props"];
const meta: Meta<ModalProps> = {
  title: "Components/Modal",
  component: Modal,
  tags: ["autodocs"],
  argTypes: {
    isOpen: {
      control: { type: "boolean" },
    },
    title: {
      control: { type: "text" },
    },
  },
  args: {
    isOpen: false,
    title: "Modal title",
    fullscreen: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { Modal, Button },
    setup() {
      return { args };
    },
    template: `
      <Modal @close="args.isOpen = false" v-bind="args">
        <template #content>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</template>
        <template #cta>
          <Button @click="args.isOpen = false">Call to action</Button>
        </template>
      </Modal>
    `,
  }),
};
