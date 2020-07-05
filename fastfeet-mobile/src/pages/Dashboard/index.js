import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StatusBar, ActivityIndicator } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { PropTypes } from 'prop-types';
import api from '~/services/api';
import DeliveryHeader from '~/components/DeliveryHeader';
import DeliveryItem from '~/components/DeliveryItem';
import { signOut } from '~/store/modules/auth/actions';

import {
  Container,
  DeliveryFilter,
  TextFilter,
  ButtonFilter,
  ButtonsView,
  ButtonText,
  List,
} from './styles';

function Dashboard({ isFocused, navigation }) {
  const deliverer = useSelector((state) => state.user.profile);
  const dispatch = useDispatch();
  const [delivered, setDelivered] = useState(false);
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useSelector((state) => state.user.profile);

  async function loadDeliveries() {
    setLoading(true);

    if (!delivered) {
      const response = await api.get(`/packages/deliverer/${id}/deliveries`);
      setDeliveries(response.data);
      setLoading(false);
      return;
    }

    const response = await api.get(`/packages/deliverer/${id}/delivered`);
    setDeliveries(response.data);
    setLoading(false);
  }

  useEffect(() => {
    if (isFocused) {
      loadDeliveries();
    }
  }, [isFocused, delivered]);

  function handleFilterSelect() {
    setDelivered(!delivered);
  }

  function handleShowDetails(delivery) {
    navigation.navigate('Details', { delivery });
  }

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      <DeliveryHeader deliverer={deliverer} onPress={() => handleSignOut()} />
      <DeliveryFilter>
        <TextFilter>Entregas</TextFilter>
        <ButtonsView>
          <ButtonFilter onPress={handleFilterSelect}>
            <ButtonText selected={!delivered}>Pendentes</ButtonText>
          </ButtonFilter>
          <ButtonFilter onPress={handleFilterSelect}>
            <ButtonText selected={delivered}>Entregues</ButtonText>
          </ButtonFilter>
        </ButtonsView>
      </DeliveryFilter>
      {loading ? (
        <ActivityIndicator size="large" color="#666666" />
      ) : (
        <List
          data={deliveries}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <DeliveryItem
              data={item}
              showDetails={() => handleShowDetails(item)}
            />
          )}
        />
      )}
    </Container>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meu Perfil',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-shipping" size={20} color={tintColor} />
  ),
};

Dashboard.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(Dashboard);
