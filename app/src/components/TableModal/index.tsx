import { Modal, Pressable, Platform } from 'react-native';

import * as S from './styles';
import { Text } from '../Text';
import { Close } from '../Icons';
import { Button } from '../Button';
import { useState } from 'react';

type TableModalProps = {
  visible: boolean
  onClose: () => void
  onSave: (tableNumber: string) => void;
}

export function TableModal({ visible, onClose, onSave }: TableModalProps) {
  const [table, setTable] = useState('');

  function handleClose() {
    onClose();
    setTable('');
  }

  function handleSave() {
    onSave(table);
    handleClose();
  }

  return (
    <Modal transparent visible={visible} animationType='fade'>
      <S.Overlay behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
        <S.ModalBody>
          <S.Header>
            <Text weight="600">Enter the table</Text>

            <Pressable onPress={handleClose}>
              <Close color="#666" />
            </Pressable>
          </S.Header>

          <S.Form>
            <S.Input
              placeholder="Table number"
              placeholderTextColor="#666"
              keyboardType='number-pad'
              onChangeText={setTable}
            />

            <Button onPress={() => handleSave()} disabled={table.length === 0}>
              Finish
            </Button>
          </S.Form>
        </S.ModalBody>
      </S.Overlay>
    </Modal>
  );
}
