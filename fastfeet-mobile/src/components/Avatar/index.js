import React from 'react';
import PropTypes from 'prop-types';
import { Container, RoundView, Text, Image } from './styles';

export default function Avatar({ name, url, small }) {
  function getAcronym(fullName) {
    const acronym = fullName.match(/\b(\w)/g);
    return acronym.join('');
  }

  return (
    <Container small={small}>
      <RoundView small={small}>
        {url ? (
          <Image source={{ uri: url }} small={small} />
        ) : (
          <Text small={small}>{getAcronym(name)}</Text>
        )}
      </RoundView>
    </Container>
  );
}

Avatar.propTypes = {
  name: PropTypes.string,
  url: PropTypes.string,
  small: PropTypes.bool,
};

Avatar.defaultProps = {
  name: '',
  url: '',
  small: false,
};
