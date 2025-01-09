import { isString } from "@sindresorhus/is";
import type { DocumentJsonModel } from "~/types";

export { getDocumentName, useDocumentListByName };

function getDocumentName() {
  const { params } = useRoute();
  return isString(params.name) ? params.name : params.name?.[0] || null;
}

// This is not working with `watch` and `getCachedData` right now. Hence the workaround below
// https://github.com/nuxt/nuxt/issues/24332
function useDocumentListByName(documentName: Ref<string>) {
  const nuxtApp = useNuxtApp();
  const data = ref<DocumentJsonModel[] | null>(null);

  watchEffect(async () => {
    // Check cache first
    const cached = nuxtApp.isHydrating
      ? nuxtApp.payload.data[documentName.value]
      : nuxtApp.static.data[documentName.value];

    if (cached) {
      data.value = cached;
      return;
    }

    // Fetch if not cached
    const fetchedData = await $fetch<DocumentJsonModel[]>(
      `/api/document/data/name/${documentName.value}`,
      {
        cache: "no-cache",
        method: "GET",
      },
    );

    // Update cache
    if (nuxtApp.isHydrating) {
      nuxtApp.payload.data[documentName.value] = fetchedData;
    } else {
      nuxtApp.static.data[documentName.value] = fetchedData;
    }

    data.value = fetchedData;
  });

  return computed(() => data.value);
}
