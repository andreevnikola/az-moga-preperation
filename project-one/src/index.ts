import { Sign } from "./domain/board/board-item.js";
import { Board } from "./domain/board/index.js";
import { InputManager } from "./domain/input-manager/index.js";
import { coordsTransformer } from "./utils/input/transformers.js";
import { boardSizeValidator } from "./utils/input/validators.js";
import { Gameplay } from "./domain/gameplay/index.js";
import { GameplayService } from "./services/gameplay.js";
import { Rankings } from "./domain/rankings/index.js";

const inputManager = new InputManager();

export enum Player {
  player1 = "P1",
  player2 = "P2",
}

export enum Turn {
  P1 = Player.player1,
  P2 = Player.player2,
}

export const mustDoFields = [
  { sign: Sign.addition, value: Math.floor(Math.random() * 8) + 1 },
  { sign: Sign.subtraction, value: Math.floor(Math.random() * 8) + 1 },
  { sign: Sign.multiplication, value: 0 },
  { sign: Sign.multiplication, value: 2 },
];

async function main() {
  const rankings = new Rankings(); // Initialize Rankings

  while (true) { // Infinite loop for continuous gameplay
    const [width, height] = await inputManager.promptInput(
      "Enter the size of the board (width height)",
      {
        transformer: coordsTransformer,
        validator: boardSizeValidator,
      }
    );

    const board = new Board(width, height, mustDoFields);

    const gameplay = Gameplay.getInstance(board);

    const gameplayService: GameplayService = new GameplayService();

    while (!gameplay.isGameOver()) {
      gameplayService.frameOutput();
      const getInp = async () => await inputManager.promptInput(
        `${gameplay.getCurrentPlayer()}, enter your move (x y)`,
        {
          transformer: coordsTransformer,
        }
      );
      await gameplayService.frame(getInp);
    }

    const winner = gameplay.getWinner();
    const finalScores = gameplay.getScores();
    console.log(
      `Game over! The winner is ${winner}. Final scores: P1 - ${finalScores.P1}, P2 - ${finalScores.P2}`
    );

    // Update Rankings
    rankings.addWin(winner);
    rankings.printWins();

    // Reset the gameplay instance
    Gameplay.resetInstance();
  }
}

main();
