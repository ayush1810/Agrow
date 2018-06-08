/*jshint esversion: 6 */
const express = require('express');
const check = require('express-validator/check').check;
const validationResult = require('express-validator/check').validationResult;
const mongoose = require('mongoose');
const router = express.Router();

const addItem = require('../controllers/ItemController');
const Item = mongoose.model('Item');

router.get('/',(req, res)=>{
    res.render('index');
    // Item.find({}, function(err, items) {
    //     if(!err){
    //     res.render('index',{
    //         title: 'HomePage',
    //         items
    //     });
    //     }
    //     else{
    //     res.send("fucku");
    //     console.error(err.message);
    //     }
    // });
});
// process.on('unhandledRejection', up => { throw up; });
// router.get('/add', function(req, res, next) {
//    res.render('addItem',{
//        title :  "Add Item"
//    });
// });

// router.post('/add',[
//     check('name')
//     .isLength({min:1})
//     .withMessage('Enter a commodity'),
//     check('quantity')
//     .isLength({min:2}),
//     check('rate')
//     .isLength({min:1})
// ],
// (req, res)=>{
//     const errors = validationResult(req);
//     if (errors.isEmpty()){
//         const NewItem = new Item(req.body);
//         NewItem.save()
//         .then(()=>{res.send("The item has been added");})
//         .catch(()=>{res.send("Sorry, something went wrong");});
//     }
//     else{
//     res.render('addItem',{
//         title: "Add an Item",
//         errors : errors.array(),
//         data: req.body,
//     });
//     }
// } );
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
    // res.json({ _metadata: metadata, records: Item});
});
module.exports = router;