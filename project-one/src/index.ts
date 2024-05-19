import { Board } from "./domain/board/index.js";
import { InputManager } from "./domain/input-manager/index.js";
import { coordsTransformer } from "./utils/input/transformers.js";
import { boardSizeValidator } from "./utils/input/validators.js";
import { Gameplay } from "./domain/gameplay/index.js";

const inputManager = new InputManager();

export enum Player {
  player1 = "P1",
  player2 = "P2",
}

export enum Turn {
  P1 = Player.player1,
  P2 = Player.player2,
}

async function main() {
  const [width, height] = await inputManager.promptInput(
    "Enter the size of the board (width height)",
    {
      transformer: coordsTransformer,
      validator: boardSizeValidator,
    }
  );

  const board = new Board(width, height);
  const gameplay = Gameplay.getInstance(board);

  while (!gameplay.isGameOver()) {
    const currentPlayer = gameplay.getCurrentPlayer();
    board.print();
    const scores = gameplay.getScores();
    console.log(`Scores: P1 - ${scores.P1}, P2 - ${scores.P2}`);
    const [x, y] = await inputManager.promptInput(
      `${currentPlayer}, enter your move (x y)`,
      {
        transformer: coordsTransformer,
      }
    );

    if (gameplay.isValidMove(x, y)) {
      gameplay.makeMove(x, y);
    } else {
      console.log("Invalid move, try again.");
    }
  }

  const winner = gameplay.getWinner();
  const finalScores = gameplay.getScores();
  console.log(`Game over! The winner is ${winner}. Final scores: P1 - ${finalScores.P1}, P2 - ${finalScores.P2}`);
}

main();
