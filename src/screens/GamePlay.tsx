import React, { useRef, useState } from 'react';
import { CiBaseball } from 'react-icons/ci';
import { AuthCodeRef } from 'react-auth-code-input';
import PointInfo from '../components/PointInfo';
import CountdownBar from '../components/CountdownBar';
import TurnInfoBoard from '../components/TurnInfoBoard';
import NumberInput from '../components/NumberInput';
import InfoModal from '../components/InfoModal';
import { useGuessMutation } from '../api/baseballApi';

const GamePlay = () => {
  const [guessNumber, setGuessNumber] = useState('');
  const [infoModalOpen, setInfoModalOpen] = useState<boolean>(false);

  const AuthInputRef = useRef<AuthCodeRef>(null);
  const { mutate: guess } = useGuessMutation();

  const handleGuessClick = () => {
    guess(
      { guessNumber },
      {
        onSuccess: (data) => {
          AuthInputRef.current?.clear();
          // TODO 모달 띄워주기
        },
      },
    );
  };

  return (
    <div>
      <PointInfo earnablePoint={0} />
      <CountdownBar isTurnStart />
      <TurnInfoBoard
        results={[{ ball: 1, strike: 2, guessNumber: '1234' }, null, { ball: 2, strike: 1, guessNumber: '2345' }]}
        round={9}
      />
      <div className="flex items-center space-x-4">
        <NumberInput AuthInputRef={AuthInputRef} onChange={(res: string) => setGuessNumber(res)} />
        <button
          type="button"
          className="group enabled:cursor-pointer enabled:hover:rounded-full enabled:hover:bg-pointBlue/20 "
          onClick={handleGuessClick}
          disabled={Number(guessNumber) < 1000 || Number(guessNumber) > 9999}
        >
          <CiBaseball size={50} className=" fill-pointBlue group-disabled:fill-pointBlue/20" />
        </button>
      </div>
      <button className="bg-pointBlue/50" type="submit" onClick={() => setInfoModalOpen(true)}>
        confirm modal 버튼
      </button>
      {infoModalOpen && (
        <InfoModal
          infoType="result"
          results={{ ball: 0, strike: 2, guessNumber: '1234' }}
          onClose={() => setInfoModalOpen(false)}
        />
      )}
    </div>
  );
};

export default GamePlay;
