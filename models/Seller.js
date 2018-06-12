const mongoose = require('mongoose');

const SellerSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: `Enter a valid Seller name`
    },
    email: {
        type: String,
        required: 'Enter an email address'
    },
    location: String,   
});
module.exports = mongoose.model('Seller',SellerSchema);