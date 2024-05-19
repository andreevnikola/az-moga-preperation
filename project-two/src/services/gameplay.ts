import Gameplay from "../domain/gameplay/index.js";

export class GameplayService {
  private static instance: GameplayService | null = null;
  private gameplay: Gameplay | null = null;

  constructor() {}

  static getInstance() {
    if (!GameplayService.instance) {
      GameplayService.instance = new GameplayService();
      GameplayService.instance.gameplay = Gameplay.getInstance();
    }
    return GameplayService.instance;
  }

  async runFrame(prompter: () => Promise<{ x: number; y: number }>) {
    const { x, y } = await prompter();

    try {
      this.gameplay?.addPool(x, y, this.gameplay.currentPlayer!);
    } catch (error) {
      console.error(error);
      this.runFrame(prompter);
    }
  }
}
