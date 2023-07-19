import * as S from './styles';

export function Orders() {
  return (
    <S.Container>
      {new Array(3).fill(null).map(() => (
        <S.Board key={Math.random()}>
          <header>
            <span>🕒</span>
            <strong>Waiting</strong>
            <span>(1)</span>
          </header>

          <S.OrdersContainer>
            <button type="button">
              <strong>Mesa 2</strong>
              <span>2 itens</span>
            </button>
            <button type="button">
              <strong>Mesa 2</strong>
              <span>2 itens</span>
            </button>
          </S.OrdersContainer>
        </S.Board>
      ))}
    </S.Container>
  );
}
