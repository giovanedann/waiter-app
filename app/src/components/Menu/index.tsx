import { FlatList } from 'react-native';

import { products } from '../../mocks/products';
import * as S from './styles';
import { useState } from 'react';

import { Text } from '../Text';
import { formatCurrency } from '../../utils/formatCurrency';
import { PlusCircle } from '../Icons';
import { ProductModal } from '../ProductModal';
import { Product } from '../../types/Product';

export function Menu() {
  const [isProductModalVisible, setIsProductModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  function handleOpenProductModal(product: Product) {
    setSelectedProduct(product);
    setIsProductModalVisible(true);
  }

  function handleCloseProductModal() {
    setIsProductModalVisible(false);
  }

  return (
    <>
      <ProductModal
        product={selectedProduct}
        visible={isProductModalVisible}
        onClose={handleCloseProductModal}
      />

      <FlatList
        style={{ marginTop: 32 }}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        data={products}
        keyExtractor={(product) => product._id}
        renderItem={({ item }) => (
          <S.Product onPress={() => handleOpenProductModal(item)}>
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
    </>
  );
}
