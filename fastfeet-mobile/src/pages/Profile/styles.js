import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
  margin: 0px 20px;
  justify-content: center;
`;

export const AvatarContainer = styled.View`
  align-items: center;
  margin-bottom: 50px;
`;
export const TextSection = styled.View`
  margin-top: 20px;
`;
export const HeaderText = styled.Text`
  margin-bottom: 5px;
  color: #666666;
`;
export const ContentText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #444444;
`;

export const LogoutButton = styled(Button)`
  margin-top: 50px;
`;
