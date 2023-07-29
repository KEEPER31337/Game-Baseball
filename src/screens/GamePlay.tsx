import React, { useState } from 'react';
import { CiBaseball } from 'react-icons/ci';
import PointInfo from '../components/PointInfo';
import CountdownBar from '../components/CountdownBar';
import TurnInfoBoard from '../components/TurnInfoBoard';
import NumberInput from '../components/NumberInput';
import InfoModal from '../components/InfoModal';
import { useGetGameInfoQuery } from '../api/baseballApi';

interface GamePlayProps {
  bettingPoint: string;
}

const GamePlay = ({ bettingPoint }: GamePlayProps) => {
  const [guessNumber, setGuessNumber] = useState('');
  const [infoModalOpen, setInfoModalOpen] = useState<boolean>(false);
  const { data: gameInfo, isLoading: gameInfoLoading } = useGetGameInfoQuery();

  if (gameInfoLoading || !gameInfo) return null;
  return (
    <div>
      <PointInfo earnablePoint={bettingPoint} />
      <CountdownBar isTurnStart />
      <TurnInfoBoard
        results={[{ ball: 1, strike: 2, guessNumber: '1234' }, null, { ball: 2, strike: 1, guessNumber: '2345' }]}
        round={gameInfo.tryCount}
      />
      <div className="flex items-center space-x-1">
        <NumberInput onChange={(res: string) => setGuessNumber(res)} />
        <CiBaseball
          size={50}
          className={
            guessNumber.length === 4
              ? 'cursor-pointer fill-pointBlue hover:rounded-full hover:bg-pointBlue/20'
              : 'text-gray-500'
          }
          onClick={() => {
            setInfoModalOpen(true);
          }}
        />
      </div>
      {infoModalOpen && (
        <InfoModal
          infoType="result"
          results={{ ball: 0, strike: 2, guessNumber: '1234' }}
          onClose={() => setInfoModalOpen(false)}
        />
      )}
    </div>
  );
};

export default GamePlay;
