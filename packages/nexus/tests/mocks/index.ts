import {
  invalidDocumentMock,
  invalidDocumentWithNestedObject,
  validDocumentMock,
  validDocumentWithNestedObject,
} from "./documents";

export const mocks = {
  documents: {
    valid: validDocumentMock,
    withFormDataMismatch: invalidDocumentMock,
    validWithNestedObject: validDocumentWithNestedObject,
    invalidWithNestedObject: invalidDocumentWithNestedObject,
  },
};
