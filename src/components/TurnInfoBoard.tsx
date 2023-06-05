import React from 'react';
import TurnInfoCard, { ResultDto } from './TurnInfoCard';

interface TurnInfoBoardProps {
  results: Array<ResultDto | null>;
  round: number;
}

const TurnInfoBoard = ({ results, round }: TurnInfoBoardProps) => {
  const renderList = new Array<'Ready' | 'Playing' | 'Finished'>(results.length).fill('Finished');
  if (round > results.length) renderList.push('Playing');
  if (round > results.length + 1) renderList.push(...new Array(round - results.length - 1).fill('Ready'));
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
