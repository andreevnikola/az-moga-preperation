import { Board } from "./domain/board/index.js";
import Gameplay from "./domain/gameplay/index.js";
import {
  InputManager,
  IValidationResult,
} from "./domain/input-manager/index.js";
import { Scoreboard } from "./domain/scoreboard/index.js";
import { GameplayService } from "./services/gameplay.js";
import {
  coordsTransformer,
  numberTransformer,
} from "./utils/input/transformers.js";
import { boardSizeValidator } from "./utils/input/validators.js";

export type Players = "P1" | "P2";

const inputManager = InputManager.getInstance();
const scoreboard = new Scoreboard();
async function main() {
  const [width, height] = await inputManager.promptInput(
    "Enter width and height",
    {
      transformer: coordsTransformer,
      validator: boardSizeValidator,
    }
  );

  const board = Board.getInstance(width, height);

  const gameplayService = GameplayService.getInstance();
  const gameplay = Gameplay.getInstance();

  gameplay.onGameEnd().then(async (winner) => {
    console.log("==================");
    console.log("Game has ended");
    console.log(`Winner is: ${winner}`);
    console.log("==================");

    scoreboard.updateScore(winner);
    scoreboard.printScores();

    gameplay.reset();
    gameplayService.reset();
    board.reset();

    await main();
  });

  for await (const _ of gameplay.onFrame()) {
    board.drawBoard();
    await gameplayService.runFrame(async () => {
      const [x, y] = await inputManager.promptInput(
        gameplay.currentPlayer +
          ", enter the position (x y) where you want to put the pull",
        {
          transformer: coordsTransformer,
        }
      );
      return { x, y };
    });
  }
}

main();
