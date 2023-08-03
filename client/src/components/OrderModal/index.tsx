import { useMemo } from 'react';
import CloseIcon from '../../assets/images/close-icon.svg';
import { Order } from '../../types/Order';
import { formatCurrency } from '../../utils/formatCurrency';

import * as S from './styles';

type OrderModalProps = {
  visible: boolean;
  order: Order | null;
  onCloseIconClick: () => void;
  onOverlayClick?: () => void;
}

const orderStatusIcon = {
  DONE: '✅',
  WAITING: '🕑',
  IN_PRODUCTION: '👨🏼‍🍳'
};

const orderStatusText = {
  DONE: 'Done',
  WAITING: 'Waiting',
  IN_PRODUCTION: 'In production'
};

export function OrderModal({ visible, order, onCloseIconClick, onOverlayClick }: OrderModalProps) {
  if (!visible || !order) {
    return null;
  }

  const totalPrice = useMemo(() => {
    return order.products.reduce((acc, curr) => (
      acc + (curr.product.price * curr.quantity)
    ), 0);
  }, [order]);

  return (
    <S.Overlay onClick={onOverlayClick}>
      <S.ModalBody>
        <header>
          <strong>Table {order.table}</strong>

          <button type="button">
            <img src={CloseIcon} alt="Close modal icon" onClick={onCloseIconClick} />
          </button>
        </header>

        <S.StatusContainer>
          <small>Order status</small>
          <div>
            <span>{orderStatusIcon[order.status]}</span>
            <strong>{orderStatusText[order.status]}</strong>
          </div>
        </S.StatusContainer>

        <S.OrderDetails>
          <strong>Items</strong>

          <div className="order-items">
            {order.products.map(({ product, _id, quantity }) => (
              <div className="item" key={_id}>
                <img
                  src={`http://localhost:3001/uploads/${product.imagePath}`}
                  alt={product.name}
                  width="56"
                  height="28.51"
                />

                <span className="quantity">{quantity}x</span>

                <div className="product-details">
                  <strong>{product.name}</strong>
                  <span>{formatCurrency(product.price)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="total">
            <span>Total</span>
            <strong>{formatCurrency(totalPrice)}</strong>
          </div>
        </S.OrderDetails>

        <S.Actions>
          <button type="button" className="primary">
            <span>👨🏼‍🍳</span>
            <strong>Start production</strong>
          </button>

          <button type="button" className="secondary">
            <strong>Cancel order</strong>
          </button>
        </S.Actions>
      </S.ModalBody>
    </S.Overlay>
  );
}
