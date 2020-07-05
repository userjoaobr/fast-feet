import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  flex: 1px;
  padding: 5px;
  background: #f8f9fd;
  border-right-width: ${(props) => (props.pos === 'center' ? '2px' : '0px')};
  border-left-width: ${(props) => (props.pos === 'center' ? '2px' : '0px')};
  border-color: rgba(221, 221, 221, 0.2);
  border-bottom-left-radius: ${(props) =>
    props.pos === 'left' ? '4px' : '0px'};
  border-top-left-radius: ${(props) => (props.pos === 'left' ? '4px' : '0px')};
  border-bottom-right-radius: ${(props) =>
    props.pos === 'right' ? '4px' : '0px'};
  border-top-right-radius: ${(props) =>
    props.pos === 'right' ? '4px' : '0px'};
  align-items: center;
  justify-content: center;
  opacity: ${(props) => (props.disabled ? 0.2 : 1)};
`;

export const Text = styled.Text`
  text-align: center;
  color: #999999;
  font-size: 14px;
  margin-top: 10px;
`;
