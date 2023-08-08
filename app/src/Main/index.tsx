import { useEffect, useState } from 'react';
import { Header, Menu, TableModal, Text } from '../components';
import { Button } from '../components/Button';
import { Categories } from '../components/Categories';
import * as S from './styles';
import { Cart } from '../components/Cart';
import { CartItem } from '../types/CartItem';
import { Product } from '../types/Product';
import { ActivityIndicator } from 'react-native';
import { products as productsMock } from '../mocks/products';
import { categories as categoriesMock } from '../mocks/categories';
import { Empty } from '../components/Icons';
import { Category } from '../types/Category';
import CategoriesService from '../services/CategoriesService';
import ProductsService from '../services/ProductsService';

export function Main() {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>(productsMock);
  const [categories, setCategories] = useState<Category[]>(categoriesMock);

  async function loadData() {
    setIsLoading(true);

    const [
      products,
      categories
    ] = await Promise.all([ProductsService.findAll(), CategoriesService.findAll()]);

    setCategories(categories);
    setProducts(products);

    setIsLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleSelectCategory(categoryId: string) {
    setIsLoadingProducts(true);

    if (categoryId) {
      const productsByCategory = await CategoriesService.findProductsByCategoryId(categoryId);

      setProducts(productsByCategory);
      setIsLoadingProducts(false);

      return;
    }

    const allProducts = await ProductsService.findAll();

    setProducts(allProducts);
    setIsLoadingProducts(false);
  }

  function handleCloseModal() {
    setIsTableModalVisible(false);
  }

  function handleOpenModal() {
    setIsTableModalVisible(true);
  }

  function handleSave(table: string) {
    setSelectedTable(table);
    handleCloseModal();
  }

  function handleAddToCart(product: Product) {
    if (!selectedTable) {
      setIsTableModalVisible(true);
    }

    setCartItems((prev) => {
      const itemIndex = prev.findIndex((item) => item.product._id === product._id);

      if (itemIndex < 0) {
        return prev.concat({ quantity: 1, product });
      }

      const newCartItems = [...prev];
      const item = newCartItems[itemIndex];

      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity + 1,
      };

      return newCartItems;
    });
  }

  function handleDecrementCartItem(product: Product) {
    setCartItems((prev) => {
      const itemIndex = prev.findIndex((item) => item.product._id === product._id);

      const item = prev[itemIndex];
      const newCartItems = [...prev];

      if (item.quantity === 1) {
        newCartItems.splice(itemIndex, 1);

        return newCartItems;
      }

      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity - 1,
      };

      return newCartItems;
    });
  }

  function handleResetOrder() {
    setCartItems([]);
    setSelectedTable('');
  }

  return (
    <>
      <S.Container>
        <Header selectedTable={selectedTable} onCancelOrder={handleResetOrder} />

        {isLoading && (
          <S.CenteredContainer>
            <ActivityIndicator size="large" color="#d73035" />
          </S.CenteredContainer>
        )}

        {!isLoading && (
          <>
            <S.CategoriesContainer>
              <Categories categories={categories} onCategoryPress={handleSelectCategory} />
            </S.CategoriesContainer>

            {isLoadingProducts ? (
              <S.CenteredContainer>
                <ActivityIndicator size="large" color="#d73035" />
              </S.CenteredContainer>
            ) : (
              <>
                {products.length > 0 ? (
                  <S.MenuContainer>
                    <Menu products={products} onAddToCart={handleAddToCart} />
                  </S.MenuContainer>
                ) : (
                  <S.CenteredContainer>
                    <Empty />
                    <Text color="#666" style={{ marginTop: 24 }}>No products found</Text>
                  </S.CenteredContainer>
                )}
              </>
            )}

          </>
        )}
      </S.Container>

      <S.Footer>
        <S.FooterContainer>
          {!selectedTable && (
            <Button onPress={handleOpenModal} disabled={isLoading}>
              New order
            </Button>
          )}

          {selectedTable && (
            <Cart
              onConfirmOrder={handleResetOrder}
              onAdd={handleAddToCart}
              onRemove={handleDecrementCartItem}
              items={cartItems}
              selectedTable={selectedTable}
            />
          )}
        </S.FooterContainer>
      </S.Footer>

      <TableModal
        onClose={handleCloseModal}
        visible={isTableModalVisible}
        onSave={handleSave}
      />
    </>
  );
}
