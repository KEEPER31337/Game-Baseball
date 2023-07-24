import React, { useState } from 'react';
import AuthCode from 'react-auth-code-input';

const NumberInput = () => {
  const [number, setNumber] = useState('');
  const handleOnChange = (res: string) => {
    setNumber(res);
  };

  return (
    <AuthCode
      allowedCharacters="numeric"
      onChange={handleOnChange}
      length={4}
      inputClassName="w-[50px] h-[60px] border border-dashed border-pointBlue bg-transparent text-[32px] text-center mr-3 focus:outline-none"
      autoFocus
    />
  );
};

export default NumberInput;
