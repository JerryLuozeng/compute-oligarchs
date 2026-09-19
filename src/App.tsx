import { useEffect, useState } from "react";
import type { FactionId } from "@/core/models/ids";
import { FactionSelect } from "@/ui/faction-select";
import { GameDashboard } from "@/ui/game-dashboard";
import { StartScreen } from "@/ui/start-screen";

type AppView = "start" | "faction-select" | "game";

function App() {
  const [view, setView] = useState<AppView>("start");
  const [selectedFactionId, setSelectedFactionId] = useState<FactionId | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [view]);

  const enterGame = (factionId: FactionId) => {
    setSelectedFactionId(factionId);
    setView("game");
  };

  if (view === "start") {
    return <StartScreen onStart={() => setView("faction-select")} />;
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
      selectedFactionId={selectedFactionId}
      onChangeFaction={() => setView("faction-select")}
      onReturnToMenu={() => {
        setSelectedFactionId(null);
        setView("start");
      }}
    />
  );
}

export default App;
