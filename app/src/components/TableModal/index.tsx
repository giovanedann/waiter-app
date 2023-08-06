import { Modal, Pressable, Platform } from 'react-native';

import * as S from './styles';
import { Text } from '../Text';
import { Close } from '../Icons';
import { Button } from '../Button';

type TableModalProps = {
  visible: boolean
  onClose: () => void
}

export function TableModal({ visible, onClose }: TableModalProps) {
  return (
    <Modal transparent visible={visible} animationType='fade'>
      <S.Overlay behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
        <S.ModalBody>
          <S.Header>
            <Text weight="600">Enter the table</Text>

            <Pressable onPress={onClose}>
              <Close color="#666" />
            </Pressable>
          </S.Header>

          <S.Form>
            <S.Input
              placeholder="Table number"
              placeholderTextColor="#666"
              keyboardType='number-pad'
            />

            <Button onPress={() => alert('Order finished')}>
              Finish
            </Button>
          </S.Form>
        </S.ModalBody>
      </S.Overlay>
    </Modal>
  );
}
