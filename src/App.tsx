import React, { useState } from 'react';
import GameStart from './screens/GameStart';
import GamePlay from './screens/GamePlay';
import GameEnd from './screens/GameEnd';
import { useGameStartMutation, useGetIsAlreadyPlayedQuery } from './api/baseballApi';

const App = () => {
  const [bettingPoint, setBettingPoint] = useState<string>('');
  const [playMode, setPlayMode] = useState(false);
  const { data: isPlayed } = useGetIsAlreadyPlayedQuery();
  const { mutate: gameStart } = useGameStartMutation();

  const handleStart = () => {
    gameStart({ bettingPoint: Number(bettingPoint) });
    setPlayMode(true);
  };

  return (
    <div className="grid h-screen w-screen place-items-center bg-mainBlack">
      {isPlayed ? (
        <GameEnd />
      ) : (
        <div>
          {playMode ? (
            <GamePlay />
          ) : (
            <GameStart onStart={handleStart} bettingPoint={bettingPoint} setBettingPoint={setBettingPoint} />
          )}
        </div>
      )}
    </div>
  );
};

export default App;
