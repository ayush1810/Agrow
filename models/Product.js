const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Category = require('./Category.js');

const ProductSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: `Enter a valid category name`
    },
    description: {
        type: String, 
        default: 'Fresh Organic products'
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }
});
module.exports = mongoose.model('Product',ProductSchema);