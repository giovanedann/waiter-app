import { ordersMock } from '../../mocks/orders';
import { OrderBoard } from '../OrderBoard';
import * as S from './styles';

export function Orders() {
  return (
    <S.Container>
      <OrderBoard key={Math.random()} icon='🕝' title="Waiting" orders={ordersMock} />
      <OrderBoard key={Math.random()} icon='👨🏻‍🍳' title="Preparing" orders={ordersMock} />
      <OrderBoard key={Math.random()} icon='✅' title="Delivered" orders={ordersMock} />
    </S.Container>
  );
}
