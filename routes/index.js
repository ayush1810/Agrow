const express = require('express');
const check = require('express-validator/check').check;
const validationResult = require('express-validator/check').validationResult;
const mongoose = require('mongoose');
const router = express.Router();

const addItem = require('../controllers/ItemController');
const Item = mongoose.model('Item');

router.get('/',(req, res)=>{
    res.render('index');
});

router.post('/addItem',[
    check('name')
    .isLength({min:1})
    .withMessage('Enter a commodity'),
    check('quantity')
    .isLength({min:2}),
    check('rate')
    .isLength({min:1})
],
(req, res)=>{
    const errors = validationResult(req);
    if (errors.isEmpty()){
        console.log("No error wow");
        const NewItem = new Item(req.body);
        NewItem.save()
        .then(()=>{res.send("The item has been added");})
        .catch(()=>{res.send("Sorry, something went wrong");});
    }
    else{
    console.log("OOPSSS");
    res.render('index');
    }
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