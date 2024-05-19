import { Player } from "../..";

export enum Sign {
  multiplication = "x",
  addition = "+",
  subtraction = "-",
  division = "/",
}

export class BoardItem {
  private sign: Sign;
  private value: number;
  private visitedBy: undefined | Player = undefined;

  constructor(sign: Sign, value: number) {
    this.sign = sign;
    this.value = value;
  }

  get item(): string {
    if (this.visitedBy !== undefined) return this.visitedBy.toString();
    return `${this.sign}${this.value}`;
  }

  sum(initial: number): number {
    switch (this.sign) {
      case Sign.addition:
        return initial + this.value;
      case Sign.subtraction:
        return initial - this.value;
      case Sign.multiplication:
        return initial * this.value;
      case Sign.division:
        return initial / this.value;
      default:
        return initial;
    }
  }

  get isVisited(): boolean {
    return this.visitedBy !== undefined;
  }

  set setVisited(player: Player) {
    this.visitedBy = player;
  }
}
