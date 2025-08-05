const orderController = require('./controllers/orderController');
console.log('orderController exports:', Object.keys(orderController));
console.log('createOrder:', typeof orderController.createOrder);
