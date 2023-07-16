import React, { useState } from 'react';
import { CiBaseball } from 'react-icons/ci';
import PointInfo from '../components/PointInfo';
import CountdownBar from '../components/CountdownBar';
import TurnInfoBoard from '../components/TurnInfoBoard';
import NumberInput from '../components/NumberInput';
import InfoModal from '../components/InfoModal';

const GamePlay = () => {
  const [infoModalOpen, setInfoModalOpen] = useState<boolean>(false);

  return (
    <div>
      <PointInfo />
      <CountdownBar isTurnStart />
      <TurnInfoBoard
        results={[{ ball: 1, strike: 2, guessNumber: '1234' }, null, { ball: 2, strike: 1, guessNumber: '2345' }]}
        round={9}
      />
      <div className="flex items-center space-x-4">
        <NumberInput />
        <CiBaseball size={50} className="cursor-pointer fill-pointBlue hover:rounded-full hover:bg-pointBlue/20" />
      </div>
      <button className="bg-pointBlue/50" type="submit" onClick={() => setInfoModalOpen(true)}>
        confirm modal 버튼
      </button>
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
