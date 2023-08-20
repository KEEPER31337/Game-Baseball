import React, { useState } from 'react';
import GameStart from './screens/GameStart';
import GamePlay from './screens/GamePlay';
import { useGameStartMutation, useGetIsAlreadyPlayedQuery, useGetResultQuery } from './api/baseballApi';

const App = () => {
  const [bettingPoint, setBettingPoint] = useState<string>('');
  const [playMode, setPlayMode] = useState(false);
  const { mutate: gameStart } = useGameStartMutation();
  const { data: isPlayed } = useGetIsAlreadyPlayedQuery();
  const { data: currentGameCondition } = useGetResultQuery(isPlayed ?? false);

  const handleStart = () => {
    gameStart({ bettingPoint: Number(bettingPoint) });
    setPlayMode(true);
  };

  return (
    <div className="grid h-screen w-screen place-items-center bg-mainBlack">
      {playMode && currentGameCondition ? (
        <GamePlay bettingPoint={bettingPoint} currentGameCondition={currentGameCondition} />
      ) : (
        <GameStart
          isPlayed={isPlayed ?? false}
          onStart={handleStart}
          bettingPoint={bettingPoint}
          setBettingPoint={setBettingPoint}
        />
      )}
    </div>
  );
};

export default App;
