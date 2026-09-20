import { describe, expect, it } from "vitest";
import { decodeRegionId, getInfrastructureRegionId, infrastructureRoutes, mapRegionNumbers } from "./world-region-map-model";

describe("world region map", () => {
  it("decodes the exact RGB region identifier", () => {
    expect(decodeRegionId(30, 0, 0)).toBe(30);
    expect(decodeRegionId(1, 2, 3)).toBe(197121);
  });

  it("maps every mask region to one infrastructure region", () => {
    expect(mapRegionNumbers.map(getInfrastructureRegionId)).toEqual(
      Array.from({ length: 30 }, (_, index) => `region-${String(index + 1).padStart(2, "0")}`)
    );
  });

  it("keeps infrastructure routes within the map", () => {
    expect(infrastructureRoutes.flat().every((regionNumber) => (
      regionNumber >= 1 && regionNumber <= 30
    ))).toBe(true);
  });

  it("ignores water and invalid region identifiers", () => {
    expect(getInfrastructureRegionId(0)).toBeUndefined();
    expect(getInfrastructureRegionId(31)).toBeUndefined();
    expect(getInfrastructureRegionId(1.5)).toBeUndefined();
  });
});
