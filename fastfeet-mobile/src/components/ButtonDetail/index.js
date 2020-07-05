import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import { Container, Text } from './styles';

export default function ButtonDetail({ children, name, color, pos, ...rest }) {
  return (
    <Container pos={pos} {...rest}>
      <Icon name={name} size={24} color={color} />
      <Text>{children}</Text>
    </Container>
  );
}

ButtonDetail.propTypes = {
  children: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  pos: PropTypes.string.isRequired,
};
