import React from 'react';

interface ResultDto {
  ball: number;
  strike: number;
}

interface TurnInfoCardProps {
  index: number;
  value?: string;
  status: 'Ready' | 'Playing' | 'Finished';
  result?: ResultDto;
}

const TurnInfoCard = ({ index, value, status, result }: TurnInfoCardProps) => {
  return (
    <div
      className={`flex border-2 bg-mainBlack text-xl ${
        status === 'Playing' ? 'border-pointBlue' : 'border-transparent'
      }`}
    >
      <p className={`w-12 text-right ${status === 'Playing' ? 'text-pointBlue' : 'text-pointGray'}`}>{index}</p>
      <p className="w-32 text-center">{value}</p>
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
