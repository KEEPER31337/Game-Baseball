import React, { useState } from 'react';

const MIN_BETTING_POINT = 10;
const MAX_BETTING_POINT = 1000;

interface GameStartProps {
  onStart: () => void;
}

const GameStart = ({ onStart }: GameStartProps) => {
  const [bettingPoint, setBettingPoint] = useState<string>('');

  return (
    <div className="flex h-full w-full flex-col place-content-center place-items-center">
      <div className="mb-10 text-[40px] font-bold text-pointBlue">BASEBALL GAME</div>
      <div className="mb-10 text-2xl">betting your point...</div>
      <input
        value={bettingPoint}
        onChange={(e) => {
          setBettingPoint(e.target.value.replace(/[^0-9]/g, ''));
        }}
        className="mb-20 w-[400px] border-[1px] border-pointBlue bg-transparent text-center text-[40px] focus:outline-none"
        type="text"
        placeholder={`${MIN_BETTING_POINT} ~ ${MAX_BETTING_POINT}`}
      />
      <button
        disabled={
          parseInt(bettingPoint, 10) > MAX_BETTING_POINT ||
          parseInt(bettingPoint, 10) < MIN_BETTING_POINT ||
          bettingPoint === ''
        }
        className="text-2xl enabled:hover:text-pointBlue disabled:text-gray-500"
        onClick={onStart}
        type="button"
      >
        START
      </button>
    </div>
  );
};

export default GameStart;
