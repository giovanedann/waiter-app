import { Pressable } from 'react-native';
import { Text } from '../Text';
import * as S from './styles';

type HeaderProps = {
  selectedTable: string;
  onCancelOrder: () => void
}

export function Header({ selectedTable, onCancelOrder }: HeaderProps) {
  return (
    <S.Container>
      {!selectedTable && (
        <>
          <Text size={14} opacity={0.9}>Welcome to</Text>
          <Text size={24} weight="700">
            WAITER
            <Text size={24}>APP</Text>
          </Text>
        </>
      )}

      {selectedTable && (
        <S.Content>
          <S.OrderHeader>
            <Text size={24} weight="600">Order</Text>
            <Pressable onPress={onCancelOrder}>
              <Text color="#d73035" weight="600" size={14}>Cancel order</Text>
            </Pressable>
          </S.OrderHeader>

          <S.Table>
            <Text color="#666">Table {selectedTable}</Text>
          </S.Table>
        </S.Content>
      )}
    </S.Container>
  );
}
