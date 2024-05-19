import { Board } from "../board/index.js";
import { Player, Turn } from "../../index.js";

class Gameplay {
  private static instance: Gameplay;
  private currentTurn: Turn;
  private score: { [key in Player]: number };
  private board: Board;

  private constructor(board: Board) {
    this.currentTurn = Turn.P1;
    this.score = { [Player.player1]: 0, [Player.player2]: 0 };
    this.board = board;
  }

  public static getInstance(board?: Board): Gameplay {
    if (!Gameplay.instance) {
      if (!board) {
        throw new Error("Board instance is required to initialize Gameplay");
      }
      Gameplay.instance = new Gameplay(board);
    }
    return Gameplay.instance;
  }

  public play(): void {
    // Gameplay logic here
  }

  public isGameOver(): boolean {
    return (
      !this.hasValidMovesForCurrentPlayer() ||
      !this.hasValidMovesForNextPlayer()
    );
  }

  public getWinner(): Player {
    if (this.score[Player.player1] > this.score[Player.player2]) {
      return Player.player1;
    } else {
      return Player.player2;
    }
  }

  public getCurrentPlayer(): Player {
    return this.currentTurn === Turn.P1 ? Player.player1 : Player.player2;
  }

  public isValidMove(x: number, y: number): boolean {
    const player = this.getCurrentPlayer();
    return this.board.isValidMove(x, y, player);
  }

  public makeMove(x: number, y: number): void {
    const player = this.getCurrentPlayer();
    this.board.setVisited(x, y, player);
    const boardItem = this.board.board[y][x];
    this.score[player] = boardItem.sum(this.score[player]);
    this.switchTurn();
  }

  public getScores(): { P1: number; P2: number } {
    return {
      P1: this.score[Player.player1],
      P2: this.score[Player.player2],
    };
  }

  public hasValidMovesForNextPlayer(): boolean {
    const nextPlayer =
      this.currentTurn === Turn.P1 ? Player.player2 : Player.player1;
    const [x, y] = this.board.getPlayerPosition(nextPlayer);
    return this.hasValidMoves(x, y, nextPlayer);
  }

  private hasValidMovesForCurrentPlayer(): boolean {
    const player = this.getCurrentPlayer();
    const [x, y] = this.board.getPlayerPosition(player);
    return this.hasValidMoves(x, y, player);
  }

  private hasValidMoves(x: number, y: number, player: Player): boolean {
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        const nx = x + dx;
        const ny = y + dy;
        if (this.board.isValidMove(nx, ny, player)) {
          return true;
        }
      }
    }
    return false;
  }

  private switchTurn(): void {
    this.currentTurn = this.currentTurn === Turn.P1 ? Turn.P2 : Turn.P1;
  }
  
}

export { Gameplay };
