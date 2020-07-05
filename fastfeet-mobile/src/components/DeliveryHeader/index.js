import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import Avatar from '../Avatar';

import { Container, Left, WelcomeView, WelcomeText, Name } from './styles';

export default function DeliveryHeader({ deliverer, onPress }) {
  function getFirstName(name) {
    return name.split(' ')[0];
  }

  return (
    <Container>
      <Left>
        <Avatar small name={deliverer.name} url={deliverer.avatar?.url} />
        <WelcomeView>
          <WelcomeText>Bem vindo de volta,</WelcomeText>
          <Name>{getFirstName(deliverer.name)}</Name>
        </WelcomeView>
      </Left>

      <TouchableOpacity onPress={onPress}>
        <Icon name="input" size={30} color="#E74040" />
      </TouchableOpacity>
    </Container>
  );
}

DeliveryHeader.propTypes = {
  deliverer: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.shape({
      url: PropTypes.string,
    }),
  }).isRequired,
  onPress: PropTypes.func.isRequired,
};
