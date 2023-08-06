import { Header, Menu } from '../components';
import { Categories } from '../components/Categories';
import * as S from './styles';

export function Main() {
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

        </S.FooterContainer>
      </S.Footer>
    </>
  );
}
