import React from 'react';
import { CiBaseball } from 'react-icons/ci';
import PointInfo from '../components/PointInfo';
import CountdownBar from '../components/CountdownBar';
import TurnInfoBoard from '../components/TurnInfoBoard';
import NumberInput from '../components/NumberInput';

const GamePlay = () => {
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
    </div>
  );
};

export default GamePlay;
