import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  background: #fff;
`;

export const Strip = styled.View`
  height: 150px;
  background: #7d40e7;
  justify-content: center;
  align-items: center;
  z-index: 0;
`;

export const StripText = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
`;

export const ShadowProblemItem = styled.View`
  background: rgba(221, 221, 221, 0.2);
  padding: 2px;
  height: 80px;
  border-radius: 4px;
  margin: 0px 20px 5px 20px;
  margin-bottom: 10px;
`;

export const ProblemItem = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border-radius: 4px;
  padding: 20px;
  font-size: 16px;
  color: #444444;
`;

export const List = styled.FlatList.attrs({
  showVerticalScrollIndicator: false,
})`
  top: 15%;
  width: 100%;
  height: 100%;
  z-index: 1;
  position: absolute;
`;

export const DescriptionText = styled.Text.attrs({
  numberOfLines: 2,
})`
  width: 70%;
  color: #999999;
  font-size: 16px;
`;
export const DateText = styled.Text`
  color: #c1c1c1;
`;

export const MessageText = styled.Text`
  font-size: 20px;
  text-align: center;
  font-weight: bold;
  margin-top: 50px;
  color: #444444;
`;
