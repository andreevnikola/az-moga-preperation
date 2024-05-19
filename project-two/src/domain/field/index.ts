export class Field {
    private isUsed: boolean;
    private poll: string | null;
  
    constructor() {
      this.isUsed = false;
      this.poll = null;
    }
  
    public markUsed(poll: string): void {
      this.isUsed = true;
      this.poll = poll;
    }
  
    public markEmpty(): void {
      this.isUsed = false;
      this.poll = null;
    }
  
    public isFieldUsed(): boolean {
      return this.isUsed;
    }
  
    public getPoll(): string | null {
      return this.poll;
    }
  }
  