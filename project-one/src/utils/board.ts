import { Board } from "../domain/board/index.js";
import { Sign } from "../domain/board/board-item.js";

function limitToMax(value: number, max: number): number {
  return value > max ? max : value;
}

export function generateValueFromSign(sign: Sign, boardVolume: number): number {
  switch (sign) {
    case Sign.addition:
    case Sign.subtraction:
      return Math.floor(Math.random() * 9);
    case Sign.multiplication:
      return Math.floor(
        Math.random() *
          Math.floor(4 + limitToMax(Math.sqrt(boardVolume) / 3, 5))
      );
    case Sign.division:
      return (
        1 +
        Math.floor(
          Math.random() *
            Math.floor(3 + limitToMax(Math.sqrt(boardVolume) / 3, 4))
        )
      );
  }
}
