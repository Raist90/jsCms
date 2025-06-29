export async function useCmsConfig() {
  const { data: config } = useAsyncData(
    "schema",
    async () => await $fetch("/api/schema"),
  );

  const documentsDefinitions = computed(() => config.value?.schema.documents);

  const findDocumentDefinitionByType = (type: Ref<string>) =>
    computed(() =>
      documentsDefinitions.value?.find((doc) => doc.name === type.value),
    );

  return {
    config,
    documentsDefinitions,

    findDocumentDefinitionByType,
  };
}
