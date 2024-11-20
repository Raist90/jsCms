import type { Document } from "~/types";
type ComputeRange<
  N extends number,
  Result extends Array<unknown> = [],
> = Result["length"] extends N
  ? Result
  : ComputeRange<N, [...Result, Result["length"]]>;

type FetchOptions = {
  documentName: Document["name"];
  limit?: ComputeRange<21>[number];
  formatter?: (data: any) => Partial<typeof data> | undefined;
};

async function fetch(options: FetchOptions) {
  const { data } = await useFetch("/api/documentJson", {
    method: "POST",
    body: {
      documentName: options.documentName,
      limit: options.limit,
    },
    transform: (data) =>
      data?.result
        .map((d) => (options.formatter ? options.formatter(d) : d))
        .filter((d) => Boolean(d)),
  });

  if (options.limit === 1) return { result: data.value?.[0] };
  else return { result: data.value?.length ? data.value : undefined };
}

export const cmsClient = {
  fetch,
};
