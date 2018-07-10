const mongoose = require('mongoose');
const Item = require("./Item.js");
const Customer = require("./Customer.js");
const Seller = require("./Seller.js");

const OrderSchema = new mongoose.Schema ({
    dateCreated:{
        type: Date,
        default: Date.now()
    },
    item:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    },
    seller:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller'
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    value: {
        type:Number,
        required:true
    },
    status: {
        type:String,
        default: 'In Progress'
    }
});

let Order = mongoose.model('Order', OrderSchema); 
module.exports = Order;