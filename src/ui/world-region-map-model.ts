import { infrastructureRegionIds, type InfrastructureRegionId } from "@/core/models/ids";

export const mapRegionNumbers = Array.from({ length: 30 }, (_, index) => index + 1);

export const infrastructureRoutes: readonly (readonly [number, number])[] = [
  [3, 4], [4, 7], [7, 8], [8, 12],
  [1, 2], [1, 11], [9, 11], [11, 15], [15, 17], [17, 21], [21, 27], [27, 28],
  [5, 10], [5, 16], [10, 18], [18, 22], [22, 26], [26, 30],
  [13, 20], [20, 23], [23, 24], [24, 29],
  [6, 14], [14, 19], [19, 25],
  [2, 30], [6, 28], [13, 15], [19, 20], [22, 27]
];

export function getInfrastructureRegionId(regionNumber: number): InfrastructureRegionId | undefined {
  if (!Number.isInteger(regionNumber) || regionNumber < 1 || regionNumber > infrastructureRegionIds.length) {
    return undefined;
  }
  return infrastructureRegionIds[regionNumber - 1];
}

export function decodeRegionId(red: number, green: number, blue: number): number {
  return red + (green << 8) + (blue << 16);
}
