import { IValidationResult } from "../../domain/input-manager/index.js";

function isBetween(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

export function boardSizeValidator(inp: [number, number]): IValidationResult {
  return {
    isValid: inp.every((val) => isBetween(val, 4, 30)),
    message: "The board size must be between 4 and 100.",
  };
}
