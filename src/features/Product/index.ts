import { useInsertProduct } from './hooks/useInsertProduct';
import type { Product } from './types/Product';
import { ProductCard } from './components/ProductCard';
import { ProductDetail } from './components/ProductDetail';
import { ProductListItem } from './components/ProductListItem';
import { RelatedProductList } from './components/RelatedProductList';
import { ProductList } from './components/ProductList';

export type { Product };
export {
  useInsertProduct,
  ProductCard,
  ProductDetail,
  ProductListItem,
  ProductList,
  RelatedProductList,
};
