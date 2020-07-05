import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;
  margin-bottom: 30px;

  label {
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }

    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 10px;
      height: 120px;
      width: 120px;
      border-radius: 50%;
      background: rgba(125, 64, 231, 0.1);
      color: rgb(125, 64, 231);
      border: 1px dashed rgb(125, 64, 231);

      span {
        margin-top: 10px;
      }

      p {
        font-size: 40px;
      }
    }

    img {
      padding: 5px;
      height: 120px;
      width: 120px;
      border-radius: 50%;
      border: 1px solid rgba(0, 0, 0, 0.1);
      background: none;
    }

    input {
      display: none;
    }
  }
`;
