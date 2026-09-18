import { initialGameState } from "../models/initial-state";
import type { GameState } from "../models/game-state";
import { tick } from "./tick";

/** Minimal engine call example for command-line simulations and tests. */
export const exampleStateAfterOneTick: GameState = tick(initialGameState);
