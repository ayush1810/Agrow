const mongoose = require('mongoose');
const Category = require('../models/Category.js');

exports.getCategories = (req, res) => {
    Category.find({}, function(err, items){
        if(!err){
            res.json({records : items});
        }
        else{
            res.send("Error loading sellers");
            console.error(err.message);
        }
    });
};

exports.addCategory = (req, res) =>{
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
};

exports.deleteCategory = (req, res)=>{
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
};