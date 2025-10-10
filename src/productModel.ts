import { FileDB } from './db.js';
import { v4 as uuidv4 } from 'uuid';
import { Validator } from './validator.js';
import { Product, ValidationSchema, QueryOptions } from './types.js';

interface CreateProductInput {
    name: string;
    price: number;
    quantity: number;
    category?: string;
}

export class ProductModel extends FileDB<Product> {
    private validationSchema: ValidationSchema;
    private validator: Validator;

    constructor() {
        super('products');
        this.validationSchema = {
            name: {
                required: true,
                type: 'string',
                minLength: 3,
                maxLength: 50
            },
            price: {
                required: true,
                type: 'number',
                min: 0
            },
            quantity: {
                required: true,
                type: 'number',
                min: 0
            },
            category: {
                type: 'string',
                minLength: 3,
                maxLength: 50
            }
        }
        this.validator = new Validator(this.validationSchema);
    }

    createProduct(data: CreateProductInput): Product {
        this.validator.validate(data);
        const product: Product = {
            id: uuidv4(),
            ...data,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
        super.create(product);
        return product;
    }

    getProductById(id: string): Product | null {
        return super.findOne(id);
    }

    getAllProducts(options?: QueryOptions): Product[] {
        return super.findAll(options || {});
    }

    updateProduct(id: string, data: Partial<CreateProductInput>): void {
        const updatedData = {
            ...data,
            updatedAt: new Date().toISOString()
        };
        super.update(id, updatedData);
    }

    deleteProduct(id: string): void {
        super.deleteOne(id);
    }
}

const productModel = new ProductModel();
export default productModel;


