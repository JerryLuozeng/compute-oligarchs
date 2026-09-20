import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Radio, TriangleAlert } from "lucide-react";
import type { FactionId } from "@/core/models/ids";
import { factionProfiles, getFactionProfile } from "@/content/factions";
import { factionRoutes } from "@/content/faction-routes";
import { factionIntroScenes, singularityChoice, worldIntroScenes, type IntroFlags, type IntroScene } from "@/content/intro";
import { Button } from "./button";
import "./intro-screen.css";

export function IntroScreen({
  mode,
  factionId,
  flags,
  initialSceneIndex = 0,
  onSceneChange,
  onBack,
  onComplete
}: {
  mode: "world" | "faction-intro" | "ready";
  factionId?: FactionId;
  flags: IntroFlags;
  initialSceneIndex?: number;
  onSceneChange?: (sceneIndex: number, flags: IntroFlags) => void;
  onBack: () => void;
  onComplete: (flags: IntroFlags) => void;
}) {
  const scenes = useMemo<readonly IntroScene[]>(() => factionId === undefined ? [] : factionIntroScenes[factionId].scenes, [factionId]);
  const [sceneIndex, setSceneIndex] = useState(initialSceneIndex);
  const [localFlags, setLocalFlags] = useState(flags);
  const scene = mode === "world" ? undefined : scenes[sceneIndex];
  const activeWorldScene = worldIntroScenes[sceneIndex];

  useEffect(() => { setSceneIndex(initialSceneIndex); }, [mode, factionId, initialSceneIndex]);

  if (mode === "ready" && factionId !== undefined) {
    const profile = getFactionProfile(factionId);
    return <main className={`intro-screen intro-screen--ready intro-screen--${profile.tone}`}><div className="intro-screen__noise" aria-hidden="true" />
      <header className="intro-header"><span><Radio /> READY / {profile.code}</span><span>CE 41 / Q1</span></header>
      <section className="intro-ready"><p className="intro-eyebrow"><TriangleAlert /> 初始确认</p><h1>第一季度即将开始</h1><p>你已选择{profile.name}。现在初始化治理权限，正式进入时间线。Intro 阶段不会触发资源结算或事件。</p><div className="intro-ready__ledger"><strong>{profile.name}</strong><span>{factionRoutes[factionId].theme}</span><small>奇点立场：{localFlags.singularityBelief === "believer" ? "相信它会来" : "暂不相信它"}</small></div><Button size="lg" onClick={() => onComplete(localFlags)}>初始化并进入主游戏 <ArrowRight /></Button></section>
    </main>;
  }

  const current = mode === "world" ? activeWorldScene : scene;
  if (current === undefined) return null;
  const next = () => {
    if (mode === "world" && sceneIndex === worldIntroScenes.length - 1) { onComplete(localFlags); return; }
    if (mode === "faction-intro" && sceneIndex === scenes.length - 1) { onComplete(localFlags); return; }
    const nextIndex = sceneIndex + 1;
    setSceneIndex(nextIndex);
    onSceneChange?.(nextIndex, localFlags);
  };
  return <main className={`intro-screen intro-screen--${mode}`}><div className="intro-screen__noise" aria-hidden="true" />
    <header className="intro-header"><button type="button" onClick={onBack} aria-label="返回"><ArrowLeft /></button><span><Radio /> {mode === "world" ? "INTRO / THE WORLD" : `FACTION INTRO / ${factionId ?? ""}`}</span><span>{String(sceneIndex + 1).padStart(2, "0")} / {String(mode === "world" ? worldIntroScenes.length : scenes.length).padStart(2, "0")}</span></header>
    <section className="intro-scene"><p className="intro-eyebrow">{current.location}</p><div className="intro-scene__visual" aria-hidden="true"><span>{current.id.toUpperCase()}</span><i /><b /></div>{current.speaker ? <strong className="intro-scene__speaker">{current.speaker}</strong> : null}<p className="intro-scene__text">{current.text}</p>
      {mode === "world" && sceneIndex === worldIntroScenes.length - 1 ? <div className="intro-choice"><p>{singularityChoice.prompt}</p>{singularityChoice.options.map((option) => <button className={localFlags.singularityBelief === option.id ? "is-selected" : ""} key={option.id} type="button" onClick={() => { const nextFlags = { singularityBelief: option.id }; setLocalFlags(nextFlags); onSceneChange?.(sceneIndex, nextFlags); }}><span>{option.id === "believer" ? "A" : "B"}</span>{option.text}{localFlags.singularityBelief === option.id ? <Check /> : null}</button>)}</div> : null}
      <Button size="lg" onClick={next}>{mode === "world" && sceneIndex === worldIntroScenes.length - 1 ? "进入五方世界" : mode === "faction-intro" && sceneIndex === scenes.length - 1 ? "继续" : "下一幕"} <ArrowRight /></Button>
    </section>
  </main>;
}

export function FactionManifest({ onSelect, onBack }: { onSelect: (id: FactionId) => void; onBack: () => void }) {
  return <main className="intro-screen intro-screen--factions"><div className="intro-screen__noise" aria-hidden="true" /><section className="intro-factions"><div className="intro-factions__top"><button type="button" onClick={onBack} aria-label="返回标题页"><ArrowLeft /> 返回</button><span>CE 41 / FACTIONS</span></div><p className="intro-eyebrow">INTRO / FIVE POWERS</p><h1>五种赌注</h1><p>没有一方能够独自拥有未来。选择你愿意承担的那一种代价。</p><div className="intro-factions__grid">{factionProfiles.map((faction) => <button type="button" key={faction.id} className={`intro-faction intro-faction--${faction.tone}`} onClick={() => onSelect(faction.id)}><span>{faction.code}</span><strong>{faction.name}</strong><em>{faction.id === "consortium" ? "让效率说话，让算力兑现每一份承诺——只是承诺给谁，由我们决定。" : faction.id === "sovereign" ? "没有一个国家能独自谈判，我们联合起来，才有资格坐上桌。" : faction.id === "labor_union" ? "我们生产了这个时代最贵的原料——数据。是时候问一句，成果归谁。" : faction.id === "independent_labs" ? "知识不该被锁进保险柜，哪怕这意味着我们要为它的滥用负责。" : "把算力修成水电，让发展的成果流到每一盏灯下，哪怕慢一点。"}</em><small>{faction.mandate}</small><i>进入此方</i></button>)}</div></section></main>;
}
