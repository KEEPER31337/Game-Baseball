import React from 'react';

type digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
export interface ResultDto {
  ball: number;
  strike: number;
  guessNumber: `${digit}${digit}${digit}${digit}`;
}

interface TurnInfoCardProps {
  index: number;
  status: 'Ready' | 'Playing' | 'Finished';
  result?: ResultDto | null;
}

const TurnInfoCard = ({ index, status, result }: TurnInfoCardProps) => {
  return (
    <div
      className={`flex border-2 bg-mainBlack text-xl ${
        status === 'Playing' ? 'border-pointBlue' : 'border-transparent'
      }`}
    >
      <p className={`w-12 text-right ${status === 'Playing' ? 'text-pointBlue' : 'text-pointGray'}`}>{index}</p>
      <p className="w-32 text-center">{status === 'Finished' && result === null ? '❌' : result?.guessNumber}</p>
      <p className="w-14 tracking-widest">
        {result?.ball && result?.ball !== 0 ? '🟢' : '⚫️'} {result?.ball}
      </p>
      <p className="w-16 tracking-widest">
        {result?.strike && result?.strike !== 0 ? '🟡' : '⚫️'} {result?.strike}
      </p>
    </div>
  );
};

export default TurnInfoCard;
