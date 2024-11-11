import { describe, test, expect } from "vitest";
import { addDocumentTables } from "./addDocumentTables";
import { documentMock } from "~/tests/mocks";

describe("Document tables generator", async () => {
  test("It should correctly create a new table", async () => {
    expect(addDocumentTables(documentMock)).toBeTruthy();
  });
});
