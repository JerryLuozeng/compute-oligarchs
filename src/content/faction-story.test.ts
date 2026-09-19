import { describe, expect, it } from "vitest";
import type { FactionId } from "@/core/models/ids";
import {
  advisors,
  applyAdvisorTrust,
  createAdvisorTrustState,
  factionStoryEvents,
  getFactionAdvisors,
  getFactionStoryEvents,
  getStoryPerspective
} from "./faction-story";

const factionIds: readonly FactionId[] = [
  "consortium", "sovereign", "labor_union", "independent_labs", "socialist_power"
];

describe("faction story routes", () => {
  it("provides three exclusive events and two advisors for every faction", () => {
    expect(factionStoryEvents).toHaveLength(15);
    expect(advisors).toHaveLength(10);
    expect(new Set(factionStoryEvents.map((event) => event.id)).size).toBe(15);

    for (const factionId of factionIds) {
      expect(getFactionStoryEvents(factionId)).toHaveLength(3);
      expect(getFactionAdvisors(factionId)).toHaveLength(2);
    }
  });

  it("keeps the prism P1 route distinct from the shared prologue", () => {
    const prismOpening = getFactionStoryEvents("independent_labs")[0];
    expect(prismOpening.id).toBe("PRISM-P1");
    expect(prismOpening.displayCode).toBe("P1");
    expect(prismOpening.description).toContain("巨额匿名捐款");
  });

  it("updates advisor trust immutably and caps it at 100", () => {
    const initial = createAdvisorTrustState();
    let changed = applyAdvisorTrust(initial, "marta");
    for (let index = 0; index < 12; index += 1) changed = applyAdvisorTrust(changed, "marta");

    expect(initial.marta).toBe(0);
    expect(changed.marta).toBe(100);
    expect(changed.tanya).toBe(0);
    expect(applyAdvisorTrust(changed, undefined)).toBe(changed);
  });

  it("frames exclusive and shared events from the selected faction perspective", () => {
    const exclusive = getFactionStoryEvents("sovereign")[0];
    const shared = { ...exclusive, factionId: undefined };

    expect(getStoryPerspective(exclusive, "sovereign")).toContain("内部抉择");
    expect(getStoryPerspective(shared, "labor_union")).toContain("一线数据工作者");
  });
});
