import { isString } from "@sindresorhus/is";

export function getRouteParam() {
  let routeParam: string | undefined;
  const { params } = useRoute();
  if (isString(params.name)) routeParam = params.name;
  else if (Array.isArray(routeParam)) routeParam = params.name[0];
  else routeParam = undefined;
  return routeParam;
}
