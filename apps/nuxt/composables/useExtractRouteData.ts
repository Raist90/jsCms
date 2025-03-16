import { isString } from "@sindresorhus/is";
import type { useRoute } from "#app";

export function useExtractRouteData(route: ReturnType<typeof useRoute>) {
  const currentDocumentName = computed(() => {
    const { params } = route;
    if (isString(params.name)) return params.name;
    return "";
  });

  const currentPageId = computed(() => {
    const { params } = route;
    if (isString(params.id)) return params.id;
    return "";
  });

  const currentPath = computed(() => route.path);

  return {
    currentDocumentName,
    currentPageId,
    currentPath,
  };
}
