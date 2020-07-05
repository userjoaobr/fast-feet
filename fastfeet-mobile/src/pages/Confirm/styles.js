import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  background: #fff;
`;

export const Strip = styled.View`
  height: 150px;
  background: #7d40e7;
`;

export const ShadowProblemContainer = styled.View`
  flex: 1;
  background: rgba(221, 221, 221, 0.2);
  padding: 4px;
  height: 350px;
  border-radius: 4px;
  margin: -120px 20px 5px 20px;
`;

export const SignatureImage = styled.Image.attrs({
  resizeMode: 'contain',
})`
  flex: 1;
  background: #fff;
  border-radius: 4px;
`;

export const ButtonTake = styled.TouchableOpacity`
  top: 70%;
  left: 40%;
  position: absolute;
  justify-content: center;
  align-items: center;
  height: 70px;
  width: 70px;
  border-radius: 40px;
  background: rgba(0, 0, 0, 0.1);
`;

export const ButtonDelete = styled.TouchableOpacity`
  top: 70%;
  left: 40%;
  position: absolute;
  justify-content: center;
  align-items: center;
  height: 70px;
  width: 70px;
  border-radius: 40px;
  background: rgba(0, 0, 0, 0.1);
`;

export const SubmitButton = styled(Button)`
  margin: 20px;
`;
