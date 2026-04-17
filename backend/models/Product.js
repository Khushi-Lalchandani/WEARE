const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    badge: {
        type: String
    },
    size: {
        type: String
    },
    details: {
        material: String,
        care: String,
        fit: String,
        sustainable: String
    },
    offers: [{
        code: String,
        description: String
    }],
    tags: [{
        type: String // 'featured', 'new', 'best-seller'
    }]
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
