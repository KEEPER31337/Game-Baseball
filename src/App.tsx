import React, { useState } from 'react';
import GameStart from './screens/GameStart';
import GamePlay from './screens/GamePlay';

const App = () => {
  const [playMode, setPlayMode] = useState(false);

  const onStart = () => {
    setPlayMode(true);
  };

  return (
    <div className="grid h-screen w-screen place-items-center bg-mainBlack">
      {playMode ? <GamePlay /> : <GameStart onStart={onStart} />}
    </div>
  );
};

export default App;
