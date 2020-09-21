import React from 'react';
import { TwitterPicker, TwitterPickerProps } from 'react-color';
import './ColorPicker.css';

interface Props extends TwitterPickerProps {}

export const ColorPicker: React.FC<Props> = ({ ...props }) => {
  return (
    <TwitterPicker
      colors={[
        '#FF6900',
        '#FCB900',
        '#00D084',
        '#0693E3',
        '#ABB8C3',
        '#EB144C',
        '#9900EF',
      ]}
      {...props}
    />
  );
};
