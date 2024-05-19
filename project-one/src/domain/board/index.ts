import { Player } from "../../index.js";
import { generateValueFromSign } from "../../utils/board.js";
import { randomEnum } from "../../utils/enums.js";
import { BoardItem, Sign } from "./board-item.js";

export class Board {
  static instance: Board | undefined = undefined;
  board: BoardItem[][] = [];
  playerPositions: { [key in Player]: [number, number] } = {
    [Player.player1]: [0, 0],
    [Player.player2]: [0, 0],
  };
  playerPreviousPositions: { [key in Player]: [number, number] | null } = {
    [Player.player1]: null,
    [Player.player2]: null,
  };

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

    // Initialize player positions
    this.playerPositions[Player.player2] = [width - 1, height - 1];

    // Mark initial positions of players
    this.board[0][0].setVisited = Player.player1;
    this.board[height - 1][width - 1].setVisited = Player.player2;

    // Set required fields
    requiredFields?.forEach((field) => {
      const x = Math.floor(Math.random() * width!);
      const y = Math.floor(Math.random() * height!);

      this.board[y][x].setField = field;
    });

    Board.instance = this;
  }

  setVisited(x: number, y: number, player: Player): void {
    const [prevX, prevY] = this.playerPositions[player];
    this.playerPreviousPositions[player] = [prevX, prevY];
    this.board[y][x].setVisited = player;
    this.playerPositions[player] = [x, y];
  }

  checkIsVisited(x: number, y: number): boolean {
    return this.board[y][x].isVisited;
  }

  isValidMove(x: number, y: number, player: Player): boolean {
    const [px, py] = this.playerPositions[player];
    const dx = Math.abs(px - x);
    const dy = Math.abs(py - y);
    const withinBounds = x >= 0 && x < this.board[0].length && y >= 0 && y < this.board.length;
    const isAdjacent = dx <= 1 && dy <= 1 && (dx + dy > 0); // ensuring the move is adjacent and not the same cell
    const isNotVisited = withinBounds && !this.checkIsVisited(x, y);
    return withinBounds && isAdjacent && isNotVisited;
  }

  print(): void {
    console.log("Board:");

    let rowsHolder = "---#=";
    this.board[0].forEach((_, __) => (rowsHolder += "==="));
    rowsHolder += "#";

    let numbersHolder = "   ";
    this.board[0].forEach(
      (_, i) => (numbersHolder += i < 10 ? ` 0${i}` : ` ${i}`)
    );
    numbersHolder += "  ";

    console.log(numbersHolder);
    console.log(rowsHolder);
    this.board.forEach((row, rowIndex) => {
      const rowStr = row.map((item, colIndex) => {
        const positionP1 = this.playerPositions[Player.player1];
        const previousPositionP1 = this.playerPreviousPositions[Player.player1];
        const positionP2 = this.playerPositions[Player.player2];
        if (positionP1[0] === colIndex && positionP1[1] === rowIndex) {
          return "P1";
        } else if (positionP2[0] === colIndex && positionP2[1] === rowIndex) {
          return "P2";
        } else if (previousPositionP1 && previousPositionP1[0] === colIndex && previousPositionP1[1] === rowIndex) {
          return "*1";
        } else {
          return item.item;
        }
      }).join(" ");
      const i = rowIndex < 10 ? ` 0${rowIndex}` : ` ${rowIndex}`;
      console.log(i + "| " + rowStr + " |" + i);
    });
    console.log(rowsHolder);
    console.log(numbersHolder);
  }

  get boardVolume(): number {
    return this.board.length * this.board[0].length;
  }

  getPlayerPosition(player: Player): [number, number] {
    return this.playerPositions[player];
  }
}
