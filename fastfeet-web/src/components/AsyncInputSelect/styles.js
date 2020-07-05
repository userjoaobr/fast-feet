import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start !important;
  width: 100%;
`;

export const Label = styled.label`
  color: #444;
  font-weight: bold;
  text-align: left;
  display: block;
  margin-bottom: 10px;
`;

export const Error = styled.span`
  color: #dc3545;
  margin-top: 5px;
`;
