import { useState } from 'react';
import { Header, Menu, TableModal } from '../components';
import { Button } from '../components/Button';
import { Categories } from '../components/Categories';
import * as S from './styles';
import { Cart } from '../components/Cart';
import { CartItem } from '../types/CartItem';
import { Product } from '../types/Product';

export function Main() {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

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

  function handleCancelOrder() {
    setSelectedTable('');
    setCartItems([]);
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

  return (
    <>
      <S.Container>
        <Header selectedTable={selectedTable} onCancelOrder={handleCancelOrder} />

        <S.CategoriesContainer>
          <Categories />
        </S.CategoriesContainer>

        <S.MenuContainer>
          <Menu onAddToCart={handleAddToCart} />
        </S.MenuContainer>
      </S.Container>

      <S.Footer>
        <S.FooterContainer>
          {!selectedTable && (
            <Button onPress={handleOpenModal}>
              New order
            </Button>
          )}

          {selectedTable && (
            <Cart onAdd={handleAddToCart} onRemove={handleDecrementCartItem} items={cartItems} />
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
