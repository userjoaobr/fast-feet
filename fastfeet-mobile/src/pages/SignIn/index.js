import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'react-native';
import { signInRequest } from '../../store/modules/auth/actions';

import Logo from '../../assets/images/fastfeet-logo-white.png';
import { Container, Form, FormInput, SubmitButton } from './styles';

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const [id, setId] = useState('');

  function handleSubmit() {
    dispatch(signInRequest(id));
  }

  return (
    <Container>
      <StatusBar barStyle="light-content" />
      <Logo width={280} />

      <Form>
        <FormInput
          icon="account-circle"
          placeholder="Informe seu ID de cadastro"
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
          value={id}
          onChangeText={setId}
        />

        <SubmitButton loading={loading} color="#82df18" onPress={handleSubmit}>
          Entrar no sistema
        </SubmitButton>
      </Form>
    </Container>
  );
}
