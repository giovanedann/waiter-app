import { FlatList } from 'react-native';
import { Text } from '../Text';
import * as S from './styles';
import { useState } from 'react';
import { Category } from '../../types/Category';

type CategoriesProps = {
  categories: Category[]
  onCategoryPress: (categoryId: string) => void
}

export function Categories({ categories, onCategoryPress }: CategoriesProps) {
  const [selectedCategory, setSelectedCategory] = useState('');

  function handleSelectCategory(categoryId: string) {
    const category = selectedCategory === categoryId ? '' : categoryId;

    setSelectedCategory(category);
    onCategoryPress(category);
  }

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={categories}
      contentContainerStyle={{ paddingRight: 24 }}
      keyExtractor={(category) => category._id}
      renderItem={({ item }) => {
        const isSelected = item._id === selectedCategory;

        return (
          <S.Category key={item._id} onPress={() => handleSelectCategory(item._id)}>
            <S.Icon>
              <Text opacity={isSelected ? 1 : 0.5}>
                {item.icon}
              </Text>
            </S.Icon>

            <Text size={14} weight="600" opacity={isSelected ? 1 : 0.5}>
              {item.name}
            </Text>
          </S.Category>
        );
      }}
    />
  );
}
