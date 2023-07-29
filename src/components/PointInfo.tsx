import React from 'react';

interface PointInfoProps {
  earnablePoint: number;
}

const PointInfo = ({ earnablePoint }: PointInfoProps) => {
  return (
    <div className="grid place-items-center">
      <p className="text-2xl">POINT {earnablePoint}</p>
    </div>
  );
};

export default PointInfo;
