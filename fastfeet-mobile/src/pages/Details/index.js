import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity, StatusBar, Alert } from 'react-native';
import { format, parseISO } from 'date-fns';
import { PropTypes } from 'prop-types';
import api from '~/services/api';
import ButtonDetail from '~/components/ButtonDetail';
import {
  Container,
  Strip,
  ShadowInfoContainer,
  ShadowStatusContainer,
  InfoContent,
  StatusContent,
  HeaderInfoStatusContent,
  HeaderInfoStatusText,
  TextView,
  TextTitle,
  TextInfo,
  DateView,
  ButtonsView,
  ButtonsShadowView,
} from './styles';

export default function Details({ navigation }) {
  const delivery = navigation.getParam('delivery');

  function getStatus(item) {
    if (!item.start_date) {
      return 'AGUARDANDO RETIRADA';
    }
    if (!item.end_date) {
      return 'PENDENTE';
    }
    return 'ENTREGUE';
  }

  function formatDate(date) {
    if (!date) {
      return '--/--/--';
    }

    return format(parseISO(date), 'dd/MM/yyyy');
  }

  function handleAddProblem(id) {
    navigation.navigate('AddProblem', { id });
  }

  function handleShowProblems(id) {
    navigation.navigate('ShowProblems', { id });
  }

  function handleConfirm() {
    navigation.navigate('Confirm', { delivery });
  }

  async function handlePickUp(id) {
    try {
      await api.put(`packages/${id}/pickup`, {
        deliverer_id: delivery.deliverer_id,
      });
      Alert.alert('Sucesso', 'Encomenda retirada!');
      navigation.navigate('Dashboard');
    } catch (e) {
      Alert.alert('Erro', 'Encomenda não pode ser retirada.');
    }
  }

  return (
    <Container>
      <StatusBar barStyle="light-content" />
      <Strip />
      <ShadowInfoContainer>
        <InfoContent>
          <HeaderInfoStatusContent>
            <Icon name="local-shipping" size={24} color="#7d40e7" />
            <HeaderInfoStatusText>Informações da entrega</HeaderInfoStatusText>
          </HeaderInfoStatusContent>
          <TextView>
            <TextTitle>DESTINATÁRIO</TextTitle>
            <TextInfo>{delivery.recipient.name}</TextInfo>
          </TextView>
          <TextView>
            <TextTitle>ENDEREÇO DE ENTREGA</TextTitle>
            <TextInfo>
              {delivery.recipient.address_street}{' '}
              {delivery.recipient.address_number}, {delivery.recipient.city}-
              {delivery.recipient.state}, {delivery.recipient.zip_code}
            </TextInfo>
          </TextView>
          <TextView>
            <TextTitle>PRODUTO</TextTitle>
            <TextInfo>{delivery.product}</TextInfo>
          </TextView>
        </InfoContent>
      </ShadowInfoContainer>

      <ShadowStatusContainer>
        <StatusContent>
          <HeaderInfoStatusContent>
            <Icon name="local-shipping" size={24} color="#7d40e7" />
            <HeaderInfoStatusText>Situação da entrega</HeaderInfoStatusText>
          </HeaderInfoStatusContent>
          <TextView>
            <TextTitle>STATUS</TextTitle>
            <TextInfo>{getStatus(delivery)}</TextInfo>
          </TextView>
          <DateView>
            <TextView>
              <TextTitle>DATA DE RETIRADA</TextTitle>
              <TextInfo>{formatDate(delivery.start_date)}</TextInfo>
            </TextView>
            <TextView>
              <TextTitle>DATA DE ENTREGA</TextTitle>
              <TextInfo>{formatDate(delivery.end_date)}</TextInfo>
            </TextView>
          </DateView>
        </StatusContent>
      </ShadowStatusContainer>

      <ButtonsShadowView>
        <ButtonsView>
          <ButtonDetail
            disabled={delivery.end_date}
            onPress={() => handleAddProblem(delivery.id)}
            pos="left"
            color="#E74040"
            name="cancel">
            Informar Problema
          </ButtonDetail>
          <ButtonDetail
            onPress={() => handleShowProblems(delivery.id)}
            pos="center"
            color="#E7BA40"
            name="info">
            Visualizar Problemas
          </ButtonDetail>
          {delivery.start_date ? (
            <ButtonDetail
              onPress={() => handleConfirm(delivery.id)}
              pos="right"
              color="#7D40E7"
              name="check-circle">
              Confirmar Entrega
            </ButtonDetail>
          ) : (
            <ButtonDetail
              onPress={() => handlePickUp(delivery.id)}
              pos="right"
              color="#82df18"
              name="check-circle">
              Retirar Encomenda
            </ButtonDetail>
          )}
        </ButtonsView>
      </ButtonsShadowView>
    </Container>
  );
}

Details.navigationOptions = ({ navigation }) => ({
  headerTitle: 'Detalhes da Encomenda',
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

Details.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};
