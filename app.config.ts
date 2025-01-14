export default defineAppConfig({
  ui: {
    primary: "blue",
    gray: "stone",
    strategy: "merge",
    button: {
      rounded: "rounded-none",
    },
    buttonGroup: {
      rounded: "rounded-none",
    },
    formGroup: {
      label: {
        base: "text-base font-bold text-white",
      },
      description: "text-gray-300",
    },
    input: {
      rounded: "rounded-none",
      variant: {
        error: "border border-red-500",
      },
    },
    notifications: {
      position: "bottom-0 start-0",
    },
    table: {
      td: {
        base: "text-white",
      },
      tr: {
        selected: "bg-primary",
      },
      th: {
        base: "text-white",
      },
    },
    toggle: {
      inactive: "bg-gray-400",
    },
  },
});
