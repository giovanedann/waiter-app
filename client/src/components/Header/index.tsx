import Logo from '../../assets/images/logo.svg';
import * as S from './styles';

export function Header() {
  return (
    <S.Container>
      <S.Content>
        <div className="title-container">
          <h1>Orders</h1>
          <h2>Manage the client orders</h2>
        </div>

        <img src={Logo} alt="Waiters with a bottle and a meat" />
      </S.Content>
    </S.Container>
  );
}
