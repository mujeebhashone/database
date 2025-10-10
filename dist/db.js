import fs from 'fs';
import path from 'path';
const filePath = path.join(process.cwd(), 'db.json');
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({ users: [] }, null, 2));
}
export class FileDB {
    constructor(collectionName) {
        this.collectionName = collectionName;
    }
    readDB() {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    }
    writeDB(data) {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    }
    findAll(options = {}) {
        const { sortBy = 'id', sortOrder = 'asc', skip = 0, limit = null, page = 1 } = options;
        const data = this.readDB();
        if (!data[this.collectionName]) {
            data[this.collectionName] = [];
        }
        let collection = data[this.collectionName];
        if (sortBy) {
            collection.sort((a, b) => {
                const aVal = a[sortBy];
                const bVal = b[sortBy];
                // Handle string comparison
                if (typeof aVal === 'string' && typeof bVal === 'string') {
                    return sortOrder === 'asc'
                        ? aVal.localeCompare(bVal)
                        : bVal.localeCompare(aVal);
                }
                return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
            });
        }
        if (skip) {
            collection = collection.slice(skip);
        }
        if (page && limit) {
            collection = collection.slice((page - 1) * limit, page * limit);
        }
        else if (limit) {
            collection = collection.slice(0, limit);
        }
        return collection;
    }
    findOne(id) {
        const data = this.readDB();
        if (!data[this.collectionName]) {
            return null;
        }
        return data[this.collectionName].find((item) => item.id === id) || null;
    }
    create(newData) {
        const data = this.readDB();
        // Initialize collection if it doesn't exist
        if (!data[this.collectionName]) {
            data[this.collectionName] = [];
        }
        data[this.collectionName].push(newData);
        this.writeDB(data);
    }
    update(id, updatedData) {
        const data = this.readDB();
        if (!data[this.collectionName]) {
            data[this.collectionName] = [];
        }
        data[this.collectionName] = data[this.collectionName].map((item) => item.id === id ? { ...item, ...updatedData } : item);
        this.writeDB(data);
    }
    delete(id) {
        const data = this.readDB();
        if (!data[this.collectionName]) {
            data[this.collectionName] = [];
        }
        data[this.collectionName] = data[this.collectionName].filter((item) => item.id !== id);
        this.writeDB(data);
    }
}
//# sourceMappingURL=db.js.map