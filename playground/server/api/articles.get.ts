import { cmsClient } from "nuxt-app/core";

export default defineEventHandler(async () => {
  const data = await cmsClient.fetch({
    documentName: "article",
    limit: 10,
  });

  return data;
});
