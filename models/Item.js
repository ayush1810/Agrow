const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Seller = require('./Seller.js');

const ItemSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: `Enter a valid item name`
    },
    quantity:{
        type: Number,
        required: true
    },
    rate:{
        type: Number,
        required: true
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
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
    image: {
        type : String,
        default: 'https://images.pexels.com/photos/60021/grapes-wine-fruit-vines-60021.jpeg'
    },
    status: {
        type: String,
        default: 'Ongoing Bidding'
    }
});
module.exports = mongoose.model('Item',ItemSchema);