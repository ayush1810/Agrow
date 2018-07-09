const mongoose = require('mongoose');
const Bid = require('../models/Bid.js'),
    Item = require('../models/Item.js'),
    Customer = require('../models/Customer.js');

exports.getItemBids = (req, res) => {
    let itemId;
    try {
        itemId = req.params.id;
    } catch (error) {
        res.status(422).json({ message: `Invalid item ID; format: ${error}` });
        return;
    }
    Bid.find({item: itemId}).populate('item').populate('bidder').exec(function (err, bids){
        if(!err){
            res.json({records : bids});
        }
        else{
            console.error(err.message);
            res.send("Error loading bids");
        }
    });
};

exports.addBid = (req, res)=>{
    const NewBid = new Bid(req.body);
    const customer = req.body.bidder; 
    Bid.create(NewBid, (err, newbid)=> {
        if (err){
            console.log("Add Bid Error" + err.message);
            res.send("Sorry that didn't work");
        }
        else{
            Customer.findOne({_id:customer}, (err, record)=>{
                if(record){
                    record.bids.push(NewBid._id);
                    record.save(err=>{
                        if(err){
                        console.log("Unable to add a new bid");
                        }
                        else
                        res.json(NewBid);
                    });
                }
                else{
                    console.log("Sorry, couldn't find the customer!");
                    res.status(422).json({status:0});
                }
            });
        }
    });
}; 