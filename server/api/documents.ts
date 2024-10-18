import cmsConfig from "~/cmsConfig";

export default defineEventHandler(() => {
  const documents = {
    toJSON() {
      return cmsConfig.schema.documents;
    },
  };
  return documents;
});
