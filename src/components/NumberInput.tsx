import React from 'react';
import AuthCode, { AuthCodeRef } from 'react-auth-code-input';

interface NumberInputProps {
  AuthInputRef: React.RefObject<AuthCodeRef>;
  onChange: (res: string) => void;
}

const NumberInput = ({ AuthInputRef, onChange }: NumberInputProps) => {
  return (
    <AuthCode
      ref={AuthInputRef}
      allowedCharacters="numeric"
      onChange={onChange}
      length={4}
      containerClassName="ml-6"
      inputClassName="w-[50px] h-[60px] border border-dashed border-pointBlue bg-transparent text-[32px] text-center mr-3 focus:outline-none"
      autoFocus
    />
  );
};

export default NumberInput;
