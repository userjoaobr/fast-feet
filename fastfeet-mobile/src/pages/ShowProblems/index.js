import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity, StatusBar } from 'react-native';
import { format, parseISO } from 'date-fns';
import api from '~/services/api';

import {
  Container,
  Strip,
  ShadowProblemItem,
  ProblemItem,
  List,
  DescriptionText,
  DateText,
  StripText,
  MessageText,
} from './styles';

export default function ShowProblems({ navigation }) {
  const [problems, setProblems] = useState([]);
  const deliveryId = navigation.getParam('id');

  async function handleLoadProblems() {
    const response = await api.get(`delivery/${deliveryId}/problems`);

    setProblems(response.data);
  }

  useEffect(() => {
    handleLoadProblems();
  }, []);

  function formatDate(date) {
    return format(parseISO(date), 'dd/MM/yyyy');
  }

  return (
    <Container>
      <StatusBar barStyle="light-content" />
      <Strip>
        <StripText>
          Encomenda{' '}
          {String(deliveryId).length < 2 ? `0${deliveryId}` : deliveryId}
        </StripText>
      </Strip>
      {!problems.length > 0 ? (
        <MessageText>Não há problemas com essa encomenda.</MessageText>
      ) : (
        <List
          data={problems}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <ShadowProblemItem>
              <ProblemItem>
                <DescriptionText>{item.description}</DescriptionText>
                <DateText>{formatDate(item.createdAt)}</DateText>
              </ProblemItem>
            </ShadowProblemItem>
          )}
        />
      )}
    </Container>
  );
}

ShowProblems.navigationOptions = ({ navigation }) => ({
  headerTitle: 'Visualizar problemas',
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
