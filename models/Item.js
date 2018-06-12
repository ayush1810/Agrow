/*jshint esversion: 6 */
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const ItemSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: `Enter a valid item name`
    },
    quantity: Number,
    rate: Number,
    seller: {
        type: String,
        trim: true,
    },
});
module.exports = mongoose.model('Item',ItemSchema);