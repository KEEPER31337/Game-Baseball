import React, { useEffect, useRef, useState } from 'react';
import { CiBaseball } from 'react-icons/ci';
import { AuthCodeRef } from 'react-auth-code-input';
import PointInfo from '../components/PointInfo';
import CountdownBar from '../components/CountdownBar';
import TurnInfoBoard from '../components/TurnInfoBoard';
import NumberInput from '../components/NumberInput';
import InfoModal, { InfoType } from '../components/InfoModal';
import { useGuessMutation, useGetGameInfoQuery } from '../api/baseballApi';
import { ResultInfo } from '../api/dto';

const INITIAL_TIME_PER_TURN = 30;

const GamePlay = () => {
  const [guessNumber, setGuessNumber] = useState('');
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

  const AuthInputRef = useRef<AuthCodeRef>(null);
  const { mutate: guess } = useGuessMutation();

  const handleGuessClick = () => {
    guess(
      { guessNumber },
      {
        onSuccess: (data) => {
          AuthInputRef.current?.clear();
          setInfoModalSetting({ type: 'result', open: true, result: data.results.at(-1) });
        },
      },
    );
  };

  useEffect(() => {
    if (turnRemainTime === 0) {
      setInfoModalSetting({
        type: 'next',
        open: true,
        result: null,
      });
    }
  }, [turnRemainTime]);

  if (gameInfoLoading || !gameInfo) return null;
  return (
    <div>
      <PointInfo earnablePoint={0} />
      <CountdownBar
        isTurnStart
        initialTimePerTurn={INITIAL_TIME_PER_TURN}
        turnRemainTime={turnRemainTime}
        setTurnRemainTime={setTurnRemainTime}
      />
      <TurnInfoBoard
        results={[{ ball: 1, strike: 2, guessNumber: '1234' }, null, { ball: 2, strike: 1, guessNumber: '2345' }]}
        round={gameInfo.tryCount}
      />
      <div className="flex items-center space-x-4">
        <NumberInput AuthInputRef={AuthInputRef} onChange={(res: string) => setGuessNumber(res)} />
        <button
          type="button"
          className="group enabled:cursor-pointer enabled:hover:rounded-full enabled:hover:bg-pointBlue/20 "
          onClick={handleGuessClick}
          disabled={Number(guessNumber) < 1000 || Number(guessNumber) > 9999}
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
