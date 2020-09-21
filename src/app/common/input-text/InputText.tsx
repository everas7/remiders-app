import React from 'react';
import { Form, Col, FormControlProps } from 'react-bootstrap';

interface Props extends FormControlProps {
  placeholder: string;
  maxCharacters?: number;
}

export const InputText: React.FC<Props> = ({
  onChange,
  maxCharacters,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (maxCharacters && e.target.value?.length > maxCharacters) {
      e.preventDefault();
      return;
    }
    onChange && onChange(e);
  };

  return (
    <Form.Control type="text" {...props} onChange={handleChange}></Form.Control>
  );
};
