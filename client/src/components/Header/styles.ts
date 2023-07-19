import { styled } from 'styled-components';

export const Container = styled.header`
  background: #d73035;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 12.375rem;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 76rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .title-container {
    h1 {
      color: #fff;
      font-size: 2rem;
    }

    h2 {
      color: #fff;
      font-weight: 400;
      font-size: 1rem;
      opacity: 0.9;
      margin-top: 6px;
    }
  }
`;
