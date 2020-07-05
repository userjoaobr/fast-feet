import React from 'react';
import { format, parseISO } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  ShadowContainer,
  Container,
  Header,
  HeaderText,
  TrackPointView,
  TrackTextView,
  FirstPoint,
  SecondPoint,
  ThirdPoint,
  HR,
  PointText,
  FooterView,
  DateCityView,
  DateCityHeaderText,
  DateCityContentText,
  DetailsButton,
  DetailsText,
} from './styles';

export default function DeliveryItem({ data, showDetails }) {
  function contentDate(item) {
    if (!item.start_date && !item.end_date) {
      return '--/--/--';
    }
    if (item.start_date && !item.end_date) {
      return format(parseISO(item.start_date), 'dd/MM/yyyy');
    }
    return format(parseISO(item.end_date), 'dd/MM/yyyy');
  }

  return (
    <ShadowContainer>
      <Container>
        <Header>
          <Icon name="local-shipping" size={30} color="#7d40e7" />
          <HeaderText>
            Encomenda
            {String(data.id).length < 2 ? ` 0${data.id}` : ` ${data.id}`}
          </HeaderText>
        </Header>

        <TrackPointView>
          <FirstPoint />
          <HR />
          <SecondPoint pickedUp={data.start_date} />
          <HR />
          <ThirdPoint delivered={data.end_date} />
        </TrackPointView>
        <TrackTextView>
          <PointText>Aguardando Retirada</PointText>
          <PointText>Retirada</PointText>
          <PointText>Entregue</PointText>
        </TrackTextView>

        <FooterView>
          <DateCityView>
            <DateCityHeaderText>Data</DateCityHeaderText>
            <DateCityContentText>{contentDate(data)}</DateCityContentText>
          </DateCityView>
          <DateCityView>
            <DateCityHeaderText>Cidade</DateCityHeaderText>
            <DateCityContentText>{data.recipient.city}</DateCityContentText>
          </DateCityView>
          <DetailsButton onPress={showDetails}>
            <DetailsText>Ver Detalhes</DetailsText>
          </DetailsButton>
        </FooterView>
      </Container>
    </ShadowContainer>
  );
}
