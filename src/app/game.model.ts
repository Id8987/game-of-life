// game.model.ts

export class GameOfLife {
    private board!: boolean[][];
    private numRows: number;
    private numCols: number;
  
    constructor(numRows: number, numCols: number) {
      this.numRows = numRows;
      this.numCols = numCols;
      this.initializeBoard();
    }
  
    private initializeBoard(): void {
      this.board = new Array(this.numRows).fill(null)
        .map(() => new Array(this.numCols).fill(false));
    }
  
    public getBoard(): boolean[][] {
      return this.board.map(row => [...row]);
    }
  
    public toggleCell(row: number, col: number): void {
      this.board[row][col] = !this.board[row][col];
    }
  
    public nextGeneration(): void {
      const newBoard: boolean[][] = new Array(this.numRows).fill(null)
        .map(() => new Array(this.numCols).fill(false));
  
      for (let row = 0; row < this.numRows; row++) {
        for (let col = 0; col < this.numCols; col++) {
          const neighbors = this.countNeighbors(row, col);
          if (this.board[row][col]) {
            // Cell is alive
            newBoard[row][col] = neighbors === 2 || neighbors === 3;
          } else {
            // Cell is dead
            newBoard[row][col] = neighbors === 3;
          }
        }
      }
  
      this.board = newBoard;
    }
  
    private countNeighbors(row: number, col: number): number {
      let count = 0;
  
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          const neighborRow = row + i;
          const neighborCol = col + j;
  
          if (neighborRow >= 0 && neighborRow < this.numRows &&
              neighborCol >= 0 && neighborCol < this.numCols &&
              !(i === 0 && j === 0)) {
            count += this.board[neighborRow][neighborCol] ? 1 : 0;
          }
        }
      }
  
      return count;
    }
  }
  