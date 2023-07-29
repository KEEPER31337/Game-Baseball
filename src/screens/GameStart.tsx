import React, { useState } from 'react';
import { useGetGameInfoQuery, useGetIsAlreadyPlayedQuery } from '../api/baseballApi';

interface GameStartProps {
  onStart: () => void;
  bettingPoint: string;
  setBettingPoint: React.Dispatch<React.SetStateAction<string>>;
}

const GameStart = ({ onStart, bettingPoint, setBettingPoint }: GameStartProps) => {
  const { data: isPlayed } = useGetIsAlreadyPlayedQuery();
  const { data: gameInfo, isLoading: gameInfoLoading } = useGetGameInfoQuery();

  if (gameInfoLoading || !gameInfo) return null;
  return (
    <div className="flex h-full w-full flex-col place-content-center place-items-center">
      <div className="mb-10 text-[40px] font-bold text-pointBlue">BASEBALL GAME</div>
      {isPlayed ? (
        <div className="mb-10 text-2xl">You&apos;ve already played the game!</div>
      ) : (
        <div className="flex flex-col place-content-center place-items-center">
          <div className="mb-10 text-2xl">betting your point...</div>
          <input
            value={bettingPoint}
            onChange={(e) => {
              setBettingPoint(e.target.value.replace(/[^0-9]/g, ''));
            }}
            className="mb-20 w-[400px] border-[1px] border-pointBlue bg-transparent text-center text-[40px] focus:outline-none"
            type="text"
            placeholder={`${gameInfo.minBettingPoint} ~ ${gameInfo.maxBettingPoint}`}
          />
          <button
            disabled={
              parseInt(bettingPoint, 10) > gameInfo.maxBettingPoint ||
              parseInt(bettingPoint, 10) < gameInfo.minBettingPoint ||
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
