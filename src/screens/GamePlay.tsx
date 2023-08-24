import React, { useEffect, useRef, useState } from 'react';
import { CiBaseball } from 'react-icons/ci';
import { AuthCodeRef } from 'react-auth-code-input';
import PointInfo from '../components/PointInfo';
import CountdownBar from '../components/CountdownBar';
import TurnInfoBoard from '../components/TurnInfoBoard';
import NumberInput from '../components/NumberInput';
import InfoModal, { InfoType } from '../components/InfoModal';
import { useGuessMutation, useGetResultQuery } from '../api/baseballApi';
import { GameInfo, ResultInfo } from '../api/dto';
import NoticeEnd from '../components/NoticeEnd';

const INITIAL_TIME_PER_TURN = 30;
const MOBLIE_MAX_WIDTH = 768;

interface GamePlayProps {
  gameInfo: GameInfo;
  initEarnablePoint: number;
}

const GamePlay = ({ gameInfo, initEarnablePoint }: GamePlayProps) => {
  const [isTurnStart, setIsTurnStart] = useState(true);
  const [guessNumber, setGuessNumber] = useState('');
  const [gameResults, setGameResults] = useState<(ResultInfo | null)[]>([]);
  const [earnablePoint, setEarnablePoint] = useState(initEarnablePoint);
  const [turnRemainTime, setTurnRemainTime] = useState(INITIAL_TIME_PER_TURN);
  const [infoModalSetting, setInfoModalSetting] = useState<{
    type: InfoType;
    result: ResultInfo | null;
  }>({
    type: 'result',
    result: null,
  });
  const { data: currentGameCondition, refetch: refetchCurrentGameCondition } = useGetResultQuery();
  const isWin: boolean = gameResults.at(-1)?.strike === gameInfo.guessNumberLength ?? false;
  const isLose: boolean = (gameResults.length === gameInfo.tryCount && !isWin) ?? false;

  const AuthInputRef = useRef<AuthCodeRef>(null);
  const { mutate: guess } = useGuessMutation();

  const handleGuessClick = () => {
    guess(
      { guessNumber },
      {
        onSuccess: (data) => {
          AuthInputRef.current?.clear();
          setInfoModalSetting({ type: 'result', result: data.results.at(-1) });
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
      refetchCurrentGameCondition();
      setIsTurnStart(false);
    }
  }, [turnRemainTime]);

  useEffect(() => {
    if (currentGameCondition) {
      setGameResults(currentGameCondition.results);
      setEarnablePoint(currentGameCondition.earnablePoint);
    }
  }, [currentGameCondition]);

  return (
    <div>
      <PointInfo earnablePoint={earnablePoint} />
      {innerWidth > MOBLIE_MAX_WIDTH && <div className="my-5" />}
      <CountdownBar
        isTurnStart={!isWin && !isLose && isTurnStart}
        initialTimePerTurn={INITIAL_TIME_PER_TURN}
        turnRemainTime={turnRemainTime}
        setTurnRemainTime={setTurnRemainTime}
      />
      {innerWidth > MOBLIE_MAX_WIDTH && <div className="my-8" />}
      <TurnInfoBoard isWin={isWin} results={gameResults} round={gameInfo.tryCount} />
      {innerWidth > MOBLIE_MAX_WIDTH && <div className="my-8" />}
      {!isWin && !isLose && (
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
      {isWin && <NoticeEnd endType="win" />}
      {isLose && <NoticeEnd endType="lose" />}
    </div>
  );
};

export default GamePlay;
