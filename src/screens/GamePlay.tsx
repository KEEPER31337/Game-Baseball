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
      <CountdownBar />
      <TurnInfoBoard />
      <div className="flex items-center space-x-4">
        <NumberInput />
        <CiBaseball size={50} className=" fill-pointBlue hover:rounded-full hover:bg-pointBlue/10" />
      </div>
    </div>
  );
};

export default GamePlay;
