import { useMemo, useState } from "react";
import { Activity, ArrowRight, Crosshair, Gauge, X } from "lucide-react";
import type { GameState } from "@/core/models/game-state";
import type { FactionId, TileId } from "@/core/models/ids";
import type {
  StrategicAction,
  StrategicActionState,
  StrategicActionType
} from "@/core/systems/strategic-actions";
import { getFactionProfile } from "@/content/factions";
import { strategicActionDefinitions } from "@/content/strategic-actions";
import "./strategic-actions-dialog.css";

export function StrategicActionsDialog({
  gameState,
  playerFactionId,
  actionState,
  feedback,
  onExecute,
  onFinish,
  onClose
}: {
  gameState: GameState;
  playerFactionId: FactionId;
  actionState: StrategicActionState;
  feedback: string;
  onExecute: (action: StrategicAction) => void;
  onFinish: () => void;
  onClose: () => void;
}) {
  const [selectedType, setSelectedType] = useState<StrategicActionType>("investigate");
  const [tileId, setTileId] = useState<TileId>(gameState.tiles[0]?.id ?? "glass-tower");
  const otherFactions = useMemo(
    () => gameState.factions.filter((faction) => faction.id !== playerFactionId),
    [gameState.factions, playerFactionId]
  );
  const [factionId, setFactionId] = useState<FactionId>(otherFactions[0]?.id ?? "consortium");
  const definition = strategicActionDefinitions.find((candidate) => candidate.type === selectedType)
    ?? strategicActionDefinitions[0];
  const canExecute = actionState.pointsRemaining >= definition.cost;
  const currentRecords = actionState.history.filter((record) => record.turn === actionState.turn);

  const execute = () => {
    onExecute(definition.target === "tile"
      ? { type: selectedType as Exclude<StrategicActionType, "negotiate">, tileId }
      : { type: "negotiate", factionId });
  };

  return (
    <div className="event-overlay" role="presentation">
      <section className="strategic-actions-dialog" role="dialog" aria-modal="true" aria-labelledby="strategic-actions-title">
        <header className="strategic-actions-dialog__header">
          <span><Crosshair /> ACTIVE OPERATIONS</span>
          <strong><Gauge /> {actionState.pointsRemaining} AP</strong>
          <button type="button" onClick={onClose} aria-label="暂时关闭行动面板"><X /></button>
        </header>

        <div className="strategic-actions-dialog__intro">
          <p>季度行动阶段</p>
          <h2 id="strategic-actions-title">主动处理问题</h2>
          <span>行动会改变世界，也会留下压力。剩余行动点可以主动放弃。</span>
        </div>

        <div className="strategic-actions-dialog__layout">
          <div className="strategic-actions-dialog__list" role="radiogroup" aria-label="可用行动">
            {strategicActionDefinitions.map((action) => (
              <button
                type="button"
                role="radio"
                aria-checked={selectedType === action.type}
                className={selectedType === action.type ? "is-selected" : ""}
                onClick={() => setSelectedType(action.type)}
                key={action.type}
              >
                <span>{action.cost} AP</span>
                <strong>{action.name}</strong>
                <small>{action.description}</small>
              </button>
            ))}
          </div>

          <div className="strategic-actions-dialog__detail">
            <p className="strategic-actions-dialog__tradeoff"><Activity /> {definition.tradeoff}</p>
            <label>
              <span>{definition.target === "tile" ? "目标地区" : "协商对象"}</span>
              {definition.target === "tile" ? (
                <select value={tileId} onChange={(event) => setTileId(event.target.value as TileId)}>
                  {gameState.tiles.map((tile) => <option value={tile.id} key={tile.id}>{tile.name}</option>)}
                </select>
              ) : (
                <select value={factionId} onChange={(event) => setFactionId(event.target.value as FactionId)}>
                  {otherFactions.map((faction) => (
                    <option value={faction.id} key={faction.id}>{getFactionProfile(faction.id).name}</option>
                  ))}
                </select>
              )}
            </label>
            <button className="strategic-actions-dialog__execute" type="button" disabled={!canExecute} onClick={execute}>
              执行{definition.name} <ArrowRight />
            </button>
            <div className="strategic-actions-dialog__feedback" aria-live="polite">
              {feedback || "等待行动指令。没有任何方案是免费的。"}
            </div>
            <div className="strategic-actions-dialog__history">
              <span>本季度记录</span>
              {currentRecords.length === 0 ? <p>尚未执行行动</p> : currentRecords.map((record) => (
                <p key={record.id}>{record.type.toUpperCase()} / {record.targetId}</p>
              ))}
            </div>
          </div>
        </div>

        <footer>
          <span>结束后将结算社会反馈与动态事件。</span>
          <button type="button" onClick={onFinish}>结束行动阶段</button>
        </footer>
      </section>
    </div>
  );
}
