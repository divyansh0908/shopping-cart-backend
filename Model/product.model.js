// Add Product Model With Schema
// 1. Product Name
// 2. Product Image
// 3. Description
// 4. Quantity
// 5. Unit Price

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    unitPrice: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Product', productSchema);
