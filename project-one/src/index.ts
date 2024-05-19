import { InputManager } from "./domain/input-manager/index.js";
import { coordsTransformer } from "./utils/boardInput.js";

const inputManager = new InputManager();

async function main() {
  const [width, height] = await inputManager.promptInput(
    "Enter the size of the board (width height)",
    coordsTransformer
  );

  console.log(width.toString(), height.toString());
}

main();
