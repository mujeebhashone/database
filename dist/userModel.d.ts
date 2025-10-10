import { FileDB } from './db.js';
import { User, QueryOptions } from './types.js';
interface CreateUserInput {
    name: string;
    email: string;
    password: string;
    age?: number;
    role?: 'user' | 'admin' | 'moderator';
}
export declare class UserModel extends FileDB<User> {
    private validationSchema;
    private validator;
    constructor();
    createUser(data: CreateUserInput): User;
    getUserById(id: string): User | null;
    getAllUsers(options?: QueryOptions): User[];
    updateUser(id: string, data: Partial<CreateUserInput>): void;
    deleteUser(id: string): void;
}
declare const userModel: UserModel;
export default userModel;
//# sourceMappingURL=userModel.d.ts.map