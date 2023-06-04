import React, { useState } from 'react';

const GameStart = ({ onStart }: { onStart: any }) => {
  const [point, setPoint] = useState<string>('');

  return (
    <div className="flex h-full w-full flex-col place-content-center place-items-center">
      <div className="mb-10 text-[40px] font-bold text-pointBlue">BASEBALL GAME</div>
      <div className="mb-10 text-2xl">batting your point...</div>
      <input
        value={point}
        onChange={(e) => {
          setPoint(e.target.value.replace(/[^0-9]/g, ''));
        }}
        className="mb-20 w-[400px] border-[1px] border-pointBlue bg-transparent text-center text-[40px] focus:outline-none"
        type="text"
        placeholder="10 ~ 1000"
      />
      <button
        disabled={parseInt(point, 10) > 1000 || parseInt(point, 10) < 10 || point === ''}
        className="text-2xl enabled:hover:text-pointBlue"
        onClick={onStart}
        type="button"
      >
        START
      </button>
    </div>
  );
};

export default GameStart;
