import Gameplay from "../domain/gameplay";

export class GameplayService {
  private static instance: GameplayService | null = null;
  private gameplay: Gameplay | null = null;

  constructor() {
    GameplayService.instance = new GameplayService();
    GameplayService.instance.gameplay = Gameplay.getInstance();
  }

  static getInstance() {
    if (!GameplayService.instance) {
      GameplayService.instance = new GameplayService();
      GameplayService.instance.gameplay = Gameplay.getInstance();
    }
    return GameplayService.instance;
  }

  runFrame(prompter: () => { x: number; y: number }) {
    const { x, y } = prompter();

    try {
      this.gameplay?.addPool(x, y, this.gameplay.currentPlayer);
    } catch (error) {
      console.error(error);
      this.runFrame(prompter);
    }
  }
}
