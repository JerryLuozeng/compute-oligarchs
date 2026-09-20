import { useState, type ReactNode } from "react";
import {
  Activity,
  BookOpen,
  ChevronRight,
  Crosshair,
  Cpu,
  Database,
  FolderClock,
  House,
  Info,
  Lightbulb,
  MessageSquareQuote,
  Radio,
  ShieldCheck,
  TriangleAlert,
  Users
} from "lucide-react";
import { initialGameState } from "@/core/models/initial-state";
import type { Faction } from "@/core/models/faction";
import type { GameState } from "@/core/models/game-state";
import type { FactionId } from "@/core/models/ids";
import { tick } from "@/core/systems/tick";
import {
  beginStrategicActionPhase,
  executeStrategicAction,
  finishStrategicActionPhase,
  type StrategicAction
} from "@/core/systems/strategic-actions";
import {
  createEventDecisionState,
  findTriggeredEvent,
  recordEventDecision,
  type RuntimeGameEvent,
  type RuntimeGameEventOption
} from "@/content/event-runtime";
import { findTriggeredDynamicCrisis } from "@/content/dynamic-crises";
import { evaluateEnding, evaluateNarrativeEnding, type EndingResult } from "@/content/endings";
import { createChapterSettlement, type ChapterSettlement } from "@/content/chapter-settlements";
import { getFactionProfile } from "@/content/factions";
import { applyFactionArcChange, factionRoutes } from "@/content/faction-routes";
import {
  getFactionAdvisors,
  getStoryPerspective
} from "@/content/faction-story";
import {
  createAdvisorBriefings,
  resolveAdvisorDecision
} from "@/content/advisor-system";
import {
  advanceStoryChapter,
  findNextStoryEvent,
  getStoryChapter,
  isStoryComplete,
  recordStoryChoice,
  type StoryChoice,
  type StoryEvent
} from "@/content/story-events";
import {
  applyPolicyChoice,
  getPolicyChoiceNotice,
  getPolicyLegacyEcho
} from "@/content/policy-legacies";
import { strategicActionFeedback } from "@/content/strategic-actions";
import {
  settleInterestPressures,
  type InterestSettlement
} from "@/content/interest-pressure";
import {
  beginLampChapter,
  recordLampAllocation,
  type LampAllocation
} from "@/content/lamps";
import { Button } from "./button";
import { ChapterSettlementDialog } from "./chapter-settlement-dialog";
import { EndingDialog } from "./ending-dialog";
import { EventDialog } from "./event-dialog";
import { LampAllocationDialog, LampStatusBoard } from "./lamp-allocation";
import { MapTiles } from "./map-tiles";
import { SaveGameDialog } from "./home-panels";
import {
  createGameSession,
  readSaveSlots,
  writeSaveSlot,
  type GameSession,
  type SaveSlot
} from "./save-slots";
import { StoryDialog } from "./story-dialog";
import { StrategicActionsDialog } from "./strategic-actions-dialog";
import { SocialFeedbackDialog } from "./social-feedback-dialog";
import { getTimeCoordinate } from "./time-flow";
import { TutorialOverlay } from "./tutorial-overlay";
import { isTutorialComplete, markTutorialComplete } from "./tutorial-storage";
import "./game-dashboard.css";

const factionTone: Record<Faction["id"], string> = {
  consortium: "faction-card--lime",
  sovereign: "faction-card--orange",
  labor_union: "faction-card--cyan",
  independent_labs: "faction-card--pink",
  socialist_power: "faction-card--lime"
};

const resourceBar = (value: number): number => Math.min(100, Math.max(0, value));

function ResourceLine({
  icon,
  label,
  value,
  tone
}: {
  icon: ReactNode;
  label: string;
  value: number;
  tone: string;
}) {
  return (
    <div className="resource-line">
      <div className="resource-line__label">
        <span className={tone}>{icon}</span>
        <span>{label}</span>
        <strong>{value.toFixed(1)}</strong>
      </div>
      <div className="resource-line__track" aria-hidden="true">
        <span className={tone} style={{ width: `${resourceBar(value)}%` }} />
      </div>
    </div>
  );
}

function FactionCard({ faction, index }: { faction: Faction; index: number }) {
  const tone = factionTone[faction.id];
  const displayName = getFactionProfile(faction.id).name;

  return (
    <article className={`faction-card ${tone}`} data-testid="faction-card">
      <header className="faction-card__header">
        <span className="faction-card__index">0{index + 1}</span>
        <span className="faction-card__signal" aria-hidden="true" />
        <span className="faction-card__id">{faction.id.replaceAll("_", " ")}</span>
      </header>
      <h2>{displayName}</h2>
      <div className="faction-card__resources">
        <ResourceLine icon={<Cpu />} label="算力" value={faction.resources.compute} tone="tone-compute" />
        <ResourceLine icon={<Database />} label="数据" value={faction.resources.data} tone="tone-data" />
        <ResourceLine icon={<ShieldCheck />} label="稳定度" value={faction.resources.stability} tone="tone-stability" />
      </div>
    </article>
  );
}

export function GameDashboard({
  initialSession,
  selectedFactionId,
  onChangeFaction,
  onReturnToMenu
}: {
  initialSession?: GameSession;
  selectedFactionId: FactionId;
  onChangeFaction: () => void;
  onReturnToMenu: () => void;
}) {
  const startingSession = initialSession ?? createGameSession(initialGameState, selectedFactionId);
  const [gameState, setGameState] = useState<GameState>(startingSession.gameState);
  const [glitchEnabled, setGlitchEnabled] = useState(true);
  const [activeEvent, setActiveEvent] = useState<RuntimeGameEvent | null>(null);
  const [resolvedEventIds, setResolvedEventIds] = useState<ReadonlySet<string>>(
    () => new Set(startingSession.resolvedEventIds)
  );
  const [eventDecisionState, setEventDecisionState] = useState(startingSession.eventDecisionState);
  const [ending, setEnding] = useState<EndingResult | null>(null);
  const [tutorialOpen, setTutorialOpen] = useState(
    () => initialSession === undefined && !isTutorialComplete(window.localStorage)
  );
  const [lampState, setLampState] = useState(startingSession.lampState);
  const [lampOpen, setLampOpen] = useState(
    () => startingSession.lampState.allocationCount === 0 && isTutorialComplete(window.localStorage)
  );
  const [arcState, setArcState] = useState(startingSession.arcState);
  const [advisorTrust, setAdvisorTrust] = useState(startingSession.advisorTrust);
  const [advisorRelationshipState, setAdvisorRelationshipState] = useState(startingSession.advisorRelationshipState);
  const [storyProgress, setStoryProgress] = useState(startingSession.storyProgress);
  const [policyLegacyState, setPolicyLegacyState] = useState(startingSession.policyLegacyState);
  const [strategicActionState, setStrategicActionState] = useState(startingSession.strategicActionState);
  const [strategicActionsOpen, setStrategicActionsOpen] = useState(
    startingSession.strategicActionState.status === "active"
  );
  const [strategicActionStatus, setStrategicActionStatus] = useState("");
  const [interestPressureState, setInterestPressureState] = useState(startingSession.interestPressureState);
  const [socialFeedback, setSocialFeedback] = useState<InterestSettlement | null>(null);
  const [activeStory, setActiveStory] = useState<StoryEvent | null>(null);
  const [storyChoice, setStoryChoice] = useState<StoryChoice | null>(null);
  const [settlement, setSettlement] = useState<ChapterSettlement | null>(null);
  const [saveSlots, setSaveSlots] = useState<readonly SaveSlot[] | null>(null);
  const [saveStatus, setSaveStatus] = useState("");
  const selectedFaction = gameState.factions.find((faction) => faction.id === selectedFactionId);
  const selectedProfile = getFactionProfile(selectedFactionId);
  const selectedRoute = factionRoutes[selectedFactionId];
  const storyComplete = isStoryComplete(storyProgress, lampState, selectedFactionId, gameState);
  const pendingStory = findNextStoryEvent(storyProgress, lampState, selectedFactionId, gameState);
  const factionAdvisors = getFactionAdvisors(selectedFactionId);
  const currentTime = getTimeCoordinate(gameState.turn);
  const nextTime = getTimeCoordinate(gameState.turn + 1);
  const timeAdvanceBlocked = activeEvent !== null
    || activeStory !== null
    || ending !== null
    || settlement !== null
    || socialFeedback !== null
    || strategicActionState.status === "active"
    || lampState.chapterAllocationCount === 0;

  const queueChapterSettlement = (state: GameState) => {
    if (!isStoryComplete(storyProgress, lampState, selectedFactionId, state)
      && findNextStoryEvent(storyProgress, lampState, selectedFactionId, state) === undefined) {
      setSettlement(createChapterSettlement(storyProgress.chapterIndex, lampState));
    }
  };

  const resolveTimeConsequences = (state: GameState) => {
    const nextEnding = evaluateEnding(state, selectedFactionId);
    const nextEvent = nextEnding === null
      ? findTriggeredDynamicCrisis({
          gameState: state,
          playerFactionId: selectedFactionId,
          pressureState: interestPressureState,
          actionState: strategicActionState,
          policyState: policyLegacyState,
          advisorTrust,
          advisorRelationships: advisorRelationshipState
        }, resolvedEventIds) ?? findTriggeredEvent(state, resolvedEventIds) ?? null
      : null;
    setEnding(nextEnding);
    setActiveEvent(nextEvent);
    if (nextEnding === null && nextEvent === null) queueChapterSettlement(state);
  };

  const beginActions = (turn: number) => {
    setStrategicActionState((current) => beginStrategicActionPhase(current, turn));
    setStrategicActionStatus("本季度有 3 个行动点。选择行动，或主动结束行动阶段。");
    setStrategicActionsOpen(true);
  };

  const advanceTime = () => {
    if (timeAdvanceBlocked) return;

    if (pendingStory === undefined && !storyComplete) {
      const nextProgress = advanceStoryChapter(storyProgress, lampState, selectedFactionId, gameState);
      if (nextProgress !== storyProgress) {
        setSettlement(createChapterSettlement(storyProgress.chapterIndex, lampState));
        return;
      }
    }

    const nextState = tick(gameState);
    const nextStory = findNextStoryEvent(storyProgress, lampState, selectedFactionId, nextState);
    setGameState(nextState);
    if (nextStory !== undefined) {
      setActiveStory(nextStory);
      setStoryChoice(null);
      return;
    }

    beginActions(nextState.turn);
  };

  const resolveEvent = (option: RuntimeGameEventOption) => {
    if (activeEvent === null) return;

    const nextState = option.effect(gameState);
    setGameState(nextState);
    setEventDecisionState((current) => recordEventDecision(current, activeEvent, option, gameState.turn));
    setResolvedEventIds((currentIds) => new Set(currentIds).add(activeEvent.id));
    setActiveEvent(null);
    const nextEnding = evaluateEnding(nextState, selectedFactionId);
    setEnding(nextEnding);
    if (nextEnding === null) queueChapterSettlement(nextState);
  };

  const restartGame = () => {
    const freshSession = createGameSession(initialGameState, selectedFactionId);
    setGameState(freshSession.gameState);
    setActiveEvent(null);
    setResolvedEventIds(new Set());
    setEventDecisionState(createEventDecisionState());
    setEnding(null);
    setLampState(freshSession.lampState);
    setArcState(freshSession.arcState);
    setAdvisorTrust(freshSession.advisorTrust);
    setAdvisorRelationshipState(freshSession.advisorRelationshipState);
    setStoryProgress(freshSession.storyProgress);
    setPolicyLegacyState(freshSession.policyLegacyState);
    setStrategicActionState(freshSession.strategicActionState);
    setStrategicActionsOpen(false);
    setStrategicActionStatus("");
    setInterestPressureState(freshSession.interestPressureState);
    setSocialFeedback(null);
    setActiveStory(null);
    setStoryChoice(null);
    setSettlement(null);
    setSaveSlots(null);
    setSaveStatus("");
    setLampOpen(true);
    window.scrollTo({ top: 0, left: 0 });
  };

  const currentSession = (): GameSession => ({
    gameState,
    lampState,
    arcState,
    advisorTrust,
    advisorRelationshipState,
    storyProgress,
    policyLegacyState,
    strategicActionState,
    interestPressureState,
    eventDecisionState,
    resolvedEventIds: [...resolvedEventIds]
  });

  const openSaveDialog = () => {
    setSaveSlots(readSaveSlots(window.localStorage));
    setSaveStatus("请选择一个档位。");
  };

  const saveToSlot = (slot: number) => {
    const saved = writeSaveSlot(
      window.localStorage,
      slot,
      selectedFactionId,
      currentSession()
    );
    setSaveStatus(saved === null ? "保存失败：无法写入本地档案。" : `档位 ${slot} 已保存。`);
    setSaveSlots(readSaveSlots(window.localStorage));
  };

  const dismissTutorial = () => {
    markTutorialComplete(window.localStorage);
    setTutorialOpen(false);
    if (lampState.allocationCount === 0) setLampOpen(true);
  };

  const confirmLampAllocation = (allocation: LampAllocation) => {
    setLampState((currentState) => recordLampAllocation(currentState, allocation));
    setLampOpen(false);
  };

  const chooseStory = (choice: StoryChoice) => {
    if (activeStory === null || storyChoice !== null) return;
    setStoryProgress((current) => recordStoryChoice(current, activeStory, choice.id));
    setArcState((current) => applyFactionArcChange(current, choice.arcChange ?? {}));
    const advisorDecision = resolveAdvisorDecision(
      advisorTrust,
      advisorRelationshipState,
      selectedFactionId,
      activeStory,
      choice,
      gameState.turn
    );
    setAdvisorTrust(advisorDecision.trust);
    setAdvisorRelationshipState(advisorDecision.relationships);
    setPolicyLegacyState((current) => applyPolicyChoice(current, activeStory.id, choice.id, gameState.turn));
    setStoryChoice(choice);
  };

  const continueStory = () => {
    if (activeStory === null || storyChoice === null) return;
    if (activeStory.id === "E41") {
      const narrativeEnding = evaluateNarrativeEnding(
        gameState,
        selectedFactionId,
        arcState,
        lampState,
        storyProgress,
        {
          policyState: policyLegacyState,
          actionState: strategicActionState,
          pressureState: interestPressureState,
          advisorTrust,
          advisorRelationships: advisorRelationshipState,
          eventDecisions: eventDecisionState,
          resolvedEventIds: [...resolvedEventIds]
        }
      );
      setActiveStory(null);
      setStoryChoice(null);
      setEnding(narrativeEnding);
      return;
    }

    setActiveStory(null);
    setStoryChoice(null);
    const nextEnding = evaluateEnding(gameState, selectedFactionId);
    if (nextEnding !== null) {
      setEnding(nextEnding);
      return;
    }
    beginActions(gameState.turn);
  };

  const executeAction = (action: StrategicAction) => {
    const result = executeStrategicAction(gameState, strategicActionState, selectedFactionId, action);
    if (result.error !== undefined) {
      const errors = {
        "phase-inactive": "行动阶段已经结束。",
        "insufficient-points": "剩余行动点不足。",
        "invalid-target": "当前目标不适用于这项行动。",
        "insufficient-resources": "当前资源不足，无法承担这项行动。"
      } as const;
      setStrategicActionStatus(errors[result.error]);
      return;
    }
    setGameState(result.gameState);
    setStrategicActionState(result.actionState);
    setStrategicActionStatus(strategicActionFeedback[action.type]);
  };

  const finishActions = () => {
    const completedActions = finishStrategicActionPhase(strategicActionState);
    const interestSettlement = settleInterestPressures(
      gameState,
      interestPressureState,
      lampState,
      strategicActionState,
      policyLegacyState
    );
    setStrategicActionState(completedActions);
    setGameState(interestSettlement.gameState);
    setInterestPressureState(interestSettlement.pressureState);
    setStrategicActionsOpen(false);
    setStrategicActionStatus("");
    setSocialFeedback(interestSettlement);
  };

  const continueSocialFeedback = () => {
    if (socialFeedback === null) return;
    const settledState = socialFeedback.gameState;
    setSocialFeedback(null);
    resolveTimeConsequences(settledState);
  };

  const continueSettlement = () => {
    if (settlement === null) return;
    setSettlement(null);
    setStoryProgress((current) => ({ ...current, chapterIndex: current.chapterIndex + 1 }));
    setLampState((current) => beginLampChapter(current));
    setLampOpen(true);
  };

  return (
    <main className={`dashboard-shell ${glitchEnabled ? "glitch-enabled" : ""}`}>
      <div className="dashboard-noise" aria-hidden="true" />
      <div className="dashboard-scanline" aria-hidden="true" />

      <header className="dashboard-header">
        <div className="brand-lockup">
          <div className="brand-mark" aria-hidden="true"><Radio /></div>
          <div>
            <p className="eyebrow">COMPUTE ERA / CE 41</p>
            <h1>算力寡头</h1>
          </div>
        </div>
        <div className="header-status">
          <span className="status-dot" aria-hidden="true" />
          <span>{selectedProfile.name} / 在线</span>
          <span className="header-divider" aria-hidden="true" />
          <button
            className="glitch-switch"
            type="button"
            aria-pressed={glitchEnabled}
            onClick={() => setGlitchEnabled((enabled) => !enabled)}
          >
            GLITCH {glitchEnabled ? "ON" : "OFF"}
          </button>
        </div>
      </header>

      <section className="dashboard-intro dashboard-intro--compact">
        <div>
          <p className="eyebrow eyebrow--alert"><Activity /> QUARTERLY STATE REPORT</p>
          <p className="story-chapter-label">{getStoryChapter(storyProgress)} / {selectedRoute.title}</p>
          <p className="turn-display" data-testid="turn-number">
            <span>时间坐标</span> {currentTime.compactLabel}
          </p>
          <h2 className="dashboard-title glitch-target">生产资料争夺战</h2>
          <p className="dashboard-subtitle">算力是社会化生产资料，数据是数字劳动的凝结。</p>
        </div>
        <div className="global-readout" data-tutorial="global-status">
          <div className="global-readout__warning"><TriangleAlert /> 模型漂移监测</div>
          <div className="global-readout__value">{gameState.globalModelDrift.toFixed(1)}</div>
          <div className="global-readout__meta">
            <span>全局稳定度</span>
            <strong>{gameState.globalStability.toFixed(1)}</strong>
          </div>
        </div>
      </section>

      <LampStatusBoard state={lampState} onOpen={() => setLampOpen(true)} />

      <section className="game-workspace" aria-label="主游戏工作区">
        <aside className="game-sidebar">
          <div className="player-faction" data-tutorial="faction-status">
            <p className="game-sidebar__label">CURRENT FACTION</p>
            <span className={`player-faction__code player-faction__code--${selectedProfile.tone}`}>{selectedProfile.code}</span>
            <h2>{selectedProfile.name}</h2>
            <p>{selectedProfile.mandate}</p>
            {selectedFaction === undefined ? null : (
              <div className="player-faction__resources">
                <span><Cpu />算力 <strong>{selectedFaction.resources.compute.toFixed(1)}</strong></span>
                <span><Database />数据 <strong>{selectedFaction.resources.data.toFixed(1)}</strong></span>
                <span><ShieldCheck />稳定 <strong>{selectedFaction.resources.stability.toFixed(1)}</strong></span>
              </div>
            )}
            <div className="player-faction__arc" aria-label="势力命脉与隐患">
              <div className="player-faction__arc-row">
                <span>命脉 / {selectedRoute.lifeline}</span>
                <strong>{arcState.lifeline.toFixed(0)}</strong>
                <i style={{ width: `${arcState.lifeline}%` }} aria-hidden="true" />
              </div>
              <div className="player-faction__arc-row player-faction__arc-row--hazard">
                <span>隐患 / {selectedRoute.liability}</span>
                <strong>{arcState.liability.toFixed(0)}</strong>
                <i style={{ width: `${arcState.liability}%` }} aria-hidden="true" />
              </div>
            </div>
            <div className="player-faction__advisors" aria-label="顾问信任">
              <span className="player-faction__advisors-title"><MessageSquareQuote /> 顾问信任</span>
              {factionAdvisors.map((advisor) => (
                <div className="player-faction__advisor" key={advisor.id}>
                  <span>{advisor.name}<small>{advisor.principle}</small></span>
                  <strong>{advisorTrust[advisor.id]}</strong>
                </div>
              ))}
            </div>
          </div>

          <nav className="game-actions" aria-label="游戏操作">
            <Button type="button" size="lg" onClick={advanceTime} disabled={timeAdvanceBlocked} data-testid="next-turn-button" data-tutorial="turn-control">
              推进至 {nextTime.compactLabel} <ChevronRight />
            </Button>
            <div className="game-time-status" aria-live="polite">
              <BookOpen />
              <span>{storyComplete ? "时间线已进入自由推演" : pendingStory === undefined ? "本章即将结算" : "下一季度将触发剧情"}</span>
              <strong>{storyComplete ? "∞" : pendingStory?.displayCode ?? pendingStory?.id ?? "章末"}</strong>
            </div>
            <button className="game-action game-action--active" type="button"><Info />态势总览</button>
            <button
              className="game-action"
              type="button"
              disabled={strategicActionState.status !== "active"}
              onClick={() => setStrategicActionsOpen(true)}
            >
              <Crosshair />主动行动
              <span>{strategicActionState.status === "active" ? `${strategicActionState.pointsRemaining} AP` : "待剧情"}</span>
            </button>
            <button className="game-action" type="button" onClick={() => setLampOpen(true)}><Lightbulb />点灯调度<span>{lampState.allocationCount > 0 ? "调整" : "必做"}</span></button>
            <button className="game-action" type="button" onClick={() => setTutorialOpen(true)}><BookOpen />新手引导<span>重开</span></button>
            <button className="game-action" type="button" onClick={openSaveDialog}><FolderClock />保存进度<span>六档</span></button>
            <button className="game-action" type="button" onClick={onChangeFaction}><Users />更换势力</button>
            <button className="game-action" type="button" onClick={onReturnToMenu}><House />返回主菜单</button>
          </nav>
        </aside>

        <div className="game-map-stage" data-tutorial="world-map">
          <MapTiles tiles={gameState.tiles} />
        </div>
      </section>

      <section className="faction-roster" data-tutorial="faction-roster">
        <div className="faction-roster__heading">
          <p className="eyebrow">FACTION RESOURCE MONITOR</p>
          <h2>全势力资源态势</h2>
        </div>
        <div className="faction-grid" aria-label="势力资源">
          {gameState.factions.map((faction, index) => (
            <FactionCard faction={faction} index={index} key={faction.id} />
          ))}
        </div>
      </section>

      <footer className="dashboard-footer">
        <p><span className="footer-pulse" aria-hidden="true" /> 数据持续消耗。世界持续变化。</p>
        <span>{currentTime.label} / 时间持续向前</span>
      </footer>

      {tutorialOpen ? <TutorialOverlay onDismiss={dismissTutorial} /> : null}
      {lampOpen ? (
        <LampAllocationDialog
          current={lampState.current}
          required={lampState.allocationCount === 0}
          onClose={() => setLampOpen(false)}
          onConfirm={confirmLampAllocation}
        />
      ) : null}
      {activeEvent === null ? null : <EventDialog event={activeEvent} onChoose={resolveEvent} />}
      {!strategicActionsOpen || strategicActionState.status !== "active" ? null : (
        <StrategicActionsDialog
          gameState={gameState}
          playerFactionId={selectedFactionId}
          actionState={strategicActionState}
          feedback={strategicActionStatus}
          onExecute={executeAction}
          onFinish={finishActions}
          onClose={() => setStrategicActionsOpen(false)}
        />
      )}
      {socialFeedback === null ? null : (
        <SocialFeedbackDialog feedback={socialFeedback.feedback} onContinue={continueSocialFeedback} />
      )}
      {saveSlots === null ? null : (
        <SaveGameDialog
          slots={saveSlots}
          status={saveStatus}
          onClose={() => setSaveSlots(null)}
          onSave={saveToSlot}
        />
      )}
      {settlement === null ? null : <ChapterSettlementDialog settlement={settlement} onContinue={continueSettlement} />}
      {activeStory === null ? null : (
        <StoryDialog
          event={activeStory}
          perspective={getStoryPerspective(activeStory, selectedFactionId)}
          selectedChoice={storyChoice}
          lifelineLabel={selectedRoute.lifeline}
          liabilityLabel={selectedRoute.liability}
          timeLabel={currentTime.label}
          legacyEcho={getPolicyLegacyEcho(policyLegacyState, activeStory.id)?.description}
          legacyNotice={storyChoice === null ? undefined : getPolicyChoiceNotice(activeStory.id, storyChoice.id)}
          advisorBriefings={createAdvisorBriefings(
            activeStory,
            selectedFactionId,
            advisorTrust,
            advisorRelationshipState,
            interestPressureState,
            gameState,
            policyLegacyState,
            strategicActionState
          )}
          onChoose={chooseStory}
          onContinue={continueStory}
        />
      )}
      {ending === null ? null : (
        <EndingDialog ending={ending} onReturnToMenu={onReturnToMenu} onRestart={restartGame} />
      )}
    </main>
  );
}
