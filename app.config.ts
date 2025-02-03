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
        error: "border border-red-500 text-gray-900",
      },
    },
    notifications: {
      position: "bottom-0 start-0",
    },
    table: {
      td: {
        base: "text-white border border-gray-700",
      },
      tr: {
        selected: "", // This is the only way I could find to reset the class styles
        base: "border border-gray-700",
      },
      th: {
        base: "text-white font-bold uppercase",
      },
      thead: "border border-b-none border-gray-700",
    },
    toggle: {
      inactive: "bg-gray-400",
    },
  },
});
