import { FlatList } from 'react-native';

import { products } from '../../mocks/products';
import * as S from './styles';
import { Text } from '../Text';
import { formatCurrency } from '../../utils/formatCurrency';
import { PlusCircle } from '../Icons';

export function Menu() {
  return (
    <FlatList
      style={{ marginTop: 32 }}
      contentContainerStyle={{ paddingHorizontal: 24 }}
      data={products}
      keyExtractor={(product) => product._id}
      renderItem={({ item }) => (
        <S.Product>
          <S.ProductImage
            source={{
              uri: `http://${process.env.EXPO_PUBLIC_ANDROID_EMULATOR_BASE_URL}:3001/uploads/${item.imagePath}`
            }}
          />

          <S.ProductDetails>
            <Text weight="600">{item.name}</Text>

            <Text size={14} color="#666" style={{ marginVertical: 8 }}>
              {item.description}
            </Text>

            <Text size={14} weight="600">{formatCurrency(item.price)}</Text>
          </S.ProductDetails>

          <S.AddToCartButton>
            <PlusCircle />
          </S.AddToCartButton>
        </S.Product>
      )}
      ItemSeparatorComponent={S.Separator}
    />
  );
}
