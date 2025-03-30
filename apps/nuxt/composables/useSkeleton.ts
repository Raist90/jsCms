import { useNetwork } from "@vueuse/core";

export function useSkeleton(status?: ReturnType<typeof useFetch>["status"]) {
  const shouldRenderSkeleton = computed(
    () =>
      !!(useNetwork().effectiveType.value !== "4g") &&
      !!(status?.value === "pending"),
  );

  return { shouldRenderSkeleton };
}
