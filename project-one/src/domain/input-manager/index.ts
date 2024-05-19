import { readLine } from "../../utils/input/prompt.js";

export interface IValidationResult {
  isValid: boolean;
  message: string;
}

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
    properties?: {
      validator?: (inp: T) => IValidationResult;
      transformer?: (inp: string) => T;
    }
  ): Promise<T> {
    const inp = await readLine(text + ": ");
    if (!inp) {
      console.error("This field is required.");
      return this.promptInput(text, properties);
    }

    let transformed: T | string = inp;

    if (properties?.transformer) {
      try {
        transformed = properties.transformer(inp!);
      } catch (e) {
        console.error("Invalid input, please try again.");
        return this.promptInput(text, properties);
      }
    }

    if (properties?.validator) {
      const validator = properties.validator(transformed as T);
      if (!validator.isValid) {
        console.error("Invalid input, please try again.");
        console.error(validator.message);
        return this.promptInput(text, properties);
      }
    }

    return transformed! as T;
  }
}
