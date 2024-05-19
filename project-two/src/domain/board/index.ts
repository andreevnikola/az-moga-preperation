import { Field } from '../field/index.js';

export class Board {
  private static instance: Board;
  private fields: Field[][];
  private width: number;
  private height: number;

  private constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.fields = Array.from({ length: height }, () =>
      Array.from({ length: width }, () => new Field())
    );
  }

  public static getInstance(width?: number, height?: number): Board {
    if (!Board.instance) {
      if (width === undefined || height === undefined) {
        throw new Error("Board dimensions must be provided for the first instantiation.");
      }
      Board.instance = new Board(width, height);
    }
    return Board.instance;
  }

  public drawBoard(): void {
    let boardStr = '   ';

    for (let x = 0; x < this.width; x++) {
      boardStr += `${x}  `;
    }
    boardStr += '\n';

    for (let y = 0; y < this.height; y++) {
      boardStr += `${y} `;
      let rowStr = '';
      for (let x = 0; x < this.width; x++) {
        const field = this.fields[y][x];
        if (field.isFieldUsed()) {
          if (field.getPoll() === '**') {
            rowStr += '**';
          } else {
            rowStr += field.getPoll();
          }
        } else {
          rowStr += '##';
        }
        rowStr += ' ';
      }
      rowStr = rowStr.slice(0, -1);
      boardStr += rowStr + '\n';
    }
    console.log(boardStr);
  }

  public placeQueen(x: number, y: number, player: string): void {
    if (this.fields[y][x].isFieldUsed()) {
      throw new Error('Field is already used');
    }
    this.fields[y][x].markUsed(player);
    this.disableFields(x, y);
  }

  private disableFields(x: number, y: number): void {
    const directions = [
      { dx: 1, dy: 0 },
      { dx: -1, dy: 0 },
      { dx: 0, dy: 1 },
      { dx: 0, dy: -1 },
      { dx: 1, dy: 1 },
      { dx: -1, dy: -1 },
      { dx: 1, dy: -1 },
      { dx: -1, dy: 1 },
    ];

    directions.forEach(direction => {
      let currentX = x + direction.dx;
      let currentY = y + direction.dy;
      while (this.isWithinBounds(currentX, currentY)) {
        if (!this.fields[currentY][currentX].isFieldUsed()) {
          this.fields[currentY][currentX].markUsed('**');
        }
        currentX += direction.dx;
        currentY += direction.dy;
      }
    });
  }

  private isWithinBounds(x: number, y: number): boolean {
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  }
}