import { ValidationSchema, ValidationErrors } from './types.js';

export class ValidationError extends Error {
 
    public errors: ValidationErrors;

    constructor(errors: ValidationErrors) {
        super("validation failed");
        this.name = 'ValidationError';
        this.errors = errors;
    }
}



export class Validator {

    private schema: ValidationSchema;
    constructor(schema: ValidationSchema) {
        this.schema = schema;
    }
    validate(data:Record<string, any>): boolean {
        const errors:ValidationErrors = {};
        for (const [field,rules] of Object.entries(this.schema))  {
           const value = data[field];
           const fieldError:string[] = [];

           //required check

           if(rules.required && (value === undefined || value === null || value === '')) {
            fieldError.push(`${field} is required`);
            errors[field] = fieldError;
            continue;
           }

           if(value === undefined || value === null ) {
            continue;
           }

           //type check
           if(rules.type) {
            const actualType = Array.isArray(value) ? 'array' : typeof value;
            if (actualType !== rules.type) {
              fieldError.push(`${field} must be a ${rules.type}`);
              errors[field] = fieldError;
              continue;
            }
           }
           
           //min length check
           if(rules.minLength && value.length < rules.minLength) {
            fieldError.push(`${field} must be at least ${rules.minLength} characters long`);
            errors[field] = fieldError;
            continue;
           }

           //max length check
           if(rules.maxLength && value.length > rules.maxLength) {
            fieldError.push(`${field} must be at most ${rules.maxLength} characters long`);
            errors[field] = fieldError;
            continue;
           }

           //string validation
           if(rules.type === 'string' && typeof value !== 'string') {
            fieldError.push(`${field} must be a string`);
            errors[field] = fieldError;
            continue;
           }
           
           //number validation
           if(rules.type === 'number' && typeof value !== 'number') {
            fieldError.push(`${field} must be a number`);
            errors[field] = fieldError;
            continue;
           }

           //email validation
           if(rules.email && !value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            fieldError.push(`${field} must be a valid email`);
            errors[field] = fieldError;
            continue;
           }
           
           //password validation
           if(rules.password && !value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
            fieldError.push(`${field} must be a valid password`);
            errors[field] = fieldError;
            continue;
           }
           
           //date validation
           if(rules.date && !value.match(/^\d{4}-\d{2}-\d{2}$/)) {
            fieldError.push(`${field} must be a valid date`);
            errors[field] = fieldError;
            continue;
           }
           
           //boolean validation
           if(rules.type === 'boolean' && typeof value !== 'boolean') {
            fieldError.push(`${field} must be a boolean`);
            errors[field] = fieldError;
            continue;
           }
           
           //array validation
           if(rules.type === 'array' && !Array.isArray(value)) {
            fieldError.push(`${field} must be an array`);
            errors[field] = fieldError;
            continue;
           }
           
           //object validation
           if(rules.type === 'object' && typeof value !== 'object') {
            fieldError.push(`${field} must be an object`);
            errors[field] = fieldError;
            continue;
           }
           
           //enum validation
           if(rules.enum && !rules.enum.includes(value)) {
            fieldError.push(`${field} must be a valid enum`);
            errors[field] = fieldError;
            continue;
           }

           //custom validation
           if(rules.custom) {
            const customError = rules.custom(value, data);
            if (customError) {
              fieldError.push(customError);
            }
           }
           
           //add custom error
           if(fieldError.length > 0) {
            errors[field] = fieldError;
           }
        }

        if(Object.keys(errors).length > 0) {
            throw new ValidationError(errors);
           }
           return true;
        
    }
}
