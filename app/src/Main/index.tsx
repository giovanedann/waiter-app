import { useState } from 'react';
import { Header, Menu, TableModal } from '../components';
import { Button } from '../components/Button';
import { Categories } from '../components/Categories';
import * as S from './styles';
import { Cart } from '../components/Cart';
import { CartItem } from '../types/CartItem';
import { products } from '../mocks/products';

export function Main() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [cartItems] = useState<CartItem[]>([{ product: products[0], quantity: 1 }, { product: products[1], quantity: 2 }]);

  function handleCloseModal() {
    setIsModalVisible(false);
  }

  function handleOpenModal() {
    setIsModalVisible(true);
  }

  function handleSave(table: string) {
    setSelectedTable(table);
    handleCloseModal();
  }

  function handleCancelOrder() {
    setSelectedTable('');
  }

  return (
    <>
      <S.Container>
        <Header selectedTable={selectedTable} onCancelOrder={handleCancelOrder} />

        <S.CategoriesContainer>
          <Categories />
        </S.CategoriesContainer>

        <S.MenuContainer>
          <Menu />
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
            <Cart items={cartItems} />
          )}
        </S.FooterContainer>
      </S.Footer>

      <TableModal
        onClose={handleCloseModal}
        visible={isModalVisible}
        onSave={handleSave}
      />
    </>
  );
}
