import React from 'react';
import TimePicker from 'react-time-picker';
import './InputTime.css';

interface Props {
  value: Date | string;
  onChange: (value: string) => void;
}

export const InputTime: React.FC<Props> = ({ ...props }) => {
  return (
    <TimePicker
      clearIcon={null}
      clockIcon={null}
      disableClock={true}
      {...props}
    />
  );
};
