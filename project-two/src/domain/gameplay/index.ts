import { Players } from "../../index.js";
import { Board } from "../board/index.js";
import { Field } from "../field/index.js";

export default class Gameplay {
  private static instance: Gameplay | null = null;
  private turn: Players | null | undefined = "P1";
  private hasGameEndedState: Promise<void> = new Promise((resolve) => {
    this.resolveHasGameEndedState = resolve;
  });
  private resolveHasGameEndedState: () => void = () => {};
  private winner: Players | null = null;
  private board: Board | null = null;

  constructor() {}

  static getInstance() {
    if (!Gameplay.instance) {
      Gameplay.instance = new Gameplay();
      Gameplay.instance.turn = "P1";
      Gameplay.instance.board = Board.getInstance();
      Gameplay.instance.hasGameEndedState = new Promise((resolve) => {
        Gameplay.instance!.resolveHasGameEndedState = resolve;
      });
    }
    return Gameplay.instance;
  }

  addPool(x: number, y: number, player: Players) {
    if (!this.isFieldFree(x, y)) throw new Error("Position is already taken");
    this.board!.placeQueen(x, y, player);
  }

  private isFieldFree(x: number, y: number) {
    return this.board!.isFieldEmpty(x, y);
  }

  hasGameEnded() {
    return this.checkForWinner();
  }

  getWinner(): Players {
    if (!this.hasGameEnded()) throw new Error("Game has not ended yet");
    return this.winner as Players;
  }

  get currentPlayer() {
    return this.turn;
  }

  get currentWinner() {
    return this.winner;
  }

  onGameEnd(): Promise<Players> {
    return new Promise(async (resolve) => {
      console.log("Waiting for game to end");
      await this.hasGameEndedState;
      console.log("Game has ended");
      resolve(this.getWinner());
    });
  }

  *onFrame() {
    while (!this.checkForWinner()) {
      yield;
      this.switchTurn();
    }

    this.resolveHasGameEndedState();
  }

  switchTurn() {
    this.turn = this.turn === "P1" ? "P2" : "P1";
  }

  private checkForWinner(): boolean {
    let areThereFreeFields = false;
    this.board!.getFields().forEach((fields: Field[]) =>
      fields.forEach((field: Field) => {
        if (!field.isFieldUsed()) {
          areThereFreeFields = true;
        }
      })
    );

    if (!areThereFreeFields) {
      this.winner = this.turn === "P1" ? "P2" : "P1";
      return true;
    }

    return false;
  }
}
