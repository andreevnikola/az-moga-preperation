import { Player } from "../../index.js";
import { randomEnum } from "../../utils/enums.js";
import { BoardItem, Sign } from "./board-item.js";

export class Board {
  static instance: Board | undefined = undefined;
  board: BoardItem[][] = [];

  constructor(width: number, height: number) {
    if (Board.instance) {
      return Board.instance;
    }

    this.board = Array.from({ length: height }, () =>
      Array.from({ length: width }, () => {
        const randSign = randomEnum(Sign);
        return new BoardItem(randSign, Math.floor(Math.random() * 9));
      })
    );

    Board.instance = this;
  }

  setVisited(x: number, y: number, player: Player): void {
    this.board[y][x].setVisited = player;
  }

  checkIsVisited(x: number, y: number): boolean {
    return this.board[y][x].isVisited;
  }

  print(): void {
    console.log("Board:");

    let rowsHolder = "#=";
    this.board[0].forEach((_, __) => (rowsHolder += "==="));
    rowsHolder += "#";

    console.log(rowsHolder);
    this.board.forEach((row) => {
      console.log("| " + row.map((item) => item.item).join(" ") + " |");
    });
    console.log(rowsHolder);
  }
}
