import { Board } from "../domain/board/index.js";
import Gameplay from "../domain/gameplay/index.js";
import { GameplayService } from "../services/gameplay.js";

describe("Gameplay", () => {
  let gameplay: Gameplay;
  let board: Board;
  let gameplayService: GameplayService;

  beforeEach(() => {
    board = Board.getInstance(4, 4);
    gameplay = Gameplay.getInstance();
    gameplayService = GameplayService.getInstance();
  });

  afterEach(() => {
    // Reset the singleton instances
    (Gameplay as any).instance = null;
    (Board as any).instance = null;
    (GameplayService as any).instance = null;
  });

  it("should add a queen to the specified field", () => {
    gameplay.addPool(2, 2, "P1");

    expect(board.getFields()[2][2]).toHaveProperty("poll", "P1");
  });

  it("should throw an error when trying to add a queen to an already used field", () => {
    gameplay.addPool(2, 2, "P1");

    expect(() => gameplay.addPool(2, 2, "P2")).toThrowError(
      "Position is already taken"
    );
  });

  it("should check if the game has ended", () => {
    expect(gameplay.hasGameEnded()).toBe(false);

    // Fill the board with queens
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        try {
          gameplay.addPool(i, j, "P1");
        } catch (error: any) {
          if (error.message === "Position is already taken") {
            continue;
          }
          expect(gameplay.hasGameEnded()).toBe(true);
        }
      }
    }
  });

  it("should get the winner of the game", () => {
    expect(() => gameplay.getWinner()).toThrowError("Game has not ended yet");

    // Fill the board with queens
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        try {
          gameplay.addPool(i, j, "P1");
        } catch (error: any) {
          if (error.message === "Position is already taken") {
            continue;
          }
        }
      }
    }

    expect(gameplay.getWinner()).toBe("P2");
  });

  it("should switch the turn", () => {
    expect(gameplay.currentPlayer).toBe("P1");

    gameplay.switchTurn();

    expect(gameplay.currentPlayer).toBe("P2");

    gameplay.switchTurn();

    expect(gameplay.currentPlayer).toBe("P1");
  });
});
