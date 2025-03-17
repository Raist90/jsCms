import config from "@/cmsConfig";

export function useCmsConfig() {
  const documentsDefinitions = computed(() => config.schema.documents);

  const findDocumentDefinitionByType = (type: MaybeRef<string>) =>
    computed(() => {
      const unrefedType = unref(type);
      return documentsDefinitions.value.find((doc) => doc.name === unrefedType);
    });

  return {
    documentsDefinitions,
    findDocumentDefinitionByType,
  };
}
