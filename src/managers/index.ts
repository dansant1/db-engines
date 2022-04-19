import {
    ProductManager,
} from './product.manager';
import {
    CacheManager
} from './cache.manager';

export const ProductManagerInstance = ProductManager.create();
export const CacheManagerInstance = CacheManager.create();