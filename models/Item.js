const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Seller = require('./Seller.js');

const ItemSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: `Enter a valid item name`
    },
    quantity: Number,
    rate: Number,
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Seller'
    },
});
module.exports = mongoose.model('Item',ItemSchema);