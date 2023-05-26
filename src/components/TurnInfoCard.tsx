import React from 'react';

interface ResultDto {
  ball: number;
  strike: number;
}

interface TurnInfoCardProps {
  index: number;
  value: string;
  status: 'Ready' | 'Playing' | 'Finished';
  result: ResultDto;
}

const TurnInfoCard = ({ index, value, status, result }: TurnInfoCardProps) => {
  return (
    <div className="flex w-full">
      <p>{index}</p>
      <p>{value}</p>
    </div>
  );
};

export default TurnInfoCard;
