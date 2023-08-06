import { Modal, Pressable, Platform } from 'react-native';

import * as S from './styles';
import { Text } from '../Text';
import { Close } from '../Icons';
import { Button } from '../Button';

export function TableModal() {
  return (
    <Modal transparent>
      <S.Overlay behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
        <S.ModalBody>
          <S.Header>
            <Text weight="600">Enter the table</Text>
            <Pressable>
              <Close color="#666" />
            </Pressable>
          </S.Header>

          <S.Form>
            <S.Input
              placeholder="Table number"
              placeholderTextColor="#666"
              keyboardType='number-pad'
            />

            <Button onPress={() => alert('Finished order')}>
              Finish
            </Button>
          </S.Form>
        </S.ModalBody>
      </S.Overlay>
    </Modal>
  );
}
