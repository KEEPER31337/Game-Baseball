import React, { useState, useRef, useEffect } from 'react';
import { ResultDto } from './TurnInfoCard';

interface InfoModalProps {
  onClose: () => void;
  InfoType: 'win' | 'lose' | 'next' | 'result';
  results?: ResultDto;
}

const InfoModal = ({ onClose, InfoType, results }: InfoModalProps) => {
  const [mainInfoText, setMainInfoText] = useState<string>('');
  const [subInfoText, setSubInfoText] = useState<string>('');
  useEffect(() => {
    switch (InfoType) {
      case 'win':
        setMainInfoText('congraturation');
        setSubInfoText('YOU WIN!');
        break;
      case 'lose':
        setMainInfoText('no more chance');
        setSubInfoText('GAME OVER');
        break;
      case 'next':
        setMainInfoText("time's up");
        setSubInfoText('NEXT TURN');
        break;
      default:
        setMainInfoText(String(results?.guessNumber));
        setSubInfoText(`STRIKE ${String(results?.strike)} BALL ${String(results?.ball)}`);
        break;
    }
  }, []);

  const [count, setCount] = useState(3);
  const interval = useRef<NodeJS.Timeout>();

  useEffect(() => {
    interval.current = setInterval(() => {
      setCount((cnt) => cnt - 1);
    }, 1000);

    return () => clearInterval(interval.current);
  }, []);

  useEffect(() => {
    if (count === 1) {
      clearInterval(interval.current);
      onClose();
    }
  }, [count]);

  return (
    <div className="absolute left-0 top-0 z-10 flex h-screen w-screen items-center justify-center bg-black/50">
      <div className="flex h-[260px] w-[490px] flex-col justify-center space-y-4 border bg-black text-center text-4xl drop-shadow-[0px_0px_5px_rgba(76,238,249,0.3)]">
        <p>{mainInfoText}</p>
        <p className="drop-shadow-[0px_0px_1px_rgba(76,238,249,1)]">{subInfoText}</p>
      </div>
    </div>
  );
};

export default InfoModal;
