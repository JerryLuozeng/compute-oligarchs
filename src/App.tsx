import { useEffect, useState } from "react";
import type { FactionId } from "@/core/models/ids";
import { defaultIntroFlags, type IntroFlags } from "@/content/intro";
import { GameDashboard } from "@/ui/game-dashboard";
import { FactionManifest, IntroScreen } from "@/ui/intro-screen";
import { clearIntroProgress, readIntroProgress, writeIntroProgress, type IntroProgress } from "@/ui/intro-storage";
import { StartScreen } from "@/ui/start-screen";
import type { SavedGame } from "@/ui/save-slots";

type AppView = "start" | "intro-world" | "factions" | "faction-intro" | "ready" | "game";

function App() {
  const [view, setView] = useState<AppView>(() => {
    const progress = readIntroProgress(window.sessionStorage);
    return progress?.view ?? "start";
  });
  const [selectedFactionId, setSelectedFactionId] = useState<FactionId | null>(() => (
    readIntroProgress(window.sessionStorage)?.selectedFactionId ?? null
  ));
  const [loadedGame, setLoadedGame] = useState<SavedGame | null>(null);
  const [introFlags, setIntroFlags] = useState<IntroFlags>(() => (
    readIntroProgress(window.sessionStorage)?.flags ?? defaultIntroFlags
  ));
  const [introSceneIndex, setIntroSceneIndex] = useState(() => (
    readIntroProgress(window.sessionStorage)?.sceneIndex ?? 0
  ));

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [view]);

  const persistIntro = (nextView: IntroProgress["view"], nextSceneIndex = 0, nextFactionId = selectedFactionId, nextFlags = introFlags) => {
    writeIntroProgress(window.sessionStorage, {
      view: nextView,
      sceneIndex: nextSceneIndex,
      selectedFactionId: nextFactionId,
      flags: nextFlags
    });
  };

  const enterGame = (factionId: FactionId) => {
    setSelectedFactionId(factionId);
    setLoadedGame(null);
    persistIntro("faction-intro", 0, factionId);
    setIntroSceneIndex(0);
    setView("faction-intro");
  };

  const loadGame = (savedGame: SavedGame) => {
    setSelectedFactionId(savedGame.selectedFactionId);
    setLoadedGame(savedGame);
    setView("game");
  };

  if (view === "start") {
    return <StartScreen onLoad={loadGame} onStart={() => { setIntroFlags(defaultIntroFlags); setIntroSceneIndex(0); persistIntro("intro-world", 0, null, defaultIntroFlags); setView("intro-world"); }} />;
  }

  if (view === "intro-world") {
    return <IntroScreen mode="world" flags={introFlags} initialSceneIndex={introSceneIndex} onSceneChange={(index, flags) => { setIntroSceneIndex(index); setIntroFlags(flags); persistIntro("intro-world", index, null, flags); }} onBack={() => { clearIntroProgress(window.sessionStorage); setView("start"); }} onComplete={(flags) => { setIntroFlags(flags); setIntroSceneIndex(0); persistIntro("factions", 0, null, flags); setView("factions"); }} />;
  }

  if (view === "factions") {
    return (
      <FactionManifest onBack={() => { clearIntroProgress(window.sessionStorage); setView("start"); }} onSelect={(factionId) => enterGame(factionId)} />
    );
  }

  if (view === "faction-intro" && selectedFactionId !== null) {
    return <IntroScreen mode="faction-intro" factionId={selectedFactionId} flags={introFlags} initialSceneIndex={introSceneIndex} onSceneChange={(index, flags) => { setIntroSceneIndex(index); persistIntro("faction-intro", index, selectedFactionId, flags); }} onBack={() => { setIntroSceneIndex(0); persistIntro("factions", 0, null, introFlags); setView("factions"); }} onComplete={(flags) => { setIntroFlags(flags); setIntroSceneIndex(0); persistIntro("ready", 0, selectedFactionId, flags); setView("ready"); }} />;
  }

  if (view === "ready" && selectedFactionId !== null) {
    return <IntroScreen mode="ready" factionId={selectedFactionId} flags={introFlags} onBack={() => setView("faction-intro")} onComplete={(flags) => { setIntroFlags(flags); clearIntroProgress(window.sessionStorage); setView("game"); }} />;
  }

  if (selectedFactionId === null) {
    return <FactionManifest onBack={() => setView("start")} onSelect={enterGame} />;
  }

  return (
    <GameDashboard
      key={selectedFactionId}
      initialSession={loadedGame?.session}
      selectedFactionId={selectedFactionId}
      onReturnToMenu={() => {
        setSelectedFactionId(null);
        setLoadedGame(null);
        setView("start");
      }}
    />
  );
}

export default App;
