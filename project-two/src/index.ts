import { InputManager } from './domain/input-manager/index.js';
import { Board } from './domain/board/index.js';

async function main() {
  const inputManager = InputManager.getInstance();
  const width = await inputManager.promptInput<number>('Enter board width', { transformer: Number });
  const height = await inputManager.promptInput<number>('Enter board height', { transformer: Number });

  const board = Board.getInstance(width, height);
  board.drawBoard();

  let currentPlayer = 'P1';
  while (true) {
    const x = await inputManager.promptInput<number>(`Player ${currentPlayer}, enter x coordinate`, { transformer: Number });
    const y = await inputManager.promptInput<number>(`Player ${currentPlayer}, enter y coordinate`, { transformer: Number });

    try {
      board.placeQueen(x, y, currentPlayer);
      board.drawBoard();
      currentPlayer = currentPlayer === 'P1' ? 'P2' : 'P1';
    } catch (error: any) {
      console.error(error.message);
    }
  }
}

main();
