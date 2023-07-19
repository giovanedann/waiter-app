import { Order } from '../../types/Order';
import * as S from './styles';

type OrderBoardProps = {
  icon: string;
  title: string;
  orders: Order[];
}

export function OrderBoard({ icon, title, orders }: OrderBoardProps) {
  return (
    <S.Container>
      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>({orders.length})</span>
      </header>

      {orders.length > 0 && (
        <S.Content>
          {orders.map((order) => (
            <button type="button" key={order._id}>
              <strong>{order.table}</strong>
              <span>{order.products.length} items</span>
            </button>
          ))}
        </S.Content>
      )}
    </S.Container>
  );
}
