import { useState } from 'react';
import { Header, Menu, TableModal } from '../components';
import { Button } from '../components/Button';
import { Categories } from '../components/Categories';
import * as S from './styles';

export function Main() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  function handleCloseModal() {
    setIsModalVisible(false);
  }

  function handleOpenModal() {
    setIsModalVisible(true);
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

      <TableModal onClose={handleCloseModal} visible={isModalVisible} />
    </>
  );
}
