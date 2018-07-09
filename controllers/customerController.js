const mongoose = require('mongoose');
const Bid = require('../models/Bid.js'),
    Item = require('../models/Item.js'),
    Customer = require('../models/Customer.js');

exports.getCustomers = (req, res) => {
    Customer.find({},(err, customers)=>{
        if(!err){
            res.json({records : customers});
        }
        else{
            res.send("Error loading customers");
            console.error(err.message);
        }
    });
};

exports.getCustomer = (req, res)=>{
    let customerID; 
    try{
        customerID = req.params.id;
    }
    catch (error) {
        res.status(422).json({ message: `Invalid Customer ID; format: ${error}` });
        return;
    }

    Customer.find({},(err, customers)=>{
        if(!err){
            res.json({records : customers});
        }
        else{
            res.send("Error loading customers");
            console.error(err.message);
        }
    });
}; 

exports.addCustomer = (req, res)=>{
    const NewCustomer = new Customer(req.body); 
    Customer.create(NewCustomer, (err, usr)=> {
        if (err){
            console.log("Error " + err.message);
            res.send("Sorry that didn't work");
        }
        else{
            req.session.customerID = usr._id;
            res.json({status: 'OK'});
        }
    });
};

exports.handleLogin = (req, res, next) => {
    if (req.body.email && req.body.password) {  
    Customer.authenticate(req.body.email, req.body.password,function (error, user) {
        if (error || !user) {
            console.log("Customer Login Error: "+error);
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
        }  else {
        req.session.customer = user; 
        req.session.customerID = user._id; 
        res.json(user);
        }
    });
    } else {
    var err = new Error('Email and password are required.');
    err.status = 401;
    return next(err);
    }
};

exports.modifyWallet = (req,res) =>{
    let customerID = req.body.customer; 
    let newBalance = req.body.amount; 
    if (!customerID || !newBalance){
        console.log("Please try again");
        res.status(422).json({msg :"Unable to get Seller ID or balance" });
    }
    else{
        Customer.findByIdAndUpdate(customerID,{wallet: newBalance},{new:true}, function(err, record){
            if (err){   
                console.log("Unable to update wallet "+err);
                res.json({status: 0});
            }
            else{
                res.json(record);
            }
        });
    }
}; 