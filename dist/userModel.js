import { FileDB } from './db.js';
import { v4 as uuidv4 } from 'uuid';
import { Validator } from './validator.js';
export class UserModel extends FileDB {
    constructor() {
        super('users');
        this.validationSchema = {
            name: {
                required: true,
                type: 'string',
                minLength: 3,
                maxLength: 50
            },
            email: {
                required: true,
                type: 'string',
                email: true
            },
            password: {
                required: true,
                type: 'string',
                minLength: 8,
                maxLength: 50
            }
        };
        this.validator = new Validator(this.validationSchema);
    }
    createUser(data) {
        this.validator.validate(data);
        const user = {
            id: uuidv4(),
            ...data,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        super.create(user);
        return user;
    }
    getUserById(id) {
        return super.findOne(id);
    }
    getAllUsers(options) {
        return super.findAll(options || {});
    }
    updateUser(id, data) {
        const updateSchema = {};
        for (const [key, rules] of Object.entries(this.validationSchema)) {
            if (data.hasOwnProperty(key)) {
                // Remove 'required' for updates
                updateSchema[key] = { ...rules, required: false };
            }
        }
        if (Object.keys(updateSchema).length > 0) {
            const updateValidator = new Validator(updateSchema);
            updateValidator.validate(data);
        }
        const updatedData = {
            ...data,
            updatedAt: new Date().toISOString()
        };
        super.update(id, updatedData);
    }
    deleteUser(id) {
        const user = this.getUserById(id);
        if (!user) {
            throw new Error(`User with id ${id} not found`);
        }
        super.delete(id);
    }
}
const userModel = new UserModel();
export default userModel;
//# sourceMappingURL=userModel.js.map