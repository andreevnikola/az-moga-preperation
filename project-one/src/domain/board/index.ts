import { randomEnum } from "../../utils/enums.js";
import { BoardItem, Sign } from "./board-item.js";

export class Board {
  board: BoardItem[][] = [];

  constructor(width: number, height: number) {
    this.board = Array.from({ length: height }, () =>
      Array.from({ length: width }, () => {
        const randSign = randomEnum(Sign);
        return new BoardItem(randSign, Math.floor(Math.random() * 9));
      })
    );
  }

  print(): void {
    this.board.forEach((row) => {
      console.log(row.map((item) => item.item).join(" "));
    });
  }
}
