/*jshint esversion: 6 */
const mongoose = require('mongoose');

const SellerSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: `Enter a valid Seller name`
    },
    email: {
        type: String,
    },
    location: String,   
});
module.exports = mongoose.model('Seller',SellerSchema);