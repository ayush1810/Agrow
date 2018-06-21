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
    dateCreated: {
        type: Date, 
        default: Date.now()
    },
    dateEnd : {
        type: Date, 
        default : Date.now() + 7*24*60*60*1000
    },
});
module.exports = mongoose.model('Item',ItemSchema);