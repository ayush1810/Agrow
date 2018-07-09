const mongoose = require('mongoose');
const Order = require('../models/Order.js'),
      Item = require('../models/Item.js');

exports.handleNewOrders = (req, res) => {
        let tod = new Date(Date.now()).toJSON().split('T')[0];  
        let tom = new Date(Date.now()+24 * 60 * 60 * 1000).toJSON().split('T')[0];
        Item.find({
            dateEnd: {
                $gte: tod,
                $lt: tom
            }
        }).exec((err, records)=>{
            if(err || !records){
                console.log("No data found");
                return; 
            }
            else{
                console.log("Found Item "+ records[0].name + "ending on \n" + JSON.stringify(records[0].dateEnd)); 
            }
        });
};
