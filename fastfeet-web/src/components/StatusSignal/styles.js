import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.backgroundColor};
  height: 25px;
  width: 100px;
  border-radius: 20px;

  > strong {
    font-size: 12px;
    color: ${(props) => props.color};
  }
`;

export const Circle = styled.div`
  height: 10px;
  width: 10px;
  border-radius: 50%;
  margin-right: 10px;
  background: ${(props) => props.color};
`;
