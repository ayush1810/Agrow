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
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }
});

ProductSchema.pre('save', function (next) {
    var product = this;
    console.log(product.category);
    if (!product.description){
        product.description = `Fresh ${product.name} from organic farms of South India.`; 
    }
    if(!product.category){
        product.category = new mongoose.Types.ObjectId('5b2c94fb93368a1fc75c9b87');
    }
    next();
});

module.exports = mongoose.model('Product',ProductSchema);
