/*jshint esversion:6*/

// exports.homePage = (req,res) => {
//     console.log(req.name);
//     res.render('base');
// };
const Item = require('../models/Item');

const addItem = (req, res) => {
    let newItem = new Item(req.body);
    newItem.save((err,item)=>{
        if (err){
            res.send(err);
        }
        res.json(item);
    });
};
module.exports = addItem;