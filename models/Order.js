const mongoose = require('mongoose');
const Item = require("./Item.js");
const Customer = require("./Customer.js");

const OrderSchema = new mongoose.Schema ({
    item:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    },
    dateCreated:{
        type: Date,
        default: Date.now()
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