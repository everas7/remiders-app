import React from 'react';
import Select, { Props as SelectProps } from 'react-select';

interface Props extends SelectProps {}

export const InputSelect: React.FC<Props> = ({
  isSearchable = true,
  isClearable = false,
  ...props
}) => {
  return (
    <Select
      className="basic-single"
      classNamePrefix="select"
      isClearable={isClearable}
      isSearchable={isSearchable}
      name="color"
      {...props}
    />
  );
};
