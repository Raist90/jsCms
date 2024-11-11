import { registerEndpoint } from "@nuxt/test-utils/runtime";

export function registerInternalEndpoint<
  T extends Exclude<
    Parameters<typeof useFetch>[0],
    `/api/${string}/fallback | "/ping"`
  >,
>(
  url: T extends "" ? never : T,
  options: Parameters<typeof registerEndpoint>[1],
) {
  return registerEndpoint(url as string, options);
}
