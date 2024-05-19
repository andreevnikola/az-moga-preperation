import { InputManager, IValidationResult } from './domain/input-manager/index.js';

// Sample validator to check if input is a number and within a certain range
const numberValidator = (inp: number): IValidationResult => {
  if (isNaN(inp)) {
    return { isValid: false, message: "Input must be a number." };
  }
  if (inp < 1 || inp > 10) {
    return { isValid: false, message: "Number must be between 1 and 10." };
  }
  return { isValid: true, message: "" };
};

// Sample transformer to convert string input to a number
const numberTransformer = (inp: string): number => {
  return parseFloat(inp);
};

async function main() {
  const inputManager = InputManager.getInstance();

  const numberInput = await inputManager.promptInput<number>(
    "Please enter a number between 1 and 10",
    {
      validator: numberValidator,
      transformer: numberTransformer,
    }
  );

  console.log(`You entered the valid number: ${numberInput}`);
}

main();