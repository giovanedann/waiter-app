import { useState } from 'react';
import { Header, Menu, TableModal, Text } from '../components';
import { Button } from '../components/Button';
import { Categories } from '../components/Categories';
import * as S from './styles';
import { Cart } from '../components/Cart';
import { CartItem } from '../types/CartItem';
import { Product } from '../types/Product';
import { ActivityIndicator } from 'react-native';
import { products as productsMock } from '../mocks/products';
import { Empty } from '../components/Icons';

export function Main() {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>(productsMock);

  function handleCloseModal() {
    setIsTableModalVisible(false);
  }

  function handleOpenModal() {
    setIsTableModalVisible(true);
  }

  function handleSave(table: string) {
    setSelectedTable(table);
    handleCloseModal();
  }

  function handleAddToCart(product: Product) {
    if (!selectedTable) {
      setIsTableModalVisible(true);
    }

    setCartItems((prev) => {
      const itemIndex = prev.findIndex((item) => item.product._id === product._id);

      if (itemIndex < 0) {
        return prev.concat({ quantity: 1, product });
      }

      const newCartItems = [...prev];
      const item = newCartItems[itemIndex];

      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity + 1,
      };

      return newCartItems;
    });
  }

  function handleDecrementCartItem(product: Product) {
    setCartItems((prev) => {
      const itemIndex = prev.findIndex((item) => item.product._id === product._id);

      const item = prev[itemIndex];
      const newCartItems = [...prev];

      if (item.quantity === 1) {
        newCartItems.splice(itemIndex, 1);

        return newCartItems;
      }

      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity - 1,
      };

      return newCartItems;
    });
  }

  function handleResetOrder() {
    setCartItems([]);
    setSelectedTable('');
  }

  return (
    <>
      <S.Container>
        <Header selectedTable={selectedTable} onCancelOrder={handleResetOrder} />

        {isLoading && (
          <S.CenteredContainer>
            <ActivityIndicator size="large" color="#d73035" />
          </S.CenteredContainer>
        )}

        {!isLoading && (
          <>
            <S.CategoriesContainer>
              <Categories />
            </S.CategoriesContainer>

            {products.length > 0 ? (
              <S.MenuContainer>
                <Menu products={products} onAddToCart={handleAddToCart} />
              </S.MenuContainer>
            ) : (
              <S.CenteredContainer>
                <Empty />
                <Text color="#666" style={{ marginTop: 24 }}>No products found</Text>
              </S.CenteredContainer>
            )}
          </>
        )}
      </S.Container>

      <S.Footer>
        <S.FooterContainer>
          {!selectedTable && (
            <Button onPress={handleOpenModal} disabled={isLoading}>
              New order
            </Button>
          )}

          {selectedTable && (
            <Cart
              onConfirmOrder={handleResetOrder}
              onAdd={handleAddToCart}
              onRemove={handleDecrementCartItem}
              items={cartItems}
            />
          )}
        </S.FooterContainer>
      </S.Footer>

      <TableModal
        onClose={handleCloseModal}
        visible={isTableModalVisible}
        onSave={handleSave}
      />
    </>
  );
}
