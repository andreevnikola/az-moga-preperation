import { readLine } from "../../utils/input/prompt.js";

export interface IValidationResult {
  isValid: boolean;
  message: string;
}

export class InputManager {
  private static instance: InputManager;

  private constructor() {
    
  }

  public static getInstance(): InputManager {
    if (!InputManager.instance) {
      InputManager.instance = new InputManager();
    }
    return InputManager.instance;
  }

  public async promptInput<T>(
    text: string,
    properties?: {
      validator?: (inp: T) => IValidationResult;
      transformer?: (inp: string) => T;
    }
  ): Promise<T> {
    const inp = await readLine(text + ": ");
    if (!inp) {
      console.error("This field is required. Please provide an input.");
      return this.promptInput(text, properties);
    }

    let transformed: T | string = inp;

    if (properties?.transformer) {
      try {
        transformed = properties.transformer(inp);
      } catch (e) {
        console.error("Invalid input format. Please try again.");
        return this.promptInput(text, properties);
      }
    }

    if (properties?.validator) {
      const validation = properties.validator(transformed as T);
      if (!validation.isValid) {
        console.error("Validation failed. Please try again.");
        console.error(validation.message);
        return this.promptInput(text, properties);
      }
    }

    return transformed as T;
  }
}