// app.component.ts

import { Component, OnDestroy } from '@angular/core';
import { GameOfLife } from './game.model';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  private numOfCol:number = 40;
  private numOfRow:number = 10;
  private game: GameOfLife;
  public board: boolean[][];
  private gameInterval: any;
  private destroy$: Subject<void> = new Subject();

  public options:string[] = [
    "20- 20",
    "30- 20"
  ]

  public isGameRunning: boolean = false;

  constructor() {
    this.game = new GameOfLife(this.numOfRow, this.numOfCol);
    this.board = this.game.getBoard();
  }

  public onCellClick(row: number, col: number): void {
    this.game.toggleCell(row, col);
    this.board = this.game.getBoard();
  }

  public onNextGenerationClick(): void {
    this.game.nextGeneration();
    this.board = this.game.getBoard();
  }

  public onStartClick(): void {
    this.isGameRunning = true;
    this.gameInterval = interval(1000) // Adjust the interval as needed
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.game.nextGeneration();
        this.board = this.game.getBoard();
      });
  }

  public onPauseClick(): void {
    this.isGameRunning = false;
    if (this.gameInterval) {
      this.gameInterval.unsubscribe();
    }
  }

  public onResetClick(): void {
    this.isGameRunning = false;
    this.game = new GameOfLife(this.numOfRow, this.numOfCol); // Reset the game
    this.board = this.game.getBoard();
    if (this.gameInterval) {
      this.gameInterval.unsubscribe();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
