import { Board } from "../domain/board/index.js";
import { Gameplay } from "../domain/gameplay/index.js";
import { InputManager } from "../domain/input-manager/index.js";
import { coordsTransformer } from "../utils/input/transformers.js";

export class GameplayService {
  private board: Board;
  private gameplay: Gameplay;
  private inputManager: InputManager;

  constructor() {
    this.board = new Board();
    this.gameplay = Gameplay.getInstance(this.board);
    this.inputManager = new InputManager();
  }

  async frame(getInput: () => Promise<[number, number]>): Promise<boolean> {
    const input = await getInput();
    const [x, y] = input;

    if (!this.gameplay.hasValidMovesForNextPlayer()) {
      return false;
    }

    if (this.gameplay.isValidMove(x, y)) {
      this.gameplay.makeMove(x, y);
    } else {
      console.log("Invalid move, try again.");
      await this.frame(getInput);
    }

    return true;
  }

  frameOutput(): void {
    this.board.print();
    const scores = this.gameplay.getScores();
    console.log(`Scores: P1 - ${scores.P1}, P2 - ${scores.P2}`);
  }
}
