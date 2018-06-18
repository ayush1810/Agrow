const express = require('express'),
      passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const router = express.Router();
mongoose.set('debug', true);

const Customer = require('../models/Customer.js');
const Item = require('../models/Item');
const Seller = require('../models/Seller');

router.get('/',(req, res)=>{
    res.render('index');
});

router.post('/api/items',(req, res)=>{
    const uid = req.body.userid;
    Item.find({seller: uid}, function(err, items) {
             if(!err){
                 res.json({records: items});
             }
             else{
                 res.send("Error loading data!");
                 console.error(err.message);
             }
         });
});

router.get('/api/sellers',(req, res) => {
    Seller.find({},(err, items)=>{
        if(!err){
            res.json({sellers : items});
        }
        else{
            res.send("Error loading sellers");
            console.error(err.message);
        }
    });
});

router.post('/addItem',(req, res)=>{
    const NewItem = new Item(req.body);
    const iid = NewItem._id;
    const sid = req.body.seller; 
    NewItem.save()
    .then(()=>{
        Seller.findOne({_id:sid}, (err, record)=>{
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
} );

router.post('/adduser',(req, res)=>{
    const NewSeller = new Seller(req.body); 
    Seller.create(NewSeller, (err, usr)=> {
        if (err){
            res.send("Sorry that didn't work");
            console.log("Error" + err.message);
        }
        else{
            res.json(NewSeller);
        }
    });
} );

router.post('/addcustomer',(req, res)=>{
    const NewCustomer = new Customer(req.body); 
    Customer.create(NewCustomer, (err, usr)=> {
        if (err){
            res.send("Sorry that didn't work");
            console.log("Error " + err.message);
        }
        else{
            res.json(NewCustomer);
        }
    });
} );

router.post('/login', function(req, res, next) {
    if (req.body.email && req.body.password) {  
    Seller.authenticate(req.body.email, req.body.password, function (error, user) {
        if (error || !user) {
            console.log(error);
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
        }  else {
        res.json(user);
        }
    });
    } else {
    var err = new Error('Email and password are required.');
    err.status = 401;
    return next(err);
    }
});

router.get('/logout', function(req, res, next) {
    if (req.session) {
      // delete session object
      req.session.destroy(function(err) {
        if(err) {
          return next(err);
        } else {
          return res.redirect('/');
        }
      });
    }
});
module.exports = router;