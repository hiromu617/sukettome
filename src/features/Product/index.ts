import { useInsertProduct } from './hooks/useInsertProduct';
import { useUpdateProduct } from './hooks/useUpdateProduct';
import type { Product } from './types/Product';
import { ProductCard } from './components/ProductCard';
import { ProductDetail } from './components/ProductDetail';
import { ProductListItem } from './components/ProductListItem';
import { RelatedProductList } from './components/RelatedProductList';
import { ProductList } from './components/ProductList';
import { ProductImageUpload } from './components/ProductImageUpload';
import { ProductAdmin } from './components/ProductAdmin';
import { useUpdateProductImage } from './hooks/useUpdateProductImage';

export type { Product };
export {
  useInsertProduct,
  useUpdateProduct,
  useUpdateProductImage,
  ProductCard,
  ProductDetail,
  ProductListItem,
  ProductList,
  RelatedProductList,
  ProductAdmin,
  ProductImageUpload,
};
