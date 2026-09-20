import { useEffect, useRef, useState, type MouseEvent, type PointerEvent, type WheelEvent } from "react";
import { LocateFixed, Minus, Move, Plus } from "lucide-react";
import type { InfrastructureRegion } from "@/core/models/infrastructure-region";
import type { FactionId, InfrastructureRegionId } from "@/core/models/ids";
import { decodeRegionId, getInfrastructureRegionId, infrastructureRoutes } from "./world-region-map-model";
import "./world-region-map.css";

const controllerColor: Record<FactionId, readonly [number, number, number]> = {
  consortium: [193, 164, 102],
  sovereign: [101, 121, 145],
  labor_union: [185, 176, 157],
  independent_labs: [136, 148, 123],
  socialist_power: [166, 83, 73]
};

interface MapView {
  scale: number;
  x: number;
  y: number;
}

interface Point {
  x: number;
  y: number;
}

interface WorldRegionMapProps {
  regions: readonly InfrastructureRegion[];
  selectedRegionId: InfrastructureRegionId;
  onSelectRegion: (regionId: InfrastructureRegionId) => void;
}

const clamp = (value: number, minimum: number, maximum: number): number =>
  Math.min(maximum, Math.max(minimum, value));

export function WorldRegionMap({ regions, selectedRegionId, onSelectRegion }: WorldRegionMapProps) {
  const displayCanvasRef = useRef<HTMLCanvasElement>(null);
  const hitCanvasRef = useRef<HTMLCanvasElement>(null);
  const dragStartRef = useRef<{ pointer: Point; view: MapView } | null>(null);
  const draggedRef = useRef(false);
  const [ready, setReady] = useState(false);
  const [view, setView] = useState<MapView>({ scale: 1, x: 0, y: 0 });

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
      const regionsById = new Map(regions.map((region) => [region.id, region]));
      const centers = new Map<number, { x: number; y: number; count: number }>();

      for (let index = 0; index < idPixels.data.length; index += 4) {
        const regionNumber = decodeRegionId(idPixels.data[index], idPixels.data[index + 1], idPixels.data[index + 2]);
        const regionId = getInfrastructureRegionId(regionNumber);
        if (regionId === undefined) continue;
        const region = regionsById.get(regionId);
        if (region === undefined) continue;

        const pixel = index / 4;
        const x = pixel % image.naturalWidth;
        const y = Math.floor(pixel / image.naturalWidth);
        const center = centers.get(regionNumber) ?? { x: 0, y: 0, count: 0 };
        center.x += x;
        center.y += y;
        center.count += 1;
        centers.set(regionNumber, center);

        const [red, green, blue] = controllerColor[region.controllingFaction];
        const grain = ((x * 7 + y * 11 + regionNumber * 13) % 17) - 8;
        overlay.data[index] = clamp(red + grain, 0, 255);
        overlay.data[index + 1] = clamp(green + grain, 0, 255);
        overlay.data[index + 2] = clamp(blue + grain, 0, 255);
        overlay.data[index + 3] = region.id === selectedRegionId ? 242 : 210;
      }

      displayContext.putImageData(overlay, 0, 0);
      const centerOf = (regionNumber: number): Point | undefined => {
        const center = centers.get(regionNumber);
        return center === undefined || center.count === 0
          ? undefined
          : { x: center.x / center.count, y: center.y / center.count };
      };

      displayContext.save();
      displayContext.lineWidth = 3;
      displayContext.strokeStyle = "rgba(229, 221, 200, 0.28)";
      displayContext.setLineDash([12, 10]);
      for (const [from, to] of infrastructureRoutes) {
        const start = centerOf(from);
        const end = centerOf(to);
        if (start === undefined || end === undefined) continue;
        displayContext.beginPath();
        displayContext.moveTo(start.x, start.y);
        displayContext.lineTo(end.x, end.y);
        displayContext.stroke();
      }
      displayContext.setLineDash([]);

      for (const region of regions) {
        const center = centerOf(region.regionNumber);
        if (center === undefined) continue;
        const powerBalance = region.powerGeneration - region.powerDemand;
        const radius = 7 + Math.min(11, region.computeCapacity * 0.75);
        displayContext.beginPath();
        displayContext.arc(center.x, center.y, radius, 0, Math.PI * 2);
        displayContext.fillStyle = powerBalance < 0 ? "#a65349" : "#f1ead7";
        displayContext.fill();
        displayContext.lineWidth = region.id === selectedRegionId ? 7 : 3;
        displayContext.strokeStyle = region.id === selectedRegionId ? "#252720" : "rgba(37, 39, 32, 0.8)";
        displayContext.stroke();
        displayContext.fillStyle = "#252720";
        displayContext.font = "700 16px Cascadia Mono";
        displayContext.textAlign = "center";
        displayContext.textBaseline = "middle";
        displayContext.fillText(String(region.regionNumber).padStart(2, "0"), center.x, center.y);
      }
      displayContext.restore();
      setReady(true);
    };
    image.onerror = () => setReady(false);
  }, [regions, selectedRegionId]);

  const updateScale = (nextScale: number, focus?: Point) => {
    setView((current) => {
      const scale = clamp(nextScale, 1, 3.5);
      if (scale === current.scale) return current;
      const point = focus ?? { x: 0, y: 0 };
      const ratio = scale / current.scale;
      return {
        scale,
        x: point.x - (point.x - current.x) * ratio,
        y: point.y - (point.y - current.y) * ratio
      };
    });
  };

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    const bounds = event.currentTarget.getBoundingClientRect();
    updateScale(view.scale + (event.deltaY < 0 ? 0.22 : -0.22), {
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top
    });
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    dragStartRef.current = { pointer: { x: event.clientX, y: event.clientY }, view };
    draggedRef.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const start = dragStartRef.current;
    if (start === null || view.scale === 1) return;
    const dx = event.clientX - start.pointer.x;
    const dy = event.clientY - start.pointer.y;
    if (Math.abs(dx) + Math.abs(dy) > 4) draggedRef.current = true;
    setView({ ...start.view, x: start.view.x + dx, y: start.view.y + dy });
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    dragStartRef.current = null;
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const selectRegion = (event: MouseEvent<HTMLCanvasElement>) => {
    if (draggedRef.current) return;
    const hitCanvas = hitCanvasRef.current;
    if (hitCanvas === null) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = Math.floor((event.clientX - bounds.left) * hitCanvas.width / bounds.width);
    const y = Math.floor((event.clientY - bounds.top) * hitCanvas.height / bounds.height);
    const context = hitCanvas.getContext("2d", { willReadFrequently: true });
    const pixel = context?.getImageData(x, y, 1, 1).data;
    if (pixel === undefined) return;
    const regionId = getInfrastructureRegionId(decodeRegionId(pixel[0], pixel[1], pixel[2]));
    if (regionId !== undefined) onSelectRegion(regionId);
  };

  return (
    <div className="world-region-map" aria-label="算力与电力基础设施版图">
      <div
        className={`world-region-map__viewport ${ready ? "world-region-map__viewport--ready" : ""} ${view.scale > 1 ? "is-zoomed" : ""}`}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <div
          className="world-region-map__content"
          style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})` }}
        >
          <img src="/assets/map/world-region-preview.png" alt="三十个基础设施区域组成的世界版图" />
          <canvas ref={displayCanvasRef} aria-label="点击区域读取基础设施档案" onClick={selectRegion} />
        </div>
        <canvas ref={hitCanvasRef} className="world-region-map__hit-layer" aria-hidden="true" />
        <div className="world-region-map__hint"><Move /> 滚轮缩放 · 拖拽平移</div>
        <div className="world-region-map__controls" aria-label="地图缩放">
          <button type="button" onClick={() => updateScale(view.scale + 0.25)} aria-label="放大地图"><Plus /></button>
          <span>{Math.round(view.scale * 100)}%</span>
          <button type="button" onClick={() => updateScale(view.scale - 0.25)} aria-label="缩小地图"><Minus /></button>
          <button type="button" onClick={() => setView({ scale: 1, x: 0, y: 0 })} aria-label="复位地图"><LocateFixed /></button>
        </div>
      </div>
      <div className="world-region-map__footer">
        <span>INFRASTRUCTURE THEATER / 30 REGIONS</span>
        <strong>实心节点表示算力设施 · 红色节点表示电力缺口</strong>
      </div>
    </div>
  );
}
