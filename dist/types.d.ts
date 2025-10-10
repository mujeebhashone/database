export interface BaseEntity {
    id: string;
    createdAt: string;
    updatedAt: string;
}
export type ValidationRuleType = 'string' | 'number' | 'boolean' | 'array' | 'object';
export interface ValidationRule {
    required?: boolean;
    type?: ValidationRuleType;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    email?: boolean;
    password?: boolean;
    date?: boolean;
    enum?: any[];
    custom?: (value: any, data?: any) => string | null | undefined;
}
export interface ValidationSchema {
    [field: string]: ValidationRule;
}
export interface ValidationErrors {
    [field: string]: string[];
}
export interface QueryOptions {
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    skip?: number;
    limit?: number | null;
    page?: number;
}
export interface DatabaseCollection {
    [collectionName: string]: any[];
}
export interface User extends BaseEntity {
    name: string;
    email: string;
    password: string;
    age?: number;
    role?: 'user' | 'admin' | 'moderator';
}
export interface Product extends BaseEntity {
    name: string;
    price: number;
    quantity: number;
    category?: string;
}
//# sourceMappingURL=types.d.ts.map