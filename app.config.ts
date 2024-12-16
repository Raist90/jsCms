export default defineAppConfig({
  ui: {
    strategy: "merge",
    formGroup: {
      label: {
        base: "font-bold",
      },
    },
    input: {
      base: "border border-b-2 focus:ring-primary-500",
      color: {
        white: {
          outline: "shadow-none ring-0 border-gray-700 bg-gray-100",
        },
      },
      rounded: "rounded-none",
      variant: {
        error: "shadow-none ring-0 border-red-500 bg-gray-100",
      },
    },
    toggle: {
      inactive: "bg-gray-400",
    },
  },
});
