import React from 'react';
import TurnInfoCard from './TurnInfoCard';
import { ResultInfo } from '../api/dto';

interface TurnInfoBoardProps {
  results: Array<ResultInfo | null>;
  round: number;
}

const TurnInfoBoard = ({ results, round }: TurnInfoBoardProps) => {
  const renderList: Array<'Ready' | 'Playing' | 'Finished'> = Array.from({ length: round }, (v, i) => {
    if (i === results.length) return 'Playing';
    if (i > results.length) return 'Ready';
    return 'Finished';
  });
  return (
    <div>
      {renderList.map((status, index) => (
        /* eslint-disable react/no-array-index-key */
        <TurnInfoCard key={index} index={index + 1} result={results?.[index]} status={status} />
      ))}
    </div>
  );
};

export default TurnInfoBoard;
