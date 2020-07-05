import styled from 'styled-components';
import ReactInputMask from 'react-input-mask';

export const Input = styled(ReactInputMask)`
  padding: 10px;
  font-size: 14px;
  color: #999;
  border-radius: 4px;
  height: 40px;
  border: 1px solid #ddd;

  &::placeholder {
    color: #ddd;
  }
`;

export const Error = styled.span`
  color: #dc3545;
  margin-top: 5px;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  strong {
    color: #444;
    font-weight: bold;
    text-align: left;
    margin-bottom: 10px;
  }
  & + label {
    margin-top: 20px;
  }
`;
