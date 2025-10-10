import { ValidationSchema, ValidationErrors } from './types.js';
export declare class ValidationError extends Error {
    errors: ValidationErrors;
    constructor(errors: ValidationErrors);
}
export declare class Validator {
    private schema;
    constructor(schema: ValidationSchema);
    validate(data: Record<string, any>): boolean;
}
//# sourceMappingURL=validator.d.ts.map