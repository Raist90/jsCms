import { invalidDocumentMock, validDocumentMock } from "./documents";

export const mocks = {
  documents: {
    valid: validDocumentMock,
    withFormDataMismatch: invalidDocumentMock,
  },
};
