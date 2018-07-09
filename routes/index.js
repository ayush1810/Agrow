const express = require('express'),
     mongoose = require('mongoose');
const router = express.Router();
mongoose.set('debug', true);

const bidController = require('../controllers/bidController.js');
const categoryController = require('../controllers/categoryController.js');
const customerController = require('../controllers/customerController.js');
const itemController = require('../controllers/itemController.js');
const productController = require('../controllers/productController.js');
const sellerController = require('../controllers/sellerController.js');

router.get('/',(req, res)=>{
    res.render('index.html');
});

router.get('/api/items', itemController.getItems);
router.get('/api/items/:id',itemController.getItem);
router.post('/addItem', itemController.addItem);
router.delete('/deleteItem/:id',itemController.deleteItem);

router.get('/api/bids/:id',bidController.getItemBids);
router.post('/addbid', bidController.addBid);
router.get('/pastbids/:item', bidController.checkBid);

router.get('/api/categories', categoryController.getCategories);
router.post('/addCategory', categoryController.addCategory);
router.delete('/deleteCategory/:id',categoryController.deleteCategory);       

router.get('/api/products', productController.getProducts);
router.post('/addProduct',productController.addProduct);
router.delete('/deleteProduct/:id', productController.deleteProduct);

router.get('/api/sellers', sellerController.getSellers);
router.get('/profile', sellerController.getDashboard);
router.get('/api/seller/items', sellerController.getItems);
router.post('/addseller', sellerController.addSeller);
router.post('/api/sellers/login', sellerController.handleLogin);
router.post('/api/seller/:id', sellerController.modifyWallet);

router.get('/api/customers', customerController.getCustomers);
router.get('/api/customers/:id', customerController.getCustomer);
router.post('/addcustomer', customerController.addCustomer);
router.post('/api/customers/login', customerController.handleLogin);
router.post('/customer/wallet', customerController.modifyWallet);

router.get('/logout', function(req, res, next) {
    if (req.session) {
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