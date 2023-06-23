import axios from 'axios';
import { useQuery } from 'react-query';
import { GameResultInfo, GuessNumber } from './dto';

const quearyKeys = {
  is_already_played: ['is_already_played'] as const,
  start: ['start'] as const,
  guess: ['guess'] as const,
  result: ['result'] as const,
};

const useGetIsAlreadyPlayed = () => {
  const fetcher = () => axios.get('/api/baseball/is_already_played').then(({ data }) => data);

  return useQuery<boolean>(quearyKeys.is_already_played, fetcher);
};

const useGameStart = ({ bettingPoint }: { bettingPoint: number }) => {
  const fetcher = () => axios.post('/api/baseball/start', { bettingPoint }).then(({ data }) => data);

  return useQuery<null>(quearyKeys.start, fetcher);
};

const useGetGuess = ({ guessNumber }: { guessNumber: GuessNumber }) => {
  const fetcher = () => axios.post('/api/baseball/guess', { guessNumber }).then(({ data }) => data);

  return useQuery<GameResultInfo>(quearyKeys.guess, fetcher);
};

const useGetResult = () => {
  const fetcher = () => axios.get('/api/baseball/result').then(({ data }) => data);

  return useQuery<GameResultInfo>(quearyKeys.result, fetcher);
};

export { useGetIsAlreadyPlayed, useGameStart, useGetGuess, useGetResult };
