import { useState, type ReactNode } from "react";
import {
  Activity,
  BookOpen,
  ChevronRight,
  Cpu,
  Database,
  FolderClock,
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
  findTriggeredEvent,
  type RuntimeGameEvent,
  type RuntimeGameEventOption
} from "@/content/event-runtime";
import { evaluateEnding, type EndingResult } from "@/content/endings";
import { getFactionProfile } from "@/content/factions";
import { applyFactionArcChange, createFactionArcState, factionRoutes } from "@/content/faction-routes";
import {
  applyAdvisorTrust,
  createAdvisorTrustState,
  getFactionAdvisors,
  getStoryPerspective
} from "@/content/faction-story";
import {
  advanceStoryChapter,
  createStoryProgress,
  findNextStoryEvent,
  getStoryChapter,
  isStoryComplete,
  recordStoryChoice,
  type StoryChoice,
  type StoryEvent
} from "@/content/story-events";
import {
  beginLampChapter,
  createLampTendencyState,
  recordLampAllocation,
  type LampAllocation
} from "@/content/lamps";
import { Button } from "./button";
import { EndingDialog } from "./ending-dialog";
import { EventDialog } from "./event-dialog";
import { LampAllocationDialog, LampStatusBoard } from "./lamp-allocation";
import { MapTiles } from "./map-tiles";
import { StoryDialog } from "./story-dialog";
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
  initialState = initialGameState,
  selectedFactionId,
  onChangeFaction,
  onReturnToMenu
}: {
  initialState?: GameState;
  selectedFactionId: FactionId;
  onChangeFaction: () => void;
  onReturnToMenu: () => void;
}) {
  const [gameState, setGameState] = useState<GameState>(initialState);
  const [glitchEnabled, setGlitchEnabled] = useState(true);
  const [activeEvent, setActiveEvent] = useState<RuntimeGameEvent | null>(null);
  const [resolvedEventIds, setResolvedEventIds] = useState<ReadonlySet<string>>(() => new Set());
  const [ending, setEnding] = useState<EndingResult | null>(null);
  const [tutorialOpen, setTutorialOpen] = useState(() => !isTutorialComplete(window.localStorage));
  const [lampState, setLampState] = useState(createLampTendencyState);
  const [lampOpen, setLampOpen] = useState(() => isTutorialComplete(window.localStorage));
  const [arcState, setArcState] = useState(() => createFactionArcState(initialState, selectedFactionId));
  const [advisorTrust, setAdvisorTrust] = useState(createAdvisorTrustState);
  const [storyProgress, setStoryProgress] = useState(createStoryProgress);
  const [activeStory, setActiveStory] = useState<StoryEvent | null>(null);
  const [storyChoice, setStoryChoice] = useState<StoryChoice | null>(null);
  const selectedFaction = gameState.factions.find((faction) => faction.id === selectedFactionId);
  const selectedProfile = getFactionProfile(selectedFactionId);
  const selectedRoute = factionRoutes[selectedFactionId];
  const storyComplete = isStoryComplete(storyProgress, lampState, selectedFactionId, gameState);
  const pendingStory = findNextStoryEvent(storyProgress, lampState, selectedFactionId, gameState);
  const factionAdvisors = getFactionAdvisors(selectedFactionId);

  const advanceTurn = () => {
    if (activeEvent !== null || activeStory !== null || ending !== null || lampState.chapterAllocationCount === 0) return;

    const nextState = tick(gameState);
    const nextEnding = evaluateEnding(nextState, selectedFactionId);
    const nextEvent = nextEnding === null
      ? findTriggeredEvent(nextState, resolvedEventIds) ?? null
      : null;
    setGameState(nextState);
    setActiveEvent(nextEvent);
    setEnding(nextEnding);
  };

  const resolveEvent = (option: RuntimeGameEventOption) => {
    if (activeEvent === null) return;

    const nextState = option.effect(gameState);
    setGameState(nextState);
    setResolvedEventIds((currentIds) => new Set(currentIds).add(activeEvent.id));
    setActiveEvent(null);
    setEnding(evaluateEnding(nextState, selectedFactionId));
  };

  const restartGame = () => {
    setGameState(initialGameState);
    setActiveEvent(null);
    setResolvedEventIds(new Set());
    setEnding(null);
    setLampState(createLampTendencyState());
    setArcState(createFactionArcState(initialGameState, selectedFactionId));
    setAdvisorTrust(createAdvisorTrustState());
    setStoryProgress(createStoryProgress());
    setActiveStory(null);
    setStoryChoice(null);
    setLampOpen(true);
    window.scrollTo({ top: 0, left: 0 });
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

  const advanceStory = () => {
    if (activeEvent !== null || activeStory !== null || ending !== null || lampState.chapterAllocationCount === 0) return;
    if (pendingStory !== undefined) {
      setActiveStory(pendingStory);
      setStoryChoice(null);
      return;
    }

    const nextProgress = advanceStoryChapter(storyProgress, lampState, selectedFactionId, gameState);
    if (nextProgress !== storyProgress) {
      setStoryProgress(nextProgress);
      setLampState((current) => beginLampChapter(current));
      setLampOpen(true);
    }
  };

  const chooseStory = (choice: StoryChoice) => {
    if (activeStory === null || storyChoice !== null) return;
    setStoryProgress((current) => recordStoryChoice(current, activeStory, choice.id));
    setArcState((current) => applyFactionArcChange(current, choice.arcChange ?? {}));
    setAdvisorTrust((current) => applyAdvisorTrust(current, choice.advisorId));
    setStoryChoice(choice);
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
            <span>回合</span> {String(gameState.turn).padStart(2, "0")}
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
            <Button type="button" size="lg" onClick={advanceTurn} disabled={activeEvent !== null || activeStory !== null || ending !== null || lampState.chapterAllocationCount === 0} data-testid="next-turn-button" data-tutorial="turn-control">
              下一回合 <ChevronRight />
            </Button>
            <button className="game-action game-action--story" type="button" onClick={advanceStory} disabled={activeEvent !== null || activeStory !== null || ending !== null || lampState.chapterAllocationCount === 0 || storyComplete}>
              <BookOpen />{storyComplete ? "剧情已完结" : pendingStory === undefined ? "进入下一章" : "推进剧情"}
              <span>{storyComplete ? "终" : pendingStory?.displayCode ?? pendingStory?.id ?? "下一章"}</span>
            </button>
            <button className="game-action game-action--active" type="button"><Info />态势总览</button>
            <button className="game-action" type="button" onClick={() => setLampOpen(true)}><Lightbulb />点灯调度<span>{lampState.allocationCount > 0 ? "调整" : "必做"}</span></button>
            <button className="game-action" type="button" onClick={() => setTutorialOpen(true)}><BookOpen />新手引导<span>重开</span></button>
            <button className="game-action" type="button" disabled title="后续版本开放"><FolderClock />保存进度<span>待开放</span></button>
            <button className="game-action" type="button" onClick={onChangeFaction}><Users />更换势力</button>
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
        <span>回合 {String(gameState.turn).padStart(2, "0")} / 模拟持续运行</span>
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
      {activeStory === null ? null : (
        <StoryDialog
          event={activeStory}
          perspective={getStoryPerspective(activeStory, selectedFactionId)}
          selectedChoice={storyChoice}
          onChoose={chooseStory}
          onContinue={() => { setActiveStory(null); setStoryChoice(null); }}
        />
      )}
      {ending === null ? null : (
        <EndingDialog ending={ending} onReturnToMenu={onReturnToMenu} onRestart={restartGame} />
      )}
    </main>
  );
}
