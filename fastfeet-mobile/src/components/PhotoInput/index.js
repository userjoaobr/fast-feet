import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Text, TextInput } from 'react-native';
import { useField } from '@unform/core';

function PhotoInput({ name, label, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue = '' } = useField(name);
  const [preview, setPreview] = useState(defaultValue);

  const handlePreview = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setPreview(null);
      return;
    }

    const previewURL = URL.createObjectURL(file);
    setPreview(previewURL);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'files[0]',
      clearValue(ref) {
        ref.value = '';
        setPreview(null);
      },
      setValue(_, value) {
        setPreview(value);
      },
    });
  }, [fieldName, registerField]);

  return (
    <>
      <TextInput ref={inputRef} defaultValue={defaultValue} {...rest} />
    </>
  );
}
export default PhotoInput;
