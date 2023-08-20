import React, { useRef, useEffect } from 'react';

interface CountdownBarProps {
  isTurnStart: boolean;
  initialTimePerTurn: number;
  turnRemainTime: number;
  setTurnRemainTime: React.Dispatch<React.SetStateAction<number>>;
}

const CountdownBar = ({ isTurnStart, initialTimePerTurn, turnRemainTime, setTurnRemainTime }: CountdownBarProps) => {
  const interval = useRef<NodeJS.Timeout | null>(null);
  const countPercentage = ((turnRemainTime - 1) / (initialTimePerTurn - 1)) * 100;

  const countdownStart = () => {
    if (!interval.current) {
      interval.current = setInterval(() => {
        setTurnRemainTime((cnt) => cnt - 1);
      }, 1000);
    }
  };

  const countdownStop = () => {
    if (interval.current) {
      clearInterval(interval.current);
      interval.current = null;
    }
  };

  useEffect(() => {
    console.log(turnRemainTime);
    if (turnRemainTime === 0) countdownStop();
  }, [turnRemainTime]);

  useEffect(() => {
    if (isTurnStart === true) {
      setTurnRemainTime(initialTimePerTurn);
      countdownStart();
    } else countdownStop();
  }, [isTurnStart]);

  return (
    <div>
      <div className="h-6 w-[350px] bg-pointGray">
        <div
          style={{ width: `${countPercentage}%` }}
          className="h-6 bg-pointBlue transition-all duration-1000 ease-linear"
        />
      </div>
    </div>
  );
};

export default CountdownBar;
