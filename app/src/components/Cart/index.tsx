import { FlatList, Pressable } from 'react-native';

import { CartItem } from '../../types/CartItem';
import * as S from './styles';
import { Text } from '../Text';
import { formatCurrency } from '../../utils/formatCurrency';
import { MinusCircle, PlusCircle } from '../Icons';

type CartProps = {
  items: CartItem[]
}

export function Cart({ items }: CartProps) {
  return (
    <FlatList
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
  );
}
