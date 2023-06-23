type digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
export interface ResultInfo {
  ball: number;
  strike: number;
  guessNumber: `${digit}${digit}${digit}${digit}`;
}

export interface GameResultInfo {
  result: Array<ResultInfo | null>;
  earnedPoint: number;
}
