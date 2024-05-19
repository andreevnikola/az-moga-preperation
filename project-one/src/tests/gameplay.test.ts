import { Gameplay } from "../domain/gameplay/index";
import { Board } from "../domain/board/index";
import { Player, mustDoFields } from "../index";
import { Sign } from "../domain/board/board-item";
import { GameplayService } from "../services/gameplay";

describe('Gameplay', () => {
  let board: Board;
  let gameplay: Gameplay;
  let gameplayService: GameplayService;

  beforeEach(() => {
    console.log("BEFORE EACH");
    board = new Board(4, 4, mustDoFields);
    gameplay = Gameplay.getInstance(board);
    gameplay.setCurrentPlayer(Player.player1);
    gameplayService = new GameplayService();
  });

  test('should initialize gameplay with correct initial values', () => {
    expect(gameplay.getCurrentPlayer()).toBe(Player.player1);
    expect(gameplay.getScores()).toEqual({ P1: 0, P2: 0 });
  });

  test('should switch turns correctly', () => {
    gameplay.makeMove(1, 0);
    expect(gameplay.getCurrentPlayer()).toBe(Player.player2);
  });

  test('should validate game over condition correctly', () => {
    expect(gameplay.isGameOver()).toBe(false);
  });

  test('should correctly determine valid moves', () => {
    console.log(board.print());
    console.log(gameplay.getCurrentPlayer());
    expect(gameplay.isValidMove(1, 0)).toBe(true);
    expect(gameplay.isValidMove(4, 4)).toBe(false);
  });

  test('should end game at right time', ()  => {
    const moves = [[1, 0], [2, 2], [1, 1], [1, 2], [0, 2], [0, 1]];
    moves.map((move) => gameplay.makeMove(move[0], move[1]));
    expect(gameplay.isGameOver()).toBe(true);
  });
});
