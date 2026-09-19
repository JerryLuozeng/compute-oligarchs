import {
  ArrowRight,
  Clock3,
  HardDrive,
  RotateCcw,
  Volume2,
  VolumeX
} from "lucide-react";
import { aboutContent } from "@/content/about";
import { getFactionProfile } from "@/content/factions";
import type { SavedGame, SaveSlot } from "./save-slots";
import { HomeDialog } from "./home-dialog";

export function LoadGameDialog({
  slots,
  onClose,
  onLoad
}: {
  slots: readonly SaveSlot[];
  onClose: () => void;
  onLoad: (savedGame: SavedGame) => void;
}) {
  return (
    <HomeDialog code="ARCHIVE / 06 SLOTS" title="载入游戏" onClose={onClose}>
      <p className="home-dialog__intro">选择一个已有档案，恢复对应势力与世界状态。</p>
      <div className="save-slot-grid" aria-label="存档档位">
        {slots.map((slot) => {
          const save = slot.savedGame;
          const isReady = save !== null && slot.status === "ready";

          return (
            <button
              className={`save-slot save-slot--${slot.status}`}
              type="button"
              key={slot.index}
              disabled={!isReady}
              onClick={() => save !== null && onLoad(save)}
            >
              <span className="save-slot__number">SLOT {String(slot.index).padStart(2, "0")}</span>
              {save === null ? (
                <>
                  <HardDrive />
                  <strong>{slot.status === "invalid" ? "档案损坏" : "空档位"}</strong>
                  <small>{slot.status === "invalid" ? "数据校验未通过" : "NO DATA"}</small>
                </>
              ) : (
                <>
                  <strong>{getFactionProfile(save.selectedFactionId).name}</strong>
                  <span className="save-slot__meta"><Clock3 />回合 {save.session.gameState.turn}</span>
                  <small>{save.savedAt.slice(0, 16).replace("T", " ")} UTC</small>
                  <ArrowRight className="save-slot__arrow" />
                </>
              )}
            </button>
          );
        })}
      </div>
    </HomeDialog>
  );
}

export function SaveGameDialog({
  slots,
  status,
  onClose,
  onSave
}: {
  slots: readonly SaveSlot[];
  status: string;
  onClose: () => void;
  onSave: (slot: number) => void;
}) {
  return (
    <HomeDialog code="LOCAL ARCHIVE / WRITE" title="保存进度" onClose={onClose}>
      <p className="home-dialog__intro">选择一个档位写入当前完整进度。已有档案会被本次进度覆盖。</p>
      <div className="save-slot-grid" aria-label="保存档位">
        {slots.map((slot) => (
          <button
            className={`save-slot save-slot--write save-slot--${slot.status}`}
            type="button"
            key={slot.index}
            onClick={() => onSave(slot.index)}
          >
            <span className="save-slot__number">SLOT {String(slot.index).padStart(2, "0")}</span>
            <HardDrive />
            <strong>{slot.status === "ready" ? "覆盖档案" : "写入档案"}</strong>
            <small>
              {slot.savedGame === null
                ? slot.status === "invalid" ? "替换损坏档案" : "空档位"
                : `${getFactionProfile(slot.savedGame.selectedFactionId).name} / 回合 ${slot.savedGame.session.gameState.turn}`}
            </small>
          </button>
        ))}
      </div>
      <p className="save-dialog__status" role="status">{status}</p>
    </HomeDialog>
  );
}

export function SettingsDialog({
  soundEnabled,
  resetStatus,
  onClose,
  onResetGuide,
  onToggleSound
}: {
  soundEnabled: boolean;
  resetStatus: string;
  onClose: () => void;
  onResetGuide: () => void;
  onToggleSound: () => void;
}) {
  return (
    <HomeDialog code="LOCAL CONFIGURATION" title="游戏设置" onClose={onClose}>
      <p className="home-dialog__intro">设置仅保存在当前设备。更多选项将在后续版本开放。</p>
      <div className="settings-list">
        <div className="setting-row">
          <span className="setting-row__icon">{soundEnabled ? <Volume2 /> : <VolumeX />}</span>
          <div><strong>游戏音量</strong><small>音效与环境广播</small></div>
          <button className="setting-toggle" type="button" aria-pressed={soundEnabled} onClick={onToggleSound}>
            <span />{soundEnabled ? "开启" : "关闭"}
          </button>
        </div>
        <div className="setting-row">
          <span className="setting-row__icon"><RotateCcw /></span>
          <div><strong>新手引导记录</strong><small>{resetStatus}</small></div>
          <button className="setting-command" type="button" onClick={onResetGuide}>重置</button>
        </div>
      </div>
    </HomeDialog>
  );
}

export function AboutDialog({ onClose }: { onClose: () => void }) {
  return (
    <HomeDialog code={`BUILD ${aboutContent.version}`} title="关于我们" onClose={onClose}>
      <div className="about-lockup">
        <span>{aboutContent.subtitle}</span>
        <h3>《{aboutContent.title}》</h3>
        <p>{aboutContent.overview}</p>
      </div>
      <dl className="credit-list">
        {aboutContent.credits.map((credit) => (
          <div key={credit.role}>
            <dt>{credit.role}</dt>
            <dd>{credit.name}</dd>
          </div>
        ))}
      </dl>
      <p className="about-version">版本 {aboutContent.version} / 算力历 CE 41</p>
    </HomeDialog>
  );
}
