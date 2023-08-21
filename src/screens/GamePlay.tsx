import React, { useEffect, useRef, useState } from 'react';
import { CiBaseball } from 'react-icons/ci';
import { AuthCodeRef } from 'react-auth-code-input';
import PointInfo from '../components/PointInfo';
import CountdownBar from '../components/CountdownBar';
import TurnInfoBoard from '../components/TurnInfoBoard';
import NumberInput from '../components/NumberInput';
import InfoModal, { InfoType } from '../components/InfoModal';
import { useGuessMutation, useGetGameInfoQuery, useGetResultQuery } from '../api/baseballApi';
import { GameResultInfo, ResultInfo } from '../api/dto';

const INITIAL_TIME_PER_TURN = 30;
const MOBLIE_MAX_WIDTH = 768;

interface GamePlayProps {
  bettingPoint: string;
}

const GamePlay = ({ bettingPoint }: GamePlayProps) => {
  const [guessNumber, setGuessNumber] = useState('');
  const [gameResults, setGameResults] = useState<(ResultInfo | null)[]>([]);
  const [turnRemainTime, setTurnRemainTime] = useState(INITIAL_TIME_PER_TURN);
  const [infoModalSetting, setInfoModalSetting] = useState<{
    type: InfoType;
    open: boolean;
    result: ResultInfo | null;
  }>({
    type: 'result',
    open: false,
    result: null,
  });
  const { data: gameInfo, isLoading: gameInfoLoading } = useGetGameInfoQuery();
  const { data: currentGameCondition } = useGetResultQuery();

  const AuthInputRef = useRef<AuthCodeRef>(null);
  const { mutate: guess } = useGuessMutation();

  const handleGuessClick = () => {
    guess(
      { guessNumber },
      {
        onSuccess: (data) => {
          AuthInputRef.current?.clear();
          setInfoModalSetting({ type: 'result', open: true, result: data.results.at(-1) });
          setGameResults(data.results);
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
        open: true,
        result: null,
      });
      setGameResults((prev) => [...prev, null]);
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
        isTurnStart
        initialTimePerTurn={INITIAL_TIME_PER_TURN}
        turnRemainTime={turnRemainTime}
        setTurnRemainTime={setTurnRemainTime}
      />
      {innerWidth > MOBLIE_MAX_WIDTH && <div className="my-8" />}
      <TurnInfoBoard results={gameResults} round={gameInfo.tryCount} />
      {innerWidth > MOBLIE_MAX_WIDTH && <div className="my-8" />}
      <div className="flex items-center space-x-4">
        <NumberInput AuthInputRef={AuthInputRef} onChange={(res: string) => setGuessNumber(res)} />
        <button
          type="button"
          className="group enabled:cursor-pointer enabled:hover:rounded-full enabled:hover:bg-pointBlue/20 "
          onClick={handleGuessClick}
          disabled={guessNumber.length !== gameInfo.guessNumberLength}
        >
          <CiBaseball size={50} className=" fill-pointBlue group-disabled:fill-pointBlue/20" />
        </button>
      </div>
      {infoModalSetting.open && (
        <InfoModal
          infoType={infoModalSetting.type}
          result={infoModalSetting.result}
          onClose={() => setInfoModalSetting((prev) => ({ ...prev, open: false }))}
        />
      )}
    </div>
  );
};

export default GamePlay;
