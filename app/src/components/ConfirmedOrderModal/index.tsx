import { Modal } from 'react-native';

import * as S from './styles';
import { CheckCircle } from '../Icons';
import { Text } from '../Text';

type ConfirmedOrderModalProps = {
  visible: boolean;
  onOkClick: () => void;
}

export function ConfirmedOrderModal({ visible, onOkClick }: ConfirmedOrderModalProps) {
  return (
    <Modal visible={visible} animationType='slide'>
      <S.Container>
        <CheckCircle />
        <Text style={{ marginTop: 12 }} size={20} weight="600" color="#fff">
          Order confirmed
        </Text>
        <Text style={{ marginTop: 8 }} color="#fff" opacity={0.9}>
          Your order is already being prepared!
        </Text>

        <S.OkButton onPress={onOkClick}>
          <Text color="#d73035" weight="600">OK</Text>
        </S.OkButton>
      </S.Container>
    </Modal>
  );
}
