import { describe, expect, it } from "vitest";
import type { FactionId } from "@/core/models/ids";
import { factionProfiles, getFactionProfile } from "./factions";

const expectedIds: readonly FactionId[] = [
  "consortium",
  "sovereign",
  "labor_union",
  "independent_labs",
  "socialist_power"
];

describe("factionProfiles", () => {
  it("provides one complete profile for every playable faction", () => {
    expect(factionProfiles.map((profile) => profile.id)).toEqual(expectedIds);

    for (const profile of factionProfiles) {
      expect(profile.summary.length).toBeGreaterThan(0);
      expect(profile.strengths.length).toBeGreaterThan(0);
      expect(profile.weaknesses.length).toBeGreaterThan(0);
    }
  });

  it("resolves profiles by their core faction id", () => {
    expect(getFactionProfile("labor_union").name).toBe("数据劳工联合体");
  });
});
