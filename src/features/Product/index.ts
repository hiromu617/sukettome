import { useInsertProduct } from './hooks/useInsertProduct';
import type { Product } from './types/Product';
import { ProductCard } from './components/ProductCard';
import { ProductDetail } from './components/ProductDetail';
import { ProductListItem } from './components/ProductListItem';

export type { Product };
export { useInsertProduct, ProductCard, ProductDetail, ProductListItem };
