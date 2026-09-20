import { useEffect, useRef, useState, type MouseEvent } from "react";
import type { TileId } from "@/core/models/ids";
import type { Tile } from "@/core/models/tile";
import { decodeRegionId, getTileIdForRegion } from "./world-region-map-model";
import "./world-region-map.css";

const controllerColor: Record<Tile["controllingFaction"], readonly [number, number, number]> = {
  consortium: [169, 180, 123],
  sovereign: [183, 122, 104],
  labor_union: [125, 165, 170],
  independent_labs: [168, 135, 156],
  socialist_power: [181, 104, 104],
  commons: [128, 133, 126],
  none: [89, 82, 76]
};

interface WorldRegionMapProps {
  tiles: readonly Tile[];
  selectedTileId: TileId;
  onSelectTile: (tileId: TileId) => void;
}

export function WorldRegionMap({ tiles, selectedTileId, onSelectTile }: WorldRegionMapProps) {
  const displayCanvasRef = useRef<HTMLCanvasElement>(null);
  const hitCanvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = "/assets/map/world-region-id.png";
    image.onload = () => {
      const displayCanvas = displayCanvasRef.current;
      const hitCanvas = hitCanvasRef.current;
      if (displayCanvas === null || hitCanvas === null) return;

      displayCanvas.width = image.naturalWidth;
      displayCanvas.height = image.naturalHeight;
      hitCanvas.width = image.naturalWidth;
      hitCanvas.height = image.naturalHeight;

      const hitContext = hitCanvas.getContext("2d", { willReadFrequently: true });
      const displayContext = displayCanvas.getContext("2d");
      if (hitContext === null || displayContext === null) return;

      hitContext.drawImage(image, 0, 0);
      const idPixels = hitContext.getImageData(0, 0, image.naturalWidth, image.naturalHeight);
      const overlay = displayContext.createImageData(image.naturalWidth, image.naturalHeight);
      const tilesById = new Map(tiles.map((tile) => [tile.id, tile]));

      for (let index = 0; index < idPixels.data.length; index += 4) {
        const regionId = decodeRegionId(idPixels.data[index], idPixels.data[index + 1], idPixels.data[index + 2]);
        const tileId = getTileIdForRegion(regionId);
        if (tileId === undefined) continue;

        const tile = tilesById.get(tileId);
        if (tile === undefined) continue;
        const [red, green, blue] = controllerColor[tile.controllingFaction];
        overlay.data[index] = red;
        overlay.data[index + 1] = green;
        overlay.data[index + 2] = blue;
        overlay.data[index + 3] = tileId === selectedTileId ? 215 : 128;
      }

      displayContext.putImageData(overlay, 0, 0);
      setReady(true);
    };
    image.onerror = () => setReady(false);
  }, [selectedTileId, tiles]);

  const selectRegion = (event: MouseEvent<HTMLCanvasElement>) => {
    const hitCanvas = hitCanvasRef.current;
    if (hitCanvas === null) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = Math.floor((event.clientX - bounds.left) * hitCanvas.width / bounds.width);
    const y = Math.floor((event.clientY - bounds.top) * hitCanvas.height / bounds.height);
    const context = hitCanvas.getContext("2d", { willReadFrequently: true });
    const pixel = context?.getImageData(x, y, 1, 1).data;
    if (pixel === undefined) return;

    const tileId = getTileIdForRegion(decodeRegionId(pixel[0], pixel[1], pixel[2]));
    if (tileId !== undefined) onSelectTile(tileId);
  };

  return (
    <div className="world-region-map" aria-label="世界区域地图">
      <div className={`world-region-map__viewport ${ready ? "world-region-map__viewport--ready" : ""}`}>
        <img src="/assets/map/world-region-preview.png" alt="由三十个战略区域组成的世界地图" />
        <canvas
          ref={displayCanvasRef}
          aria-label="点击区域查看所属生产节点"
          onClick={selectRegion}
        />
        <canvas ref={hitCanvasRef} className="world-region-map__hit-layer" aria-hidden="true" />
      </div>
      <div className="world-region-map__footer">
        <span>REGIONAL NETWORK / 30</span>
        <strong>点击地区读取运行档案</strong>
      </div>
    </div>
  );
}
