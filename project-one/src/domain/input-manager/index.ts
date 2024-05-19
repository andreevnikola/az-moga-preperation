import { readLine } from "../../utils/prompt.js";

export class InputManager {
  static instance: InputManager | undefined = undefined;

  constructor() {
    if (InputManager.instance) {
      return InputManager.instance;
    }

    InputManager.instance = this;
  }

  async promptInput<T>(
    text: string,
    transformer?: (inp: string) => T
  ): Promise<T> {
    const inp = await readLine(text + ": ");
    if (!inp) {
      console.error("This field is required.");
      this.promptInput(text);
    }

    if (transformer) {
      try {
        return transformer(inp!);
      } catch (e) {
        console.error("Invalid input, please try again.");
        return this.promptInput(text, transformer);
      }
    }

    return inp! as T;
  }
}
