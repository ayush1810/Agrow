const express = require('express'),
    //   passport = require('passport'),
    //   LocalStrategy = require('passport-local').Strategy;
     mongoose = require('mongoose');
const router = express.Router();
mongoose.set('debug', true);

const Customer = require('../models/Customer.js');
const Item = require('../models/Item.js');
const Seller = require('../models/Seller.js');
const Category = require('../models/Category.js');
const Product = require('../models/Product');

router.get('/',(req, res)=>{
    res.render('index.html');
});

router.get('/api/items',(req, res) => {
    Item.find({}).populate('seller').exec(function (err, items){
        if(!err){
            res.json({records : items});
        }
        else{
            res.send("Error loading sellers");
            console.error(err.message);
        }
    });
});

router.get('/api/categories',(req, res) => {
    Category.find({}, function(err, items){
        if(!err){
            res.json({records : items});
        }
        else{
            res.send("Error loading sellers");
            console.error(err.message);
        }
    });
});

router.post('/addCategory', (req, res) =>{
    const NewCategory = new Category(req.body);
    Category.create(NewCategory, (err, cat)=> {
        if (err){
            res.send("Sorry that didn't work");
            console.log("Error" + err.message);
        }
        else{
            res.json(cat);
        }
    });
});

router.delete('/deleteCategory/:id',(req, res)=>{
    let categoryId;
    try {
        categoryId = req.params.id;
    } catch (error) {
        res.status(422).json({ message: `Invalid category ID; format: ${error}` });
        return;
    }

    Category.findById(categoryId, function (err,record){
        if (err) {
            console.log("Unable to find in database"+err);
        }
        else if (!record) {
            console.log("Unable to get category");
        }
        else{
            Category.deleteOne({_id: categoryId}).then(()=>{
                console.log("Category removed");
                res.json({status: 'OK'});
            });
        }
    }); 
});       

router.get('/api/products',(req, res) => {
    Product.find({}).populate('category').exec(function(err, items){
        if(!err){
            res.json({records : items});
        }
        else{
            res.send("Error loading products");
            console.error(err.message);
        }
    });
});

router.post('/addProduct', (req, res) =>{
    const NewProduct = new Product(req.body);
    Product.create(NewProduct, (err, product)=> {
        if (err){
            res.send("Sorry that didn't work");
            console.log("Error" + err.message);
        }
        else{
            res.json(product);
        }
    });
});

router.delete('/deleteProduct/:id',(req, res)=>{
    let ProductId;
    try {
        ProductId = req.params.id;
    } catch (error) {
        res.status(422).json({ message: `Invalid product ID; format: ${error}` });
        return;
    }

    Product.findById(ProductId, function (err,record){
        if (err) {
            console.log("Unable to find in database"+err);
        }
        else if (!record) {
            console.log("Unable to get product");
        }
        else{
            Product.deleteOne({_id: ProductId}).then(()=>{
                console.log("Product removed");
                res.json({status: 'OK'});
            });
        }
    }); 
});

router.get('/api/seller/items',(req, res)=>{
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
});

router.get('/api/sellers',(req, res) => {
    Seller.find({},(err, items)=>{
        if(!err){
            res.json({records : items});
        }
        else{
            res.send("Error loading sellers");
            console.error(err.message);
        }
    });
});

router.post('/api/seller/:id', (req, res)=>{
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
});

router.post('/customer/wallet',(req,res) =>{
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
});
router.post('/addItem',(req, res)=>{
    if (req.session){
        req.body.seller = req.session.userID;  
        const NewItem = new Item(req.body);
        const iid = NewItem._id;
        const sellerId = req.session.userID;
        NewItem.save()
        .then(()=>{
            Seller.findOne({_id:sellerId}, (err, record)=>{
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
        console.log("Session expried, please login");
    }
} );

router.delete('/deleteItem/:id',(req, res)=>{
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
                console.log("Item deleted, off to seller");
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
});

router.get('/api/customers', (req, res)=>{
    Customer.find({},(err, customers)=>{
        if(!err){
            res.json({records : customers});
        }
        else{
            res.send("Error loading customers");
            console.error(err.message);
        }
    });
});

router.post('/addseller',(req, res)=>{
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
} );

router.post('/api/sellers/login', function(req, res, next) {
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
});

router.post('/addcustomer',(req, res)=>{
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
} );

router.post('/api/customers/login', function(req, res, next) {
    if (req.body.email && req.body.password) {  
    Customer.authenticate(req.body.email, req.body.password,function (error, user) {
        if (error || !user) {
            console.log("Customer Login Error: "+error);
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
        }  else {
        req.session.customerID = user._id; 
        res.json(user);
        }
    });
    } else {
    var err = new Error('Email and password are required.');
    err.status = 401;
    return next(err);
    }
});

router.get('/profile', function (req, res, next){
    Seller.findById(req.session.userID).exec((err, user)=>{
        if(err){
            console.log("Cound find user"); 
            return next(err);
        }
        else{
            res.json(user);
        }
    });
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