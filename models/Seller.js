/*jshint esversion: 6 */
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const SellerSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: `Enter a valid Seller name`
    },
    location: String,
    rating : {
        type: Number
    } 
});
module.exports = mongoose.model('Seller',SellerSchema);