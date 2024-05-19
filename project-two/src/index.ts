import {
  InputManager,
  IValidationResult,
} from "./domain/input-manager/index.js";
import {
  coordsTransformer,
  numberTransformer,
} from "./utils/input/transformers.js";
import { boardSizeValidator } from "./utils/input/validators.js";

const inputManager = InputManager.getInstance();

export enum Player {
  Player1 = "P1",
  Player2 = "P2",
}

async function main() {
  const [width, height] = await inputManager.promptInput(
    "Enter width and height:",
    {
      transformer: coordsTransformer,
      validator: boardSizeValidator,
    }
  );
}

main();
