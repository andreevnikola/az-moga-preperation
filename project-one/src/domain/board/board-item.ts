export enum Sign {
  multiplication = "x",
  addition = "+",
  subtraction = "-",
  division = "/",
}

export class BoardItem {
  private sign: Sign = Sign.addition;
  private value: number = 0;

  constructor(sign: Sign, value: number) {
    this.sign = sign;
    this.value = value;
  }

  get item(): string {
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
    }
  }
}
