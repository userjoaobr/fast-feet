import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Avatar from '~/components/Avatar';
import { signOut } from '~/store/modules/auth/actions';
import {
  Container,
  TextSection,
  HeaderText,
  ContentText,
  AvatarContainer,
  LogoutButton,
} from './styles';

export default function Profile() {
  const deliverer = useSelector((state) => state.user.profile);
  const dispatch = useDispatch();

  return (
    <Container>
      <AvatarContainer>
        <Avatar name={deliverer.name} url={deliverer.avatar?.url} />
      </AvatarContainer>

      <TextSection>
        <HeaderText>Nome completo</HeaderText>
        <ContentText>{deliverer.name}</ContentText>
      </TextSection>

      <TextSection>
        <HeaderText>Email</HeaderText>
        <ContentText>{deliverer.email}</ContentText>
      </TextSection>

      <TextSection>
        <HeaderText>Data de cadastro</HeaderText>
        <ContentText>{deliverer.createdAt}</ContentText>
      </TextSection>

      <LogoutButton onPress={() => dispatch(signOut())} color="#E74040">
        Logout
      </LogoutButton>
    </Container>
  );
}

Profile.navigationOptions = {
  tabBarLabel: 'Meu Perfil',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="person" size={24} color={tintColor} />
  ),
};
