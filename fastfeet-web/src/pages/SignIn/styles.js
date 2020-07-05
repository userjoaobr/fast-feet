import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  height: 100%;
  background: #7d40e7;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;
  background: #fff;
  border-radius: 4px;
  padding: 20px;

  img {
    height: 40px;
  }

  svg path {
    stroke: #7d40e7 !important;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input {
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #444;
      margin: 0 0 10px;

      &::placeholder {
        color: #ddd;
      }
    }

    strong {
      font-size: 14px;
      color: #444;
      text-align: left;
      margin-bottom: 5px;
    }

    span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }

    button {
      margin: 5px 0 0;
      height: 44px;
      background: #7d40e7;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#7d40e7')};
      }
    }
  }
`;
