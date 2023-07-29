import React, { useState } from 'react';
import GameStart from './screens/GameStart';
import GamePlay from './screens/GamePlay';
import { useGameStartMutation } from './api/baseballApi';

const App = () => {
  const [bettingPoint, setBettingPoint] = useState<string>('');
  const [playMode, setPlayMode] = useState(false);
  const { mutate: gameStart } = useGameStartMutation();

  const handleStart = () => {
    gameStart({ bettingPoint: Number(bettingPoint) });
    setPlayMode(true);
  };

  return (
    <div className="grid h-screen w-screen place-items-center bg-mainBlack">
      {playMode ? (
        <GamePlay bettingPoint={bettingPoint} />
      ) : (
        <GameStart onStart={handleStart} bettingPoint={bettingPoint} setBettingPoint={setBettingPoint} />
      )}
    </div>
  );
};

export default App;
