import { FileDB } from './db.js';
import { Product, QueryOptions } from './types.js';
interface CreateProductInput {
    name: string;
    price: number;
    quantity: number;
    category?: string;
}
export declare class ProductModel extends FileDB<Product> {
    private validationSchema;
    private validator;
    constructor();
    createProduct(data: CreateProductInput): Product;
    getProductById(id: string): Product | null;
    getAllProducts(options?: QueryOptions): Product[];
    updateProduct(id: string, data: Partial<CreateProductInput>): void;
    deleteProduct(id: string): void;
}
declare const productModel: ProductModel;
export default productModel;
//# sourceMappingURL=productModel.d.ts.map