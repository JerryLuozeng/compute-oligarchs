import { useMemo, useState } from "react";
import { Activity, ArrowRight, Crosshair, Gauge, X } from "lucide-react";
import type { GameState } from "@/core/models/game-state";
import type { FactionId, InfrastructureRegionId } from "@/core/models/ids";
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
  const [regionId, setRegionId] = useState<InfrastructureRegionId>(
    gameState.infrastructureRegions[0]?.id ?? "region-01"
  );
  const otherFactions = useMemo(
    () => gameState.factions.filter((faction) => faction.id !== playerFactionId),
    [gameState.factions, playerFactionId]
  );
  const [factionId, setFactionId] = useState<FactionId>(otherFactions[0]?.id ?? "consortium");
  const definition = strategicActionDefinitions.find((candidate) => candidate.type === selectedType)
    ?? strategicActionDefinitions[0];
  const canExecute = actionState.pointsRemaining >= definition.cost;
  const currentRecords = actionState.history.filter((record) => record.turn === actionState.turn);
  const selectedRegion = gameState.infrastructureRegions.find((region) => region.id === regionId);
  const selectedFaction = gameState.factions.find((faction) => faction.id === factionId);

  const getTargetName = (type: StrategicActionType, targetId: InfrastructureRegionId | FactionId): string => {
    if (type === "negotiate") return getFactionProfile(targetId as FactionId).name;
    return gameState.infrastructureRegions.find((region) => region.id === targetId)?.name ?? targetId;
  };

  const execute = () => {
    onExecute(definition.target === "region"
      ? { type: selectedType as Exclude<StrategicActionType, "negotiate">, regionId }
      : { type: "negotiate", factionId });
  };

  return (
    <div className="event-overlay" role="presentation">
      <section className="strategic-actions-dialog" role="dialog" aria-modal="true" aria-labelledby="strategic-actions-title">
        <header className="strategic-actions-dialog__header">
          <span><Crosshair /> GOVERNANCE DESK</span>
          <strong><Gauge /> 治理额度 {actionState.pointsRemaining}</strong>
          <button type="button" onClick={onClose} aria-label="暂时关闭治理面板"><X /></button>
        </header>

        <div className="strategic-actions-dialog__intro">
          <p>本期治理部署</p>
          <h2 id="strategic-actions-title">安排治理措施</h2>
          <span>每项措施都会改变世界，也会留下新的压力。未使用的治理额度可以放弃。</span>
        </div>

        <div className="strategic-actions-dialog__layout">
          <div className="strategic-actions-dialog__list" role="radiogroup" aria-label="可用行动">
            <h3>选择治理措施</h3>
            {strategicActionDefinitions.map((action) => (
              <button
                type="button"
                role="radio"
                aria-checked={selectedType === action.type}
                className={selectedType === action.type ? "is-selected" : ""}
                onClick={() => setSelectedType(action.type)}
                key={action.type}
              >
                <span>占用 {action.cost} 点额度</span>
                <strong>{action.name}</strong>
                <small>{action.description}</small>
              </button>
            ))}
          </div>

          <div className="strategic-actions-dialog__detail">
            <h3>目标与代价</h3>
            <p className="strategic-actions-dialog__tradeoff"><Activity /> {definition.tradeoff}</p>
            <label>
              <span>{definition.target === "region" ? "目标基础设施区域" : "协商对象"}</span>
              {definition.target === "region" ? (
                <select value={regionId} onChange={(event) => setRegionId(event.target.value as InfrastructureRegionId)}>
                  {gameState.infrastructureRegions.map((region) => (
                    <option value={region.id} key={region.id}>{region.name}</option>
                  ))}
                </select>
              ) : (
                <select value={factionId} onChange={(event) => setFactionId(event.target.value as FactionId)}>
                  {otherFactions.map((faction) => (
                    <option value={faction.id} key={faction.id}>{getFactionProfile(faction.id).name}</option>
                  ))}
                </select>
              )}
            </label>
            {definition.target === "region" && selectedRegion !== undefined ? (
              <dl className="strategic-actions-dialog__target" aria-label={`${selectedRegion.name}当前状态`}>
                <div><dt>算力容量</dt><dd>{selectedRegion.computeCapacity.toFixed(1)}</dd></div>
                <div><dt>发电 / 负荷</dt><dd>{selectedRegion.powerGeneration.toFixed(1)} / {selectedRegion.powerDemand.toFixed(1)}</dd></div>
                <div><dt>稳定度</dt><dd>{selectedRegion.stability.toFixed(1)}</dd></div>
                <div><dt>模型漂移</dt><dd>{selectedRegion.modelDrift.toFixed(1)}</dd></div>
              </dl>
            ) : selectedFaction === undefined ? null : (
              <dl className="strategic-actions-dialog__target" aria-label={`${getFactionProfile(selectedFaction.id).name}当前资源`}>
                <div><dt>算力</dt><dd>{selectedFaction.resources.compute.toFixed(1)}</dd></div>
                <div><dt>数据</dt><dd>{selectedFaction.resources.data.toFixed(1)}</dd></div>
                <div><dt>稳定度</dt><dd>{selectedFaction.resources.stability.toFixed(1)}</dd></div>
              </dl>
            )}
            <button className="strategic-actions-dialog__execute" type="button" disabled={!canExecute} onClick={execute}>
              {canExecute ? `部署：${definition.name}` : "治理额度不足"} <ArrowRight />
            </button>
            <div className="strategic-actions-dialog__feedback" aria-live="polite">
              {feedback || "等待治理部署。没有任何方案是免费的。"}
            </div>
            <div className="strategic-actions-dialog__history">
              <span>本期治理记录</span>
              {currentRecords.length === 0 ? <p>尚未部署措施</p> : currentRecords.map((record) => (
                <p key={record.id}>
                  <strong>{strategicActionDefinitions.find((action) => action.type === record.type)?.name ?? record.type}</strong>
                  <span>{getTargetName(record.type, record.targetId)}</span>
                </p>
              ))}
            </div>
          </div>
        </div>

        <footer>
          <span>结束后将结算社会反馈与动态事件。</span>
          <button type="button" onClick={onFinish}>完成本期治理</button>
        </footer>
      </section>
    </div>
  );
}
