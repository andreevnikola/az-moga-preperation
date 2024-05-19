import { Sign } from "./domain/board/board-item.js";
import { Board } from "./domain/board/index.js";
import { InputManager } from "./domain/input-manager/index.js";
import { coordsTransformer } from "./utils/input/transformers.js";
import { boardSizeValidator } from "./utils/input/validators.js";

const inputManager = new InputManager();

export enum Player {
  player1 = "P1",
  player2 = "P2",
}

async function main() {
  const [width, height] = await inputManager.promptInput(
    "Enter the size of the board (width height)",
    {
      transformer: coordsTransformer,
      validator: boardSizeValidator,
    }
  );

  const board = new Board(width, height, [
    { sign: Sign.addition, value: Math.floor(Math.random() * 8) + 1 },
    { sign: Sign.subtraction, value: Math.floor(Math.random() * 8) + 1 },
    { sign: Sign.multiplication, value: 0 },
    { sign: Sign.multiplication, value: 2 },
  ]);

  board.print();
}

main();
