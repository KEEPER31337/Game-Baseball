import axios from 'axios';
import { useQuery, useMutation } from 'react-query';
import { GameInfo, GameResultInfo, GameStatus } from './dto';

const quearyKeys = {
  game_info: ['game_info'] as const,
  status: ['status'] as const,
  result: ['result'] as const,
};

const useGetGameInfoQuery = () => {
  const fetcher = () => axios.get('/game/baseball/game-info').then(({ data }) => data);

  return useQuery<GameInfo>(quearyKeys.game_info, fetcher);
};

const useGetBaseBallStatusQuery = () => {
  const fetcher = () => axios.get('/game/baseball/status').then(({ data }) => data);

  return useQuery<{ status: GameStatus; baseballPerDay: number }>(quearyKeys.status, fetcher);
};

const useGameStartMutation = () => {
  const fetcher = ({ bettingPoint }: { bettingPoint: number }) =>
    axios.post('/game/baseball/start', { bettingPoint }).then(({ data }) => data);

  return useMutation(fetcher);
};

const useGuessMutation = () => {
  const fetcher = ({ guessNumber }: { guessNumber: string }) =>
    axios.post('/game/baseball/guess', { guessNumber }).then(({ data }) => data);

  return useMutation(fetcher);
};

const useGetResultQuery = () => {
  const fetcher = () => axios.get('/game/baseball/result').then(({ data }) => data);
  return useQuery<GameResultInfo>(quearyKeys.result, fetcher);
};

export { useGetGameInfoQuery, useGetBaseBallStatusQuery, useGameStartMutation, useGuessMutation, useGetResultQuery };
