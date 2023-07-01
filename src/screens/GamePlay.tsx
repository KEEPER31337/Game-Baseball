import React from 'react';
import PointInfo from '../components/PointInfo';
import CountdownBar from '../components/CountdownBar';
import TurnInfoBoard from '../components/TurnInfoBoard';
import NumberInput from '../components/NumberInput';

const GamePlay = () => {
  return (
    <div>
      <PointInfo earnablePoint={0} />
      <CountdownBar />
      <TurnInfoBoard />
      <NumberInput />
    </div>
  );
};

export default GamePlay;
