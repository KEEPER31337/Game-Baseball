type digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
export type GuessNumber = `${digit}${digit}${digit}${digit}`;

export interface ResultInfo {
  ball: number;
  strike: number;
  guessNumber: GuessNumber;
}

export interface GameResultInfo {
  result: Array<ResultInfo | null>;
  earnedPoint: number;
}
