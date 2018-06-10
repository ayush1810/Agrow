const express = require('express');
const check = require('express-validator/check').check;
const validationResult = require('express-validator/check').validationResult;
const mongoose = require('mongoose');
const router = express.Router();
const Item = require('../models/Item');

router.get('/',(req, res)=>{
    res.render('index');
});

router.post('/addItem',(req, res)=>{
        const NewItem = new Item(req.body);
        NewItem.save()
        .then(()=>{res.json(NewItem);})
        .catch(()=>{res.send("Sorry, something went wrong");});
} );

router.get('/api/items',(req, res)=>{
    Item.find({}, function(err, items) {
             if(!err){
             res.json({records: items});
             }
             else{
             res.send("fucku");
             console.error(err.message);
             }
         });
});

module.exports = router;