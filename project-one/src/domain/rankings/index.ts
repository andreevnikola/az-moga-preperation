import { Player } from "../../index.js";

export class Rankings {
  static instance: Rankings | undefined = undefined;

  P1_WINS = 0;
  P2_WINS = 0;

  constructor() {
    if (Rankings.instance) {
      return Rankings.instance;
    }

    Rankings.instance = this;
  }

  addWin(player: Player): void {
    if (player === Player.player1) {
      this.P1_WINS++;
    } else {
      this.P2_WINS++;
    }
  }

  printWins(): void {
    console.log("===== Wins: ======");
    console.log(` Player 1: ${this.P1_WINS}`);
    console.log(` Player 2: ${this.P2_WINS}`);
    console.log("==================");
  }
}
