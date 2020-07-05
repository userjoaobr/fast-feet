import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #fff;
`;

export const Strip = styled.View`
  height: 150px;
  background: #7d40e7;
`;

export const ShadowInfoContainer = styled.View`
  background: rgba(221, 221, 221, 0.2);
  padding: 2px;
  height: 250px;
  border-radius: 4px;
  margin: -120px 20px 5px 20px;
`;

export const InfoContent = styled.View`
  justify-content: center;
  background: #fff;
  height: 246px;
  border-radius: 4px;
  padding: 20px;
`;

export const HeaderInfoStatusContent = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const HeaderInfoStatusText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #7d40e7;
  margin-left: 20px;
`;

export const TextView = styled.View`
  margin-top: 20px;
`;

export const TextTitle = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #999999;
`;

export const TextInfo = styled.Text`
  font-size: 16px;
  color: #666666;
  margin-top: 5px;
`;

export const ShadowStatusContainer = styled.View`
  background: rgba(221, 221, 221, 0.2);
  padding: 2px;
  height: 200px;
  border-radius: 4px;
  margin: 0 20px 5px 20px;
`;

export const StatusContent = styled.View`
  justify-content: center;
  background: #fff;
  height: 196px;
  border-radius: 4px;
  padding: 20px;
`;

export const DateView = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const ButtonsView = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
`;

export const ButtonsShadowView = styled.View`
  background: rgba(221, 221, 221, 0.2);
  padding: 2px;
  height: 110px;
  border-radius: 4px;
  margin: 0 20px;
`;
