import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
`;

export const Left = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const WelcomeView = styled.View`
  margin-left: 20px;
`;

export const WelcomeText = styled.Text`
  font-size: 14px;
  color: #666666;
  margin-bottom: 2px;
`;

export const Name = styled.Text`
  font-size: 30px;
  font-weight: bold;
  color: #444444;
`;
