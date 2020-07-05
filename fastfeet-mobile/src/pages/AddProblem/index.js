import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity, StatusBar, Alert } from 'react-native';
import { PropTypes } from 'prop-types';
import api from '~/services/api';

import {
  Container,
  Strip,
  ShadowProblemContainer,
  ProblemInput,
  SubmitButton,
} from './styles';

export default function AddProblem({ navigation }) {
  const [problem, setProblem] = useState('');
  const deliveryId = navigation.getParam('id');

  async function handleAddProblem() {
    try {
      await api.post(`delivery/${deliveryId}/problems`, {
        description: problem,
      });
      Alert.alert('Sucesso', 'Problema informado.');
      navigation.navigate('Dashboard');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível informar o problema.');
    }
  }

  return (
    <Container>
      <StatusBar barStyle="light-content" />
      <Strip />
      <ShadowProblemContainer>
        <ProblemInput
          multiline
          placeholder="Inclua aqui o problema que ocorreu na entrega"
          value={problem}
          onChangeText={setProblem}
        />
      </ShadowProblemContainer>
      <SubmitButton onPress={handleAddProblem} color="#7d40e7">
        Enviar
      </SubmitButton>
    </Container>
  );
}

AddProblem.navigationOptions = ({ navigation }) => ({
  headerTitle: 'Informar problema',
  headerTransparent: false,
  headerStyle: {
    backgroundColor: '#7d40e7',
    shadowColor: 'transparent',
  },
  headerTintColor: '#fff',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}>
      <Icon name="chevron-left" size={24} color="#fff" />
    </TouchableOpacity>
  ),
});

AddProblem.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};
