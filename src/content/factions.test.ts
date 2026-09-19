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

const expectedNames = [
  "天穹财阀",
  "联邦管委会",
  "星火劳工团",
  "棱镜开源社",
  "赤衡共同体"
] as const;

describe("factionProfiles", () => {
  it("provides one complete profile for every playable faction", () => {
    expect(factionProfiles.map((profile) => profile.id)).toEqual(expectedIds);

    for (const profile of factionProfiles) {
      expect(profile.summary.length).toBeGreaterThan(0);
      expect(profile.strengths.length).toBeGreaterThanOrEqual(3);
      expect(profile.weaknesses).toHaveLength(3);
    }

    expect(factionProfiles.map((profile) => profile.name)).toEqual(expectedNames);
  });

  it("resolves profiles by their core faction id", () => {
    expect(getFactionProfile("labor_union").name).toBe("星火劳工团");
  });
});
