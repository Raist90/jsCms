import { describe, expect, test } from "vitest";

import { capitalize } from "./capitalize";

describe("Capitalize utility function", async () => {
  test("Should capitalize the first letter of a string", async () => {
    expect(capitalize("hello")).toBe("Hello");
  });

  test("Should return an empty string when given an empty string", async () => {
    expect(capitalize("")).toBe("");
  });
});
