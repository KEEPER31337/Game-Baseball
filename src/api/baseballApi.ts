import axios from 'axios';
import { useQuery, useMutation } from 'react-query';
import { GameInfo, GameResultInfo } from './dto';

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
  const fetcher = () => axios.get('/game/baseball/is-already-played').then(({ data }) => data);

  return useQuery<boolean>(quearyKeys.is_already_played, fetcher);
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useGetResultQuery = (isPlayed: boolean) => {
  const fetcher = () => axios.get('/game/baseball/result').then(({ data }) => data);
  /* TODO 백엔드 횟수제한 1회로 다시 맞춰지면 enabled에 isPlayed 적용해야 함 */
  return useQuery<GameResultInfo>(quearyKeys.result, fetcher, { enabled: true });
};

export { useGetGameInfoQuery, useGetIsAlreadyPlayedQuery, useGameStartMutation, useGuessMutation, useGetResultQuery };
