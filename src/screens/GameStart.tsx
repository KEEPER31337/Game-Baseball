import React, { useState } from 'react';
import { useGetIsAlreadyPlayedQuery } from '../api/baseballApi';

const MIN_BETTING_POINT = 10;
const MAX_BETTING_POINT = 1000;

interface GameStartProps {
  onStart: () => void;
  bettingPoint: string;
  setBettingPoint: React.Dispatch<React.SetStateAction<string>>;
}

const GameStart = ({ onStart, bettingPoint, setBettingPoint }: GameStartProps) => {
  const { data: isPlayed } = useGetIsAlreadyPlayedQuery();

  return (
    <div className="flex h-full w-full flex-col place-content-center place-items-center">
      <div className="mb-10 text-[40px] font-bold text-pointBlue">BASEBALL GAME</div>

      {isPlayed ? (
        <div className="mb-10 text-2xl">You$ve already played the game</div>
      ) : (
        <div className="flex flex-col place-content-center place-items-center">
          <div className="mb-10 text-2xl">Please enter your betting point!</div>{' '}
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
      )}
    </div>
  );
};

export default GameStart;
