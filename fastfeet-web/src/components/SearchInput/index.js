import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function SearchInput({
  icon: Icon,
  type,
  placeholder,
  onChange,
  value,
}) {
  return (
    <Container>
      <Icon size={24} color="#ddd" />
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </Container>
  );
}

SearchInput.defaultProps = {
  type: 'text',
};

SearchInput.propTypes = {
  icon: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'number', 'password']),
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
