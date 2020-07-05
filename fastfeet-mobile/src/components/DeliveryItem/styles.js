import styled from 'styled-components/native';

export const ShadowContainer = styled.View`
  background: rgba(221, 221, 221, 0.2);
  padding: 2px;
  height: 200px;
  border-radius: 4px;
  margin-bottom: 20px;
`;
export const Container = styled.View`
  flex: 1;
  background: #fff;
  border-radius: 4px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 20px;
`;

export const HeaderText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #7d40e7;
  margin-left: 10px;
`;

export const TrackPointView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
  margin-bottom: 10px;
`;

export const FirstPoint = styled.View`
  height: 10px;
  width: 10px;
  border-radius: 5px;
  background: #7d40e7;
  border: 1px solid #7d40e7;
`;

export const SecondPoint = styled.View`
  height: 10px;
  width: 10px;
  border-radius: 5px;
  background: ${(props) => (props.pickedUp ? '#7d40e7' : '#ffffff')};
  border: 1px solid #7d40e7;
`;

export const ThirdPoint = styled.View`
  height: 10px;
  width: 10px;
  border-radius: 5px;
  background: ${(props) => (props.delivered ? '#7d40e7' : '#ffffff')};
  border: 1px solid #7d40e7;
`;

export const HR = styled.View`
  height: 1px;
  border: 1px solid #7d40e7;
  flex: 1;
`;

export const TrackTextView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

export const PointText = styled.Text`
  width: 70px;
  font-size: 12px;
  line-height: 12px;
  color: #999999;
  text-align: center;
`;

export const FooterView = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  background: #f8f9fd;
  margin-top: 10px;
  padding: 20px 30px;
`;

export const DateCityView = styled.View``;

export const DateCityHeaderText = styled.Text`
  font-size: 10px;
  font-weight: bold;
  color: #999999;
  margin-bottom: 3px;
`;

export const DateCityContentText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #444444;
`;

export const DetailsButton = styled.TouchableOpacity``;

export const DetailsText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #7d40e7;
`;
