export interface ResultInfo {
  ball: number;
  strike: number;
  guessNumber: string;
}

export interface GameResultInfo {
  results: Array<ResultInfo | null>;
  earnablePoints: number;
}

export interface GameInfo {
  guessNumberLength: number;
  tryCount: number;
  maxBettingPoint: number;
  minBettingPoint: number;
}

export type GameStatus = 'NOT_START' | 'PLAYING' | 'END';
