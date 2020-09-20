import React from 'react';
import { Form, Col, FormControlProps, } from 'react-bootstrap';

interface Props extends FormControlProps {
  placeholder: string;
}

export const InputText: React.FC<Props> = ({ ...props }) => {
  return <Form.Control type="text" {...props}></Form.Control>;
};
