const mongoose = require('mongoose');
const Bid = require('../models/Bid.js'),
    Item = require('../models/Item.js'),
    Customer = require('../models/Customer.js');

exports.getItemBids = (req, res) => {
    let itemId;
    try {
        itemId = mongoose.Types.ObjectId(req.params.id);
    } catch (error) {
        res.status(422).json({ message: `Invalid item ID; format: ${error}` });
        return;
    }
    Bid.find({item: itemId}).populate('item').populate('bidder').exec(function (err, bids){
        if(err){
            console.error(err.message);
            res.send("Error loading bids");
        }
        else{
           if(bids){
            res.json({records : bids});
           }
           else{
               res.json({records : 0});
           }
        }
    });
};

exports.addBid = (req, res)=>{
    const NewBid = new Bid(req.body);
    const customer = mongoose.Types.ObjectId(req.body.bidder); 
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

exports.checkBid = (req, res) => {
    let itemID, customerID; 
    if (req.session){
        try{
            itemID = mongoose.Types.ObjectId(req.params.item); 
            customerID = mongoose.Types.ObjectId(req.session.customerID); 
        } catch (error) {
            res.status(422).json({ message: 'Unable to get customer/item'});
            return;
        }

        Bid.findOne({item: itemID , bidder: customerID}).exec((err, record)=> {
         if (err){
             console.log("Check Bid Error: "+ err.message);
            return;
         }
         else {
             if (record){
                console.log("Bid found");
                res.json({status:1, bidval : record.value});
             }
             else {
                 console.log("No Bid Found");
                res.json({status: 0});    
             }

         }
        });
    }
    else{
        console.log("No user logged in! Please login");
    }
};