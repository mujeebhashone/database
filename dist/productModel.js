import { FileDB } from './db.js';
import { v4 as uuidv4 } from 'uuid';
import { Validator } from './validator.js';
export class ProductModel extends FileDB {
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
        };
        this.validator = new Validator(this.validationSchema);
    }
    createProduct(data) {
        this.validator.validate(data);
        const product = {
            id: uuidv4(),
            ...data,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        super.create(product);
        return product;
    }
    getProductById(id) {
        return super.findOne(id);
    }
    getAllProducts(options) {
        return super.findAll(options || {});
    }
    updateProduct(id, data) {
        const updatedData = {
            ...data,
            updatedAt: new Date().toISOString()
        };
        super.update(id, updatedData);
    }
    deleteProduct(id) {
        super.delete(id);
    }
}
const productModel = new ProductModel();
export default productModel;
//# sourceMappingURL=productModel.js.map