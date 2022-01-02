import { useInsertProduct } from './hooks/useInsertProduct';
import { useUpdateProduct } from './hooks/useUpdateProduct';
import type { Product } from './types/Product';
import { ProductCard } from './components/ProductCard';
import { ProductDetail } from './components/ProductDetail';
import { ProductListItem } from './components/ProductListItem';
import { RelatedProductList } from './components/RelatedProductList';
import { ProductList } from './components/ProductList';
import { ProductAdmin } from './components/ProductAdmin';

export type { Product };
export {
  useInsertProduct,
  useUpdateProduct,
  ProductCard,
  ProductDetail,
  ProductListItem,
  ProductList,
  RelatedProductList,
  ProductAdmin,
};
