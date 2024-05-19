import { InputManager } from "./domain/input-manager/index.js";
import { coordsTransformer } from "./utils/input/transformers.js";
import { boardSizeValidator } from "./utils/input/validators.js";

const inputManager = new InputManager();

async function main() {
  const [width, height] = await inputManager.promptInput(
    "Enter the size of the board (width height)",
    {
      transformer: coordsTransformer,
      validator: boardSizeValidator,
    }
  );

  console.log(width.toString(), height.toString());
}

main();
