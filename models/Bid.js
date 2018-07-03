const mongoose = require('mongoose');
const Item = require("./Item.js");
const Customer = require("./Customer.js");

const BidSchema = new mongoose.Schema ({
    item:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    },
    bidder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    value: {
        type:Number,
        required:true
    }
});

let Bid = mongoose.model('Bid', BidSchema); 
module.exports = Bid;