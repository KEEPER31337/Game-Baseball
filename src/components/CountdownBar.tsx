import React, { useState, useRef, useEffect } from 'react';

interface CountdownBarProps {
  isTurnStart: boolean;
}

const CountdownBar = ({ isTurnStart }: CountdownBarProps) => {
  const maxCount = 30;
  const [count, setCount] = useState(maxCount);
  const interval = useRef<NodeJS.Timeout | null>(null);
  const countPercentage = (count / maxCount) * 100;

  const countdownStart = () => {
    if (!interval.current) {
      interval.current = setInterval(() => {
        setCount((cnt) => cnt - 1);
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
    if (count < 1) countdownStop();
  }, [count]);

  useEffect(() => {
    if (isTurnStart === true) {
      setCount(maxCount);
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
