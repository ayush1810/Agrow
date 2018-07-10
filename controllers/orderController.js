const mongoose = require('mongoose');
const   Order = require('../models/Order.js'),
        Bid = require('../models/Bid.js'),
        Customer = require('../models/Customer.js')
        Seller = require('../models/Seller.js'),
        Item = require('../models/Item.js');
 
exports.handleNewOrders = (req, res) => {
        let tod = new Date(Date.now()).toJSON().split('T')[0];  
        let tom = new Date(Date.now()+24 * 60 * 60 * 1000).toJSON().split('T')[0];
        Item.find({
            dateEnd: {
                $gte: tod,
                $lt: tom
            }
        })
        .populate('seller')
        .exec((err, records)=>{
            if(err || !records){
                console.log("No data found");
                return; 
            }
            else{
                let newOrder, sprice;
                records.map(item =>{
                    
                    Item.findByIdAndUpdate(item._id, {status: "Sold"}, (err, record)=> {
                        if(err){
                            console.log("Couldn't update item");
                        }
                    });

                    Bid.findOne({ item: item._id })
                    .sort('-value')
                    .populate('bidder')
                    .exec(function (err, bid) {
                        newOrder = new Order({
                            item : item._id,
                            value: bid.value,
                            customer: bid.bidder,
                            seller : item.seller,
                            status: "In Transit"
                        });
                        newOrder.save().then(()=>{
                            console.log("*** NEW ORDER *** \nOrder ID: "+ newOrder._id +"\nItem: " + item.name + "\nSeller: " + item.seller.name + "\nCustomer: " + bid.bidder.name + "\nValue: "+ bid.value);
                            Seller.findByIdAndUpdate(item.seller,{ $inc: {wallet: bid.value }},{new:true} ,(err, seller)=>{
                                if(!err){
                                    console.log("Seller wallet updated to "+ seller.wallet);
                                }
                            });
                            Customer.findOne({_id:bid.bidder}, (err, record)=>{
                                if(record){
                                    record.orders.push(newOrder._id);
                                    record.save(err=>{
                                        if(err){
                                        console.log("Unable to push order");
                                        }
                                        
                                    });
                                }
                                else{
                                    console.log("Sorry, couldn't find the customer!");
                                }
                            });
                            Bid.find({item: item._id, value : {$lt: bid.value}}, (err, bids)=>{
                                if(err){
                                    console.log("Error fetching other bids"); 
                                    return;
                                }
                                else if(!bids){
                                    console.log("No other bids found");
                                }
                                else{
                                    bids.map(bid => {
                                        Seller.findByIdAndUpdate(bid.bidder, {$inc:{wallet: bid.value }}, (err, seller)=>{
                                            if(err){
                                                console.log("Error refunding bid amounts");
                                                return;
                                            }
                                            else{
                                                console.log("All refunds finished");
                                            }
                                        });
                                    });
                                }
                            });
                        });
                    });                  
                });
            }
        });
};
