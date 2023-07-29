import React from 'react';
import AuthCode from 'react-auth-code-input';

interface NumberInputProps {
  onChange: (res: string) => void;
}

const NumberInput = ({ onChange }: NumberInputProps) => {
  return (
    <AuthCode
      allowedCharacters="numeric"
      onChange={onChange}
      length={4}
      inputClassName="w-[50px] h-[60px] border border-dashed border-pointBlue bg-transparent text-[32px] text-center mr-3 focus:outline-none"
      autoFocus
    />
  );
};

export default NumberInput;
