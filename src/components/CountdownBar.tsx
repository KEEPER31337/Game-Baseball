import React, { useState, useRef, useEffect } from 'react';

interface CountdownProps {
  flag: boolean;
}

const CountdownBar = ({ flag }: CountdownProps) => {
  const maxCount = 30;
  const [count, setCount] = useState(maxCount);
  const interval = useRef<NodeJS.Timeout | null>(null);
  const countPercentage = (count / maxCount) * 100;

  const handleStart = () => {
    if (!interval.current) {
      interval.current = setInterval(() => {
        setCount((cnt) => cnt - 1);
      }, 1000);
    }
  };

  const handleStop = () => {
    if (interval.current) {
      clearInterval(interval.current);
      interval.current = null;
    }
  };

  useEffect(() => {
    if (count < 1) handleStop();
  }, [count]);

  useEffect(() => {
    if (flag === true) {
      setCount(maxCount);
      handleStart();
    } else handleStop();
  }, [flag]);

  return (
    <div className="App">
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
