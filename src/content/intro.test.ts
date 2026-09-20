import { describe, expect, it } from "vitest";
import { factionIntroScenes, singularityChoice, worldIntroScenes } from "./intro";
import { factionProfiles } from "./factions";

describe("narrative intro content", () => {
  it("contains the complete world opening sequence", () => {
    expect(worldIntroScenes).toHaveLength(6);
    expect(worldIntroScenes.at(-1)?.text).toContain("下注");
  });

  it("provides three entry scenes for every playable faction", () => {
    for (const faction of factionProfiles) {
      expect(factionIntroScenes[faction.id].scenes).toHaveLength(3);
    }
  });

  it("offers the cross-faction singularity choice", () => {
    expect(singularityChoice.options.map((option) => option.id)).toEqual(["believer", "skeptic"]);
  });
});
