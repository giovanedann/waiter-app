import { FlatList, Pressable } from 'react-native';

import { CartItem } from '../../types/CartItem';
import * as S from './styles';
import { Text } from '../Text';
import { formatCurrency } from '../../utils/formatCurrency';
import { MinusCircle, PlusCircle } from '../Icons';
import { Button } from '../Button';
import { Product } from '../../types/Product';
import { ConfirmedOrderModal } from '../ConfirmedOrderModal';
import { useState } from 'react';

type CartProps = {
  items: CartItem[]
  onAdd: (product: Product) => void
  onRemove: (product: Product) => void
  onConfirmOrder: () => void
}

export function Cart({ items, onAdd, onRemove, onConfirmOrder }: CartProps) {
  const [isConfirmOrderModalVisible, setIsConfirmOrderModalVisible] = useState(false);

  const totalPrice = items
    .reduce((acc, curr) => (acc + curr.product.price * curr.quantity), 0);

  function handleConfirmOrder() {
    setIsConfirmOrderModalVisible(true);
  }

  function handleOk() {
    onConfirmOrder();
    setIsConfirmOrderModalVisible(false);
  }

  return (
    <>
      {items.length > 0 && (
        <FlatList
          style={{ marginBottom: 20, maxHeight: 150 }}
          data={items}
          keyExtractor={({ product }) => product._id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <S.Item>
              <S.ProductInfo>
                <S.ProductImage
                  source={{
                    uri: `http://${process.env.EXPO_PUBLIC_ANDROID_EMULATOR_BASE_URL}:3001/uploads/${item.product.imagePath}`
                  }}
                />

                <S.QuantityContainer>
                  <Text size={14} color="#666">{item.quantity}x</Text>
                </S.QuantityContainer>

                <S.ProductDetailsContainer>
                  <Text size={14} weight="600">{item.product.name}</Text>
                  <Text size={14} color="#666" style={{ marginTop: 4 }}>
                    {formatCurrency(item.product.price)}
                  </Text>
                </S.ProductDetailsContainer>
              </S.ProductInfo>

              <S.Actions>
                <Pressable style={{ marginRight: 24 }} onPress={() => onAdd(item.product)}>
                  <PlusCircle />
                </Pressable>
                <Pressable onPress={() => onRemove(item.product)}>
                  <MinusCircle />
                </Pressable>
              </S.Actions>
            </S.Item>
          )}
        />
      )}

      <S.Summary>
        <S.TotalPriceContainer>
          {items.length > 0 ? (
            <>
              <Text color="#666">Total</Text>
              <Text size={20} weight="600">{formatCurrency(totalPrice)}</Text>
            </>
          ) : (
            <Text color="#999">Cart is empty</Text>
          )}
        </S.TotalPriceContainer>

        <Button onPress={handleConfirmOrder} disabled={items.length === 0}>
          Confirm order
        </Button>
      </S.Summary>

      <ConfirmedOrderModal
        visible={isConfirmOrderModalVisible}
        onOkClick={handleOk}
      />
    </>
  );
}
