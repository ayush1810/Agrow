const mongoose = require('mongoose'); 
const Seller = require('../models/Seller.js'),
    Item = require('../models/Item.js');

exports.getSellers = (req, res) => {
    Seller.find({},(err, items)=>{
        if(!err){
            res.json({records : items});
        }
        else{
            res.send("Error loading sellers");
            console.error(err.message);
        }
    });
}; 

exports.getItems = (req, res)=>{
    if (req.session)
    {
        const sellerID = req.session.userID; 
        if (!sellerID){
            console.log("User not found!");
            res.send().status(400);
        }
        else{
            Item.find({seller: sellerID}, function(err, items) {
                if(!err){
                    res.json({records: items});
                }
                else{
                    res.send("Error loading data!");
                    console.error(err.message);
                }
            });   
        }
    }
    else{
        console.log("You need to log in");
        res.json({status: 'NOPE'});
    }
};

exports.addSeller = (req, res)=>{
    const NewSeller = new Seller(req.body); 
    Seller.create(NewSeller, (err, usr)=> {
        if (err){
            console.log("Error" + err.message);
            res.send("Sorry that didn't work");
        }
        else{
            req.session.userID = usr._id;
            res.json({status: 'OK'});
        }
    });
};

exports.handleLogin = (req, res, next) => {
    if (req.body.email && req.body.password) {  
    Seller.authenticate(req.body.email, req.body.password,function (error, user) {
        if (error || !user) {
            console.log("Seller Login Error: "+error);
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
        }  else {
        req.session.userID = user._id; 
        res.json({status: 'OK'});
        }
    });
    } else {
    var err = new Error('Email and password are required.');
    err.status = 401;
    return next(err);
    }
};

exports.getDashboard = (req, res, next)=>{
    Seller.findById(req.session.userID).exec((err, user)=>{
        if(err){
            console.log("Cound find user"); 
            return next(err);
        }
        else{
            res.json(user);
        }
    });
}; 

exports.modifyWallet = (req, res)=>{
    let sellerId;
    let balance = req.body.wallet;
    try {
        sellerId = req.params.id;
    } catch (error) {
        res.status(422).json({ message: `Invalid Seller ID; format: ${error}` });
        return;
    }

    Seller.findByIdAndUpdate(sellerId,{wallet: balance }, function (err,record){
        if (err) {
            console.log("Unable to update wallet "+err);
        }
        else{
            res.json({status : 'Ok'});
        }
    });
};