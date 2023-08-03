import { styled } from 'styled-components';

export const Container = styled.div`
  padding: 1rem;
  border: 1px solid rgb(204, 204, 204, 0.4);
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;

  > header {
    padding: 0.5rem;
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 1.5rem;

  button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #fff;
    border: 1px solid rgb(204, 204, 204, 0.4);
    border-radius: 0.5rem;
    height: 8rem;
    width: 100%;
    gap: 4px;

    strong {
      font-weight: 500;
    }

    span {
      font-size: 0.875rem;
      color: #666;
    }

    & + button {
      margin-top: 1.5rem;
    }
  }
`;
