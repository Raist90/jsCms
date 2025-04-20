export async function useCmsConfig() {
  const config = await $fetch("/api/schema");

  const documentsDefinitions = computed(() => config.schema.documents);

  const findDocumentDefinitionByType = (type: MaybeRef<string>) =>
    computed(() => {
      const unrefedType = unref(type);
      return documentsDefinitions.value.find((doc) => doc.name === unrefedType);
    });

  return {
    config,
    documentsDefinitions,
    findDocumentDefinitionByType,
  };
}
