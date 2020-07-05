import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #fff;
`;

export const DeliveryFilter = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px 20px;
`;

export const TextFilter = styled.Text`
  color: #444444;
  font-size: 24px;
  font-weight: bold;
`;

export const ButtonsView = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const ButtonFilter = styled.TouchableOpacity`
  margin-left: 20px;
`;

export const ButtonText = styled.Text`
  color: ${(props) => (props.selected ? '#7d40e7' : '#999999')};
  text-decoration: ${(props) => (props.selected ? 'underline' : 'none')};
  text-decoration-color: ${(props) => (props.selected ? '#7d40e7' : '#999999')};
  font-weight: bold;
`;

export const List = styled.FlatList.attrs({
  showVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 20 },
})``;
