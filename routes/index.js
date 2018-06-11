const express = require('express');
const check = require('express-validator/check').check;
const validationResult = require('express-validator/check').validationResult;
const mongoose = require('mongoose');
const router = express.Router();

const Item = require('../models/Item');
const Seller = require('../models/Seller');
router.get('/',(req, res)=>{
    res.render('index');
});

router.get('/api/items',(req, res)=>{
    Item.find({}, function(err, items) {
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
    NewItem.save()
    .then(()=>{res.json(NewItem);})
    .catch(()=>{res.send("Unable to add item");});
} );

router.post('/adduser',(req, res)=>{
    const NewSeller = new Seller(req.body); 
    NewSeller.save()
    .then(()=>{res.json(NewSeller);})
    .catch(()=>{console.log("Unable to add seller");});
} );

module.exports = router;