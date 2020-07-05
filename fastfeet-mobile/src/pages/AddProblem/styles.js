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
  background: rgba(221, 221, 221, 0.2);
  padding: 2px;
  height: 350px;
  border-radius: 4px;
  margin: -120px 20px 5px 20px;
`;

export const ProblemInput = styled.TextInput`
  flex: 1;
  background: #fff;
  border-radius: 4px;
  padding: 20px;
  font-size: 16px;
  color: #444444;
`;

export const SubmitButton = styled(Button)`
  margin: 5px 20px 0px;
`;
