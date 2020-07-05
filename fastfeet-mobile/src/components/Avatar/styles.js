import styled from 'styled-components/native';

export const Container = styled.View``;

export const RoundView = styled.View`
  justify-content: center;
  align-items: center;
  background: #f4effc;
  height: ${(props) => (props.small ? '100px' : '140px')};
  width: ${(props) => (props.small ? '100px' : '140px')};
  border-radius: ${(props) => (props.small ? '50px' : '70px')};
`;

export const Text = styled.Text`
  color: #a28fd0;
  font-weight: bold;
  font-size: ${(props) => (props.small ? '40px' : '60px')};
`;

export const Image = styled.Image`
  height: ${(props) => (props.small ? '90px' : '130px')};
  width: ${(props) => (props.small ? '90px' : '130px')};
  border-radius: ${(props) => (props.small ? '45px' : '65px')};
`;
