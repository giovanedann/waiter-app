import { useState } from 'react';
import { Header, Menu, TableModal } from '../components';
import { Button } from '../components/Button';
import { Categories } from '../components/Categories';
import * as S from './styles';

export function Main() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');

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

  return (
    <>
      <S.Container>
        <Header />
        <S.CategoriesContainer>
          <Categories />
        </S.CategoriesContainer>

        <S.MenuContainer>
          <Menu />
        </S.MenuContainer>
      </S.Container>

      <S.Footer>
        <S.FooterContainer>
          <Button onPress={handleOpenModal}>
            New order
          </Button>
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
