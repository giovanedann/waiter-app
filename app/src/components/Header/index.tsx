import { Text } from '../Text';
import * as S from './styles';

export function Header() {
  return (
    <S.Container>
      <Text size={14} opacity={0.9}>Welcome to</Text>
      <Text size={24} weight="700">
        WAITER
        <Text size={24}>APP</Text>
      </Text>
    </S.Container>
  );
}
