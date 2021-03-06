import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      width: 160px;
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #eee;
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Navigation = styled.div`
  display: flex;
  justify-content: space-between;

  a {
    margin-right: 20px;
    font-weight: bold;
    color: #999;

    &.active {
      color: #444;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid #eee;

  > div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #444;
    }

    button {
      display: block;
      border: 0;
      margin-top: 2px;
      font-size: 12px;
      color: #dc3545;
      cursor: pointer;

      &:hover {
        color: ${lighten(0.3, '#dc3545')};
      }
    }
  }
`;
