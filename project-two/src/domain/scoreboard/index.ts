export class Scoreboard {
  private scores: {
    P1: number;
    P2: number;
  } = { P1: 0, P2: 0 };

  constructor() {
    this.scores.P1 = 0;
    this.scores.P2 = 0;
  }

  public printScores(): void {
    console.log("-------------------------------");
    console.log(`Player 1: ${this.scores.P1}`);
    console.log(`Player 2: ${this.scores.P2}`);
    console.log("-------------------------------");
  }

  public updateScore(player: string): void {
    if (player === "P1") {
      this.scores.P1++;
    } else {
      this.scores.P2++;
    }
  }
}
