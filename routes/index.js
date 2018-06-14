const express = require('express'),
      passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const router = express.Router();
mongoose.set('debug', true);

var sess ;
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
    Seller.create(NewSeller, (err, usr)=> {
        if (err){
            res.send("Sorry that didn't work");
            console.log("Erroro " + err.message);
        }
        else{
            res.json(NewSeller);
        }
    });
} );

// router.get('/profile', function (req, res, next) {
//     Seller.findById(sess.userId)
//       .exec(function (error, user) {
//         if (error) {
//           return next(error);
//         } else {
//           if (user === null) {
//             var err = new Error('Not authorized! Go back!');
//             err.status = 400;
//             return next(err);
//           } else {
//             return res.send('<h1>Name: </h1>' + user.name + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>');
//           }
//         }
//       });
// });

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