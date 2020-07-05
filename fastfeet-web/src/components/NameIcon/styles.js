import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.backgroundColor};
  height: 30px;
  width: 30px;
  border-radius: 50%;
  padding: 3px;
  margin-right: 5px;

  > strong {
    color: ${(props) => props.color};
  }
`;
