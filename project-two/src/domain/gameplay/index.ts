import { Player } from "../..";

export default class Gameplay {
  private static instance: Gameplay | null = null;
  private turn: Player = Player.Player1;
  private hasGameEndedState: Promise<boolean> = new Promise(() => {});
  private winner: Player | null = null;

  constructor() {
    Gameplay.instance = new Gameplay();
    Gameplay.instance.turn = Player.Player1;
  }

  static getInstance() {
    if (!Gameplay.instance) {
      Gameplay.instance = new Gameplay();
      Gameplay.instance.turn = Player.Player1;
    }
    return Gameplay.instance;
  }

  addPool(x: number, y: number, player: Player) {
    if (!this.isFieldFree(x, y)) throw new Error("Possition is already taken");
    // TODO: add pool to the board using x, y and player with the instance of the Baord class
  }

  private isFieldFree(x: number, y: number) {
    return true;
  }

  hasGameEnded() {
    return this.checkForWinner();
  }

  getWinner(): Player {
    if (!this.hasGameEnded) throw new Error("Game has not ended yet");
    return this.winner as Player;
  }

  get currentPlayer() {
    return this.turn;
  }

  get currentWinner() {
    return this.winner;
  }

  onGameEnd(): Promise<Player> {
    return new Promise(async (resolve) => {
      await this.hasGameEndedState;
      resolve(this.getWinner());
    });
  }

  *onFrame() {
    while (!this.checkForWinner()) {
      yield;
    }
  }

  switchTurn() {
    this.turn = this.turn === Player.Player1 ? Player.Player2 : Player.Player1;
  }

  private checkForWinner(): boolean {
    this.winner = Player.Player1;

    return true;
  }
}
