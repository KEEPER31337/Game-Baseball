import axios from 'axios';
import { useQuery, useMutation } from 'react-query';
import { GameInfo, GameResultInfo, GuessNumber } from './dto';

const quearyKeys = {
  game_info: ['game_info'] as const,
  is_already_played: ['is_already_played'] as const,
  result: ['result'] as const,
};

const useGetGameInfoQuery = () => {
  const fetcher = () => axios.get('/game/baseball/game-info').then(({ data }) => data);

  return useQuery<GameInfo>(quearyKeys.game_info, fetcher);
};

const useGetIsAlreadyPlayedQuery = () => {
  const fetcher = () => axios.get('/game/baseball/is_already_played').then(({ data }) => data);

  return useQuery<boolean>(quearyKeys.is_already_played, fetcher);
};

const useGameStartMutation = ({ bettingPoint }: { bettingPoint: number }) => {
  const fetcher = () => axios.post('/game/baseball/start', { bettingPoint }).then(({ data }) => data);

  return useMutation(fetcher);
};

const useGuessMutation = ({ guessNumber }: { guessNumber: GuessNumber }) => {
  const fetcher = () => axios.post('/game/baseball/guess', { guessNumber }).then(({ data }) => data);

  return useMutation(fetcher);
};

const useGetResultQuery = () => {
  const fetcher = () => axios.get('/game/baseball/result').then(({ data }) => data);

  return useQuery<GameResultInfo>(quearyKeys.result, fetcher);
};

export { useGetGameInfoQuery, useGetIsAlreadyPlayedQuery, useGameStartMutation, useGuessMutation, useGetResultQuery };
