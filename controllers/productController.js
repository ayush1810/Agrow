const mongoose = require('mongoose');
const Product = require('../models/Product.js');

exports.getProducts = (req, res) => {
    Product.find({}).populate('category').exec(function(err, items){
        if(!err){
            res.json({records : items});
        }
        else{
            res.send("Error loading products");
            console.error(err.message);
        }
    });
};
exports.addProduct =  (req, res) =>{
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
}; 

exports.deleteProduct = (req, res)=>{
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
}; 