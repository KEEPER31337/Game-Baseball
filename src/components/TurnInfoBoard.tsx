import React from 'react';

interface ResultDto {
  ball: number;
  strike: number;
}

interface TurnInfoBoardProps {
  results: Array<ResultDto | null>;
  round: number;
}

const TurnInfoBoard = ({ results, round }: TurnInfoBoardProps) => {
  return <div>모든 회차 정보 섹션 입니다.</div>;
};

export default TurnInfoBoard;
