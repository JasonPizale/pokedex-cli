import { describe, it, expect, afterEach, vi } from "vitest";
import { Cache } from "./pokecache.js";

describe("Cache", () => {
  it("stores and retrieves values", () => {
    const cache = new Cache(1000);

    cache.add("test-key", "hello");

    const result = cache.get<string>("test-key");

    expect(result).toBe("hello");
  });
});

describe("Cache reaping", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("removes entries after interval and stops cleanly", async () => {
    const cache = new Cache(50);

    cache.add("temp", "value");

    await new Promise((r) => setTimeout(r, 120));

    const result = cache.get("temp");

    expect(result).toBeUndefined();

    cache.stopReapLoop(); // important cleanup so test runner doesn't hang
  });
});