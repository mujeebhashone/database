import { QueryOptions, DatabaseCollection } from './types.js';
export declare class FileDB<T extends {
    id: string;
}> {
    protected collectionName: string;
    constructor(collectionName: string);
    protected readDB(): DatabaseCollection;
    protected writeDB(data: DatabaseCollection): void;
    findAll(options?: QueryOptions): T[];
    findOne(id: string): T | null;
    create(newData: T): void;
    update(id: string, updatedData: Partial<T>): void;
    delete(id: string): void;
}
//# sourceMappingURL=db.d.ts.map