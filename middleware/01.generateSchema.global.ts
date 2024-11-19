import config from "~/cmsConfig";

export default defineNuxtRouteMiddleware(async () => {
  const nuxtApp = useNuxtApp();
  if (
    import.meta.client &&
    nuxtApp.isHydrating &&
    nuxtApp.payload.serverRendered
  )
    return;

  const { error } = await useFetch("/api/schema", {
    method: "POST",
    body: {
      schema: config.schema,
    },
  });

  if (error.value) {
    if (import.meta.dev)
      console.error(error.value, "Error while fetching schema");
    throw createError({ statusCode: 500 });
  }
});
