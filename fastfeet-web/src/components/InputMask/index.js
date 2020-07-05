import React, { useRef, useEffect } from 'react';
import { useField } from '@unform/core';
import PropTypes from 'prop-types';
import { Input, Label, Error } from './styles';

export default function InputMask({ name, label, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue(ref, value) {
        ref.setInputValue(value);
      },
      clearValue(ref) {
        ref.setInputValue('');
      },
    });
  }, [fieldName, registerField]);

  return (
    <Label htmlFor={fieldName}>
      <strong>{label}</strong>
      <Input ref={inputRef} defaultValue={defaultValue} {...rest} />
      {error && <Error>{error}</Error>}
    </Label>
  );
}

InputMask.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};

InputMask.defaultProps = {
  label: '',
};
