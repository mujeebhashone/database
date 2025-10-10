import productModel from './productModel.js';
import userModel from './userModel.js';
try {
    const user1 = userModel.createUser({
        name: 'John Doe',
        email: 'john@example.com',
        password: '12345678'
    });
    console.log('✅ Success - User created:', user1.name);
}
catch (error) {
    console.log('❌ Error:', error.errors);
}
try {
    const user2 = userModel.createUser({
        email: 'test@example.com',
        password: '12345678'
    });
    console.log('✅ Success:', user2);
}
catch (error) {
    console.log('✅ Validation caught error 2:', error.errors);
}
try {
    const user3 = userModel.createUser({
        name: 'Jane Doe',
        email: 'invalid-email',
        password: '12345678'
    });
    console.log('✅ Success:', user3);
}
catch (error) {
    console.log('✅ Validation caught error 3:', error.errors);
}
try {
    const user4 = userModel.createUser({
        name: 'Bob Smith',
        email: 'bob@example.com',
        password: '123'
    });
    console.log('✅ Success:', user4);
}
catch (error) {
    console.log('✅ Validation caught error 4:', error.errors);
}
try {
    const user5 = userModel.createUser({
        name: 'Jo',
        email: 'jo@example.com',
        password: '12345678'
    });
    console.log('✅ Success:', user5);
}
catch (error) {
    console.log('✅ Validation caught error 5:', error.errors);
}
try {
    const user6 = userModel.createUser({
        name: 'AB',
        email: 'bademail',
        password: '123'
    });
    console.log('✅ Success:', user6);
}
catch (error) {
    console.log('✅ Validation caught error 6:', error.errors);
}
try {
    const product1 = productModel.createProduct({
        name: 'Product 1',
        price: 100,
        quantity: 10
    });
    console.log('✅ Success:', product1);
}
catch (error) {
    console.log('✅ Validation caught error 1:', error.errors);
}
//# sourceMappingURL=index.js.map