import styled from 'styled-components';
import { darken } from 'polished';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  h2 {
    color: #444;
  }

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0;
  }

  table {
    width: 100%;
    border-collapse: separate;

    thead {
      display: block;
      margin-bottom: 10px;

      tr {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 5px 10px;
      }

      th {
        flex: 1px;
        text-align: left;
        color: #444;
        font-size: 14px;

        :last-child {
          text-align: right;
          margin-right: 10px;
        }
      }
    }

    tbody {
      display: block;
      height: 380px;
      width: 100%;

      overflow: visible;

      tr {
        display: flex;
        flex-direction: row;
        align-items: center;
        background: #fff;
        height: 45px;
        padding: 5px 10px;
        border-radius: 4px;
        margin-bottom: 15px;
      }

      td {
        display: flex;
        align-items: center;
        flex: 1;
        font-size: 14px;
        color: #444;

        :last-child {
          justify-content: flex-end;
          margin-right: 20px;
        }

        > button {
          background: none;
          border: 0;
          font-weight: bold;
          font-size: 20px;
          color: #999;
          cursor: pointer;
        }
      }
    }
  }
`;

export const AddPackage = styled(Link)`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  background: #7d40e7;
  font-weight: bold;
  color: #fff;
  border: 0;
  border-radius: 4px;
  font-size: 16px;
  transition: background 0.2s;

  svg {
    margin-right: 5px;
  }

  &:hover {
    background: ${darken(0.05, '#7d40e7')};
  }
`;

export const ActionsContainer = styled.div`
  position: relative;
`;

export const ActionsMore = styled.button`
  background: none;
  border: 0;
  font-size: 20px;
  font-weight: bold;
  color: #999;
  cursor: pointer;
`;

export const ActionsList = styled.div`
  position: absolute;
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  z-index: 1;
  width: 150px;
  height: 80px;
  padding: 10px;
  left: calc(100% - 75px);
  top: calc(100% + 10px);
  background: #fff;
  border-radius: 4px;
  box-shadow: 0px 3px 3px 0 rgba(0, 0, 0, 0.4);

  > div {
    flex: 1;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    hr {
      border: 0;
      height: 1px;
      background: #ddd;
      margin: 5px 0px;
    }

    &::before {
      content: '';
      position: absolute;
      display: inline-block;
      z-index: 1;
      left: calc(50% + 5px);
      top: 0px;
      width: 0px;
      height: 0px;

      box-sizing: border-box;
      border: 0.5em solid black;
      border-color: transparent transparent #fff #fff;
      transform-origin: 0 0;
      transform: rotate(135deg);
      box-shadow: -0.5px 0.5px 0.5px 0 rgba(0, 0, 0, 0.4);
    }
  }
`;

export const ActionsButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: 0;
  color: #999;
  cursor: pointer;

  svg {
    margin-right: 5px;
  }
`;

export const NavPage = styled.div`
  display: flex;
  justify-content: space-between;
  color: #7d40e7;

  > button {
    color: #7d40e7;
    border: 0;
    background: none;
    cursor: pointer;
  }
`;

export const NavPageButton = styled.button.attrs({
  type: 'button',
})`
  color: #7d40e7;
  border: 0;
  background: none;
  cursor: ${(props) => (props.disabled ? null : 'pointer')};
  opacity: ${(props) => (props.disabled ? 0 : 1)};
`;
