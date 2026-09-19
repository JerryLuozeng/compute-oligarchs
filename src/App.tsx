import { useEffect, useState } from "react";
import type { GameState } from "@/core/models/game-state";
import type { FactionId } from "@/core/models/ids";
import { FactionSelect } from "@/ui/faction-select";
import { GameDashboard } from "@/ui/game-dashboard";
import { StartScreen } from "@/ui/start-screen";
import type { SavedGame } from "@/ui/save-slots";

type AppView = "start" | "faction-select" | "game";

function App() {
  const [view, setView] = useState<AppView>("start");
  const [selectedFactionId, setSelectedFactionId] = useState<FactionId | null>(null);
  const [loadedGameState, setLoadedGameState] = useState<GameState | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [view]);

  const enterGame = (factionId: FactionId) => {
    setSelectedFactionId(factionId);
    setLoadedGameState(null);
    setView("game");
  };

  const loadGame = (savedGame: SavedGame) => {
    setSelectedFactionId(savedGame.selectedFactionId);
    setLoadedGameState(savedGame.gameState);
    setView("game");
  };

  if (view === "start") {
    return <StartScreen onLoad={loadGame} onStart={() => setView("faction-select")} />;
  }

  if (view === "faction-select") {
    return (
      <FactionSelect
        onBack={() => setView("start")}
        onConfirm={enterGame}
      />
    );
  }

  if (selectedFactionId === null) {
    return <FactionSelect onBack={() => setView("start")} onConfirm={enterGame} />;
  }

  return (
    <GameDashboard
      key={selectedFactionId}
      initialState={loadedGameState ?? undefined}
      selectedFactionId={selectedFactionId}
      onChangeFaction={() => setView("faction-select")}
      onReturnToMenu={() => {
        setSelectedFactionId(null);
        setLoadedGameState(null);
        setView("start");
      }}
    />
  );
}

export default App;
