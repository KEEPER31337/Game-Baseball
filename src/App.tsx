import React, { useEffect, useState } from 'react';
import GameStart from './screens/GameStart';
import GamePlay from './screens/GamePlay';
import { useGameStartMutation, useGetBaseBallStatusQuery } from './api/baseballApi';

const App = () => {
  const [bettingPoint, setBettingPoint] = useState<string>('');
  const [playMode, setPlayMode] = useState(false);
  const { mutate: gameStart } = useGameStartMutation();
  const { data: baseballStatus } = useGetBaseBallStatusQuery();

  const handleStart = () => {
    gameStart({ bettingPoint: Number(bettingPoint) });
    setPlayMode(true);
  };

  useEffect(() => {
    if (baseballStatus?.status === 'PLAYING') {
      setPlayMode(true);
      return;
    }
    setPlayMode(false);
  }, [baseballStatus]);

  if (!baseballStatus) return null;
  return (
    <div className="grid h-screen w-screen place-items-center bg-mainBlack">
      {playMode ? (
        <GamePlay bettingPoint={bettingPoint} />
      ) : (
        <GameStart
          status={baseballStatus.status}
          onStart={handleStart}
          bettingPoint={bettingPoint}
          setBettingPoint={setBettingPoint}
        />
      )}
    </div>
  );
};

export default App;
