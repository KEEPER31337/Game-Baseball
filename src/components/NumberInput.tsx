import React, { useState } from 'react';
import OTPInput from 'otp-input-react';

const NumberInput = () => {
  const [number, setNumber] = useState('');

  return (
    <OTPInput
      value={number}
      onChange={setNumber}
      OTPLength={4}
      otpType="number"
      inputClassName="border border-dashed border-pointBlue bg-transparent text-[32px] focus:outline-none"
      inputStyles={{
        width: '50px',
        height: '60px',
        'margin-right': '5px',
      }}
      disabled={false}
      autoFocus
    />
  );
};

export default NumberInput;
