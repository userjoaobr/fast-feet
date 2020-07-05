import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';

export default function NameIcon({ name, color }) {
  function getAcronym(fullName) {
    const acronym = fullName.match(/\b(\w)/g);
    return acronym.join('');
  }

  return (
    <Container color={color[0]} backgroundColor={color[1]}>
      <strong>{getAcronym(name)}</strong>
    </Container>
  );
}

NameIcon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.arrayOf(PropTypes.string).isRequired,
};
