import { cmsClient } from "nexus/core";

export default defineEventHandler(async () => {
  const data = await cmsClient.fetch({
    documentName: "article",
    limit: 10,
  });

  return data;
});
