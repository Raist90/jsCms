import { isString } from "@sindresorhus/is";

export { getDocumentId, getDocumentName };

function getDocumentId() {
  const { params } = useRoute();
  if (isString(params.id)) return params.id;
  return;
}

function getDocumentName() {
  const { params } = useRoute();
  return isString(params.name) ? params.name : params.name?.[0];
}
