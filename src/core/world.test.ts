import { describe, expect, it } from "vitest";
import { COUNTDOWN_MONTHS, initialWorld } from "./world";

describe("world invariants", () => {
  it("keeps the singularity countdown fixed at eighteen months", () => {
    expect(COUNTDOWN_MONTHS).toBe(18);
    expect(initialWorld.countdownMonths).toBe(COUNTDOWN_MONTHS);
  });

  it("does not model a completed general-intelligence state", () => {
    expect(Object.keys(initialWorld)).not.toContain("agiAchieved");
  });
});
