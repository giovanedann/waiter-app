import { FlatList, Pressable } from 'react-native';

import { CartItem } from '../../types/CartItem';
import * as S from './styles';
import { Text } from '../Text';
import { formatCurrency } from '../../utils/formatCurrency';
import { MinusCircle, PlusCircle } from '../Icons';
import { Button } from '../Button';

type CartProps = {
  items: CartItem[]
}

export function Cart({ items }: CartProps) {
  return (
    <>
      {items.length > 0 && (
        <FlatList
          style={{ marginBottom: 20, maxHeight: 140 }}
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
                <Pressable style={{ marginRight: 24 }}>
                  <PlusCircle />
                </Pressable>
                <Pressable>
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
              <Text size={20} weight="600">{formatCurrency(120)}</Text>
            </>
          ) : (
            <Text color="#999">Cart is empty</Text>
          )}
        </S.TotalPriceContainer>

        <Button onPress={() => alert('Order confirmed')} disabled={items.length === 0}>
          Confirm order
        </Button>
      </S.Summary>
    </>
  );
}
