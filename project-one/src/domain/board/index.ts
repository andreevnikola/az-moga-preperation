import { Player } from "../../index.js";
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

    this.playerPositions[Player.player2] = [width - 1, height - 1];

    // Mark initial positions of players
    this.board[0][0].setVisited = Player.player1;
    this.board[height - 1][width - 1].setVisited = Player.player2;

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

    let rowsHolder = "#=";
    this.board[0].forEach((_, __) => (rowsHolder += "==="));
    rowsHolder += "#";

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
      console.log("| " + rowStr + " |");
    });
    console.log(rowsHolder);
  }

  getPlayerPosition(player: Player): [number, number] {
    return this.playerPositions[player];
  }
}
