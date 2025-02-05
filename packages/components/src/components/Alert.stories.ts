import type { Meta, StoryObj } from "@storybook/vue3"

import Alert from "./Alert.vue"

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
  args: {
    // status: "info",
  },
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Error: Story = {
  args: {
    status: "error",
  },
  render: (args) => ({
    components: { Alert },
    setup() {
      return { args }
    },
    template: `<Alert v-bind="args">This is an error message</Alert>`,
  }),
}

export const Success: Story = {
  args: {
    status: "success",
  },
  render: (args) => ({
    components: { Alert },
    setup() {
      return { args }
    },
    template: `<Alert v-bind="args">This is a success message</Alert>`,
  }),
}

export const Warning: Story = {
  args: {
    status: "warning",
  },
  render: (args) => ({
    components: { Alert },
    setup() {
      return { args }
    },
    template: `<Alert v-bind="args">This is a warning message</Alert>`,
  }),
}

export const Info: Story = {
  args: {
    status: "info",
  },
  render: (args) => ({
    components: { Alert },
    setup() {
      return { args }
    },
    template: `<Alert v-bind="args">This is an info message</Alert>`,
  }),
}
