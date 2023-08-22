import React, { useEffect, useRef, useState } from 'react';
import { CiBaseball } from 'react-icons/ci';
import { AuthCodeRef } from 'react-auth-code-input';
import PointInfo from '../components/PointInfo';
import CountdownBar from '../components/CountdownBar';
import TurnInfoBoard from '../components/TurnInfoBoard';
import NumberInput from '../components/NumberInput';
import InfoModal, { InfoType } from '../components/InfoModal';
import { useGuessMutation, useGetGameInfoQuery, useGetResultQuery } from '../api/baseballApi';
import { ResultInfo } from '../api/dto';

const INITIAL_TIME_PER_TURN = 30;
const MOBLIE_MAX_WIDTH = 768;

interface GamePlayProps {
  bettingPoint: string;
}

const GamePlay = ({ bettingPoint }: GamePlayProps) => {
  const [isTurnStart, setIsTurnStart] = useState(true);
  const [guessNumber, setGuessNumber] = useState('');
  const [gameResults, setGameResults] = useState<(ResultInfo | null)[]>([]);
  const [turnRemainTime, setTurnRemainTime] = useState(INITIAL_TIME_PER_TURN);
  const [infoModalSetting, setInfoModalSetting] = useState<{
    type: InfoType;
    result: ResultInfo | null;
  }>({
    type: 'result',
    result: null,
  });
  const { data: gameInfo, isLoading: gameInfoLoading } = useGetGameInfoQuery();
  const { data: currentGameCondition } = useGetResultQuery();
  const isWin: boolean = (gameInfo && gameResults.at(-1)?.strike === gameInfo.guessNumberLength) ?? false;

  const AuthInputRef = useRef<AuthCodeRef>(null);
  const { mutate: guess } = useGuessMutation();

  const handleGuessClick = () => {
    guess(
      { guessNumber },
      {
        onSuccess: (data) => {
          AuthInputRef.current?.clear();
          setInfoModalSetting({ type: 'result', result: data.results.at(-1) });
          setGameResults(data.results);
          setIsTurnStart(false);
        },
      },
    );
  };

  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  useEffect(() => {
    function resizeListener() {
      setInnerWidth(window.innerWidth);
    }
    window.addEventListener('resize', resizeListener);
  });

  useEffect(() => {
    if (turnRemainTime === 0) {
      setInfoModalSetting({
        type: 'next',
        result: null,
      });
      setGameResults((prev) => [...prev, null]);
      setIsTurnStart(false);
    }
  }, [turnRemainTime]);

  useEffect(() => {
    if (currentGameCondition) {
      setGameResults(currentGameCondition.results);
    }
  }, [currentGameCondition]);

  if (gameInfoLoading || !gameInfo) return null;
  return (
    <div>
      <PointInfo earnablePoint={bettingPoint} />
      {innerWidth > MOBLIE_MAX_WIDTH && <div className="my-5" />}
      <CountdownBar
        isTurnStart={!isWin && isTurnStart}
        initialTimePerTurn={INITIAL_TIME_PER_TURN}
        turnRemainTime={turnRemainTime}
        setTurnRemainTime={setTurnRemainTime}
      />
      {innerWidth > MOBLIE_MAX_WIDTH && <div className="my-8" />}
      <TurnInfoBoard isWin={isWin} results={gameResults} round={gameInfo.tryCount} />
      {innerWidth > MOBLIE_MAX_WIDTH && <div className="my-8" />}
      {!isWin && (
        <div className="flex items-center space-x-4">
          <NumberInput AuthInputRef={AuthInputRef} onChange={(res: string) => setGuessNumber(res)} />
          <button
            type="button"
            className="group enabled:cursor-pointer enabled:hover:rounded-full enabled:hover:bg-pointBlue/20"
            onClick={handleGuessClick}
            disabled={guessNumber.length !== gameInfo.guessNumberLength}
          >
            <CiBaseball size={50} className="fill-pointBlue group-disabled:fill-pointBlue/20" />
          </button>
        </div>
      )}
      {!isTurnStart && (
        <InfoModal
          infoType={infoModalSetting.type}
          result={infoModalSetting.result}
          onClose={() => {
            setIsTurnStart(true);
          }}
        />
      )}
      {isWin && (
        <div className="absolute left-0 top-0 z-10 flex h-screen w-screen flex-col items-center justify-center bg-black/70 active:hidden">
          <p className="text-center text-2xl font-semibold">congraturation</p>
          <p className="text-center text-2xl font-semibold text-pointBlue">YOU WIN!</p>
          <p className="mt-2 text-center text-[10px] text-gray-400">
            오늘 게임 횟수를 모두 소진하였습니다.
            <br />
            선명한 현황판을 보고 싶다면 화면을 눌러주세요.
          </p>
        </div>
      )}
    </div>
  );
};

export default GamePlay;
