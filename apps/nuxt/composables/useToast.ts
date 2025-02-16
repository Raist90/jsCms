import type { UIToast } from "#components";

type ToastProps = InstanceType<typeof UIToast>["$props"];

export function useToast() {
  const toastInitialState: ToastProps = {
    isOpen: false,
    message: "",
  };
  const notification = useState<ToastProps>(
    "notification",
    () => toastInitialState,
  );

  // Methods
  async function add(toast: ToastProps) {
    if (notification.value !== toastInitialState) clear();
    await nextTick();

    notification.value = toast;
  }

  function clear() {
    notification.value = toastInitialState;
  }

  return {
    toastInitialState,
    add,
    clear,
  };
}
