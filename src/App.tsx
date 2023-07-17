import React from 'react';
import GameStart from './screens/GameStart';
import GamePlay from './screens/GamePlay';

const App = () => {
  const playMode = true;
  // TODO const [playMode, setPlayMode] = useState(false);

  return (
    <div className="grid h-screen w-screen place-items-center bg-mainBlack">
      {playMode ? <GamePlay /> : <GameStart />}
    </div>
  );
};

export default App;
