import styled from 'styled-components';
import { darken } from 'polished';
import { Form } from '@unform/web';

export const Container = styled.div`
  max-width: 70%;
  margin: 0 auto;

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h2 {
      color: #444;
    }

    div {
      display: flex;

      button {
        margin-left: 10px;
      }
    }
  }
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  background: ${(props) => props.color};
  font-weight: bold;
  color: #fff;
  border: 0;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;

  svg {
    margin-right: 5px;
  }

  &:hover {
    background: ${(props) => darken(0.05, props.color)};
  }
`;

export const Unform = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #fff;
  border-radius: 4px;
  height: 320px;
  margin-top: 20px;
  padding: 20px;

  div:nth-last-child(2) {
    display: grid;
    grid-template-columns: 2fr 0.8fr 1fr;
    grid-column-gap: 20px;

    label {
      margin: auto 0;
    }
  }

  div:last-child {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 20px;

    label {
      margin: auto 0;
    }
  }
`;
