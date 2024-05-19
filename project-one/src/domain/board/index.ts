import { Player } from "../../index.js";
import { generateValueFromSign } from "../../utils/board.js";
import { randomEnum } from "../../utils/enums.js";
import { BoardItem, Sign } from "./board-item.js";

export class Board {
  static instance: Board | undefined = undefined;
  board: BoardItem[][] = [];

  constructor(
    width?: number,
    height?: number,
    requiredFields?: { sign: Sign; value: number }[]
  ) {
    if (Board.instance) {
      return Board.instance;
    }

    if (!width || !height) {
      throw new Error("Board must have a width and height");
    }

    this.board = Array.from({ length: height! }, () =>
      Array.from({ length: width! }, () => {
        const randSign = randomEnum(Sign);
        return new BoardItem(
          randSign,
          generateValueFromSign(randSign, width * height)
        );
      })
    );

    requiredFields?.forEach((field) => {
      const x = Math.floor(Math.random() * width!);
      const y = Math.floor(Math.random() * height!);

      this.board[y][x].setField = field;
    });

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

    let rowsHolder = "--#=";
    this.board[0].forEach((_, __) => (rowsHolder += "==="));
    rowsHolder += "#";

    let numbersHolder = "   ";
    this.board[0].forEach(
      (_, i) => (numbersHolder += i < 10 ? ` 0${i}` : ` ${i}`)
    );
    numbersHolder += "  ";

    console.log(numbersHolder);
    console.log(rowsHolder);
    this.board.forEach((row, i) => {
      console.log(
        (i < 10 ? `0${i}` : i) +
          "| " +
          row.map((item) => item.item).join(" ") +
          " |" +
          (i < 10 ? `0${i}` : i)
      );
    });
    console.log(rowsHolder);
    console.log(numbersHolder);
  }

  get boardVolume(): number {
    return this.board.length * this.board[0].length;
  }
}
