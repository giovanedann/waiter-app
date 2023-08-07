import { FlatList, Modal } from 'react-native';

import { Text } from '../Text';
import { Product } from '../../types/Product';
import * as S from './styles';
import { Close } from '../Icons';
import { formatCurrency } from '../../utils/formatCurrency';
import { Button } from '../Button';

type ProductModalProps = {
  visible: boolean
  onClose: () => void
  product: Product | null
}

export function ProductModal({ visible, onClose, product }: ProductModalProps) {
  if (!product) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <S.Image
        source={{
          uri: `http://${process.env.EXPO_PUBLIC_ANDROID_EMULATOR_BASE_URL}:3001/uploads/${product.imagePath}`
        }}
      >
        <S.CloseButton onPress={onClose}>
          <Close />
        </S.CloseButton>
      </S.Image>

      <S.ModalBody>
        <S.Header>
          <Text size={24} weight="600">{product.name}</Text>
          <Text size={16} color="#666" style={{ marginTop: 8 }}>{product.description}</Text>
        </S.Header>

        {product.ingredients.length > 0 && (
          <S.IngredientsContainer>
            <Text weight="600" color="#666">Ingredients</Text>

            <FlatList
              data={product.ingredients}
              keyExtractor={(ingredient) => ingredient._id}
              style={{ marginTop: 16 }}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <S.Ingredient>
                  <Text>{item.icon}</Text>
                  <Text size={14} style={{ marginLeft: 20 }}>{item.name}</Text>
                </S.Ingredient>
              )}
            />
          </S.IngredientsContainer>
        )}
      </S.ModalBody>

      <S.Footer>
        <S.FooterContainer>
          <S.PriceContainer>
            <Text color="#666">Price</Text>
            <Text size={20} weight="600">{formatCurrency(product.price)}</Text>
          </S.PriceContainer>

          <Button onPress={() => alert(`Added ${product.name} to order`)}>
            Add to order
          </Button>
        </S.FooterContainer>
      </S.Footer>
    </Modal>
  );
}
