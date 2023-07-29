import React from 'react';

interface PointInfoProps {
  earnablePoint: string;
}

const PointInfo = ({ earnablePoint }: PointInfoProps) => {
  return (
    <div className="mb-1 grid place-items-center">
      <p className="text-[32px]">POINT {earnablePoint}</p>
    </div>
  );
};

export default PointInfo;
