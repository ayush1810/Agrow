const mongoose = require('mongoose');
const Item = require('../models/Item.js'),
      Seller = require('../models/Seller.js');

exports.getItems = (req, res) => {
    Item.find({}).populate('seller').exec(function (err, items){
        if(!err){
            res.json({records : items});
        }
        else{
            res.send("Error loading items");
            console.error(err.message);
        }
    });
};

exports.getItem = (req,res) => {
    Item.findById(req.params.id).populate('seller').exec(function (err, item){
        if(!err){
            res.json({records : item, customer: req.session.customer});
        }
        else{
            res.send("Error loading the item");
            console.error(err.message);
        }
    });
};

exports.addItem = (req, res) => {
    if (req.session){
        let sellerID = mongoose.Types.ObjectId(req.session.userID); 
        req.body.seller = sellerID;
        const NewItem = new Item(req.body);
        const iid = NewItem._id;
        NewItem.save()
        .then(()=>{
            Seller.findOne({_id:sellerID}, (err, record)=>{
                if(record){
                    record.items.push(iid);
                    record.save(err=>{
                        if(err){
                        console.log("Unable to attach the item to the seller");
                        }
                        else
                        res.json(NewItem);
                    });
                }
                else{
                    console.log("Sorry, couldn't find the seller!");
                    res.send("Ooops!");
                }
            });
        })
        .catch(()=>{res.send("Unable to add item");});
     }
    else {
        console.log("Session expired, please login");
    }
};

exports.deleteItem = (req, res) => {
    let itemId;
    try {
        itemId = req.params.id;
    } catch (error) {
        res.status(422).json({ message: `Invalid item ID; format: ${error}` });
        return;
    }

    Item.findById(itemId, function (err,record){
        if (err) {
            console.log("Unable to find item "+err);
        }
        else if (!record) {
            console.log("Unable to fetch item ");
        }
        else{
            const sid = record.seller;
            console.log("Seller: "+sid);
            Item.deleteOne({_id: record._id}).then(()=>{
                Seller.findOne({_id: sid},(err, record) =>{
                    if(record){
                        record.items.pull(itemId);
                        record.save(err=>{
                            if(err){
                            console.log("Unable to remove item from seller");
                            }
                            else
                            console.log("Item popped!");
                            res.json({status: 'OK'});
                        });
                    }
                    else{
                        console.log("Sorry, couldn't find the seller!");
                        res.send("Ooops!");
                    }
                });
            });
        }
    });
}; 