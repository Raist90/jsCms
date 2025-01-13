export default defineAppConfig({
  ui: {
    primary: "blue",
    gray: "stone",
    strategy: "merge",
    button: {
      rounded: "rounded-none",
    },
    formGroup: {
      label: {
        base: "text-base font-bold text-white",
      },
      description: "text-gray-300",
    },
    input: {
      base: "border focus:ring-primary-500",
      color: {
        white: {
          outline: "shadow-none ring-0 text-base",
        },
      },
      rounded: "rounded-none",
      variant: {
        error: "shadow-none ring-0 border-red-500 bg-gray-100",
      },
    },
    notifications: {
      position: "bottom-0 start-0",
    },
    toggle: {
      inactive: "bg-gray-400",
    },
  },
});
