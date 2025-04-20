export async function useCmsConfig() {
  const { data: config } = useAsyncData(
    "schema",
    async () => await $fetch("/api/schema"),
  );

  const documentsDefinitions = computed(() => config.value?.schema.documents);

  const findDocumentDefinitionByType = (type: MaybeRef<string>) =>
    computed(() => {
      const unrefedType = unref(type);
      return documentsDefinitions.value?.find(
        (doc) => doc.name === unrefedType,
      );
    });

  return {
    config,
    documentsDefinitions,
    findDocumentDefinitionByType,
  };
}
