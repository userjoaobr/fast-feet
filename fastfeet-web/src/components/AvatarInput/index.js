import React, { useRef, useEffect, useCallback, useState } from 'react';
import { MdAddAPhoto } from 'react-icons/md';

import { useField } from '@unform/core';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function AvatarInput({ name, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue } = useField(name);
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
    <Container>
      <label htmlFor="avatar">
        {!preview ? (
          <div>
            <MdAddAPhoto size={36} />
            <span>Adicionar foto</span>
          </div>
        ) : (
          <img src={preview} alt="avatar" />
        )}

        <input
          type="file"
          id="avatar"
          onChange={handlePreview}
          ref={inputRef}
          {...rest}
        />
      </label>
    </Container>
  );
}

AvatarInput.propTypes = {
  name: PropTypes.string.isRequired,
};
