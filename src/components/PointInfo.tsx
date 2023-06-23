import React from 'react';

interface PointInfoProps {
  point: number;
}

const PointInfo = ({ point }: PointInfoProps) => {
  return (
    <div className="grid place-items-center">
      <p className="text-2xl">POINT {point}</p>
    </div>
  );
};

export default PointInfo;
