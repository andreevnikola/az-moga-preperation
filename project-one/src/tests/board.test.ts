import { Board } from "../domain/board/index";
import { Player, mustDoFields } from "../index";
import { Sign } from "../domain/board/board-item";

describe('Board', () => {
  let board: Board;

  beforeEach(() => {
    board = new Board(4, 4, mustDoFields);
  });

  test('should initialize board with correct dimensions', () => {
    expect(board.board.length).toBe(4);
    expect(board.board[0].length).toBe(4);
  });

  test('should set initial player positions', () => {
    expect(board.getPlayerPosition(Player.player1)).toEqual([0, 0]);
    expect(board.getPlayerPosition(Player.player2)).toEqual([3, 3]);
  });

  test('should validate moves correctly', () => {
    expect(board.isValidMove(1, 0, Player.player1)).toBe(true);
    expect(board.isValidMove(4, 4, Player.player1)).toBe(false);
  });

  test('should set positions as visited', () => {
    board.setVisited(1, 1, Player.player1);
    expect(board.getPlayerPosition(Player.player1)).toEqual([1, 1]);
    expect(board.checkIsVisited(1, 1)).toBe(true);
  });

  test('should correctly mark previous positions', () => {
    board.setVisited(1, 0, Player.player1);
    board.setVisited(2, 0, Player.player1);
    expect(board.playerPreviousPositions[Player.player1]).toContainEqual([0, 0]);
    expect(board.playerPreviousPositions[Player.player1]).toContainEqual([1, 0]);
  });
});
