import { Board } from '../../src/domain/board/index.js';
import { Field } from '../../src/domain/field/index.js';

describe('Board', () => {
  let board: Board;

  beforeEach(() => {
    board = Board.getInstance(8, 8);
  });

  afterEach(() => {
    // Reset the singleton instance
    (Board as any).instance = null;
  });

  it('should create a board with the specified dimensions', () => {
    expect(board).toBeInstanceOf(Board);
    expect(board['width']).toBe(8);
    expect(board['height']).toBe(8);
    expect(board['fields']).toHaveLength(8);
    expect(board['fields'][0]).toHaveLength(8);
    expect(board['fields'][0][0]).toBeInstanceOf(Field);
  });

  it('should throw an error if board dimensions are not provided for the first instantiation', () => {
    // Reset the singleton instance to test first instantiation
    (Board as any).instance = null;

    expect(() => Board.getInstance()).toThrowError('Board dimensions must be provided for the first instantiation.');
  });

  it('should place a queen on the specified field and disable the appropriate fields', () => {
    board.placeQueen(3, 3, 'Player 1');

    expect(board['fields'][3][3].isFieldUsed()).toBe(true);
    expect(board['fields'][3][3].getPoll()).toBe('Player 1');

    // Check disabled fields (rows, columns, and diagonals)
    const disabledFields = [
      [3, 0], [3, 1], [3, 2], [3, 4], [3, 5], [3, 6], [3, 7],
      [0, 3], [1, 3], [2, 3], [4, 3], [5, 3], [6, 3], [7, 3],
      [2, 2], [4, 4], [2, 4], [4, 2], [1, 1], [5, 5], [1, 5], [5, 1],
      [0, 0], [6, 6], [0, 6], [6, 0]
    ];

    disabledFields.forEach(([x, y]) => {
      expect(board['fields'][y][x].isFieldUsed()).toBe(true);
      expect(board['fields'][y][x].getPoll()).toBe('**');
    });
  });

  it('should throw an error when trying to place a queen on an already used field', () => {
    board.placeQueen(2, 2, 'Player 1');

    expect(() => board.placeQueen(2, 2, 'Player 2')).toThrowError('Field is already used');
  });

  it('should correctly check if a field is within the board bounds', () => {
    expect(board['isWithinBounds'](0, 0)).toBe(true);
    expect(board['isWithinBounds'](7, 7)).toBe(true);
    expect(board['isWithinBounds'](8, 8)).toBe(false);
    expect(board['isWithinBounds'](-1, 0)).toBe(false);
    expect(board['isWithinBounds'](0, -1)).toBe(false);
  });
});
