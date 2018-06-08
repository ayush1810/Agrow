/*jshint esversion: 6 */
const mongoose = require('mongoose'),
      path = require('path');  
const app = require('./app');
require('dotenv').config({path: 'variable.env'});

const Item = require('./models/Item');
const Seller = require('./models/Seller');

mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;
mongoose.connection
    .on('connected', ()=> console.log("Mongoose CONNECTED!"))
    .on('error',(err)=>{
    console.error(`${err.message}`);
    });

const server = app.listen(app.get('port'),()=>{
    console.log(`Express running -> PORT ${server.address().port}`);
});


    // db.createCollection("customers", function(err, res) {
    //     if (err) throw err;
    //     console.log("Collection created!");
    //     db.close();
    //   });
    // let newItem = new Item({name : 'SJSIDJS', quantity: 440, rate: 4});
    // newItem.save((err)=>{
    //     if (err) console.error("Unable to add Item");
    //     else console.log("Item added");
    // });
    //let newSeller = new Seller({name: "veer", location: "Mumbai", rating:100});
    //db.collection("sellers").insertOne(newSeller, function(err, res) {
    //if (err) throw err;
    //console.log("1 document inserted");
    //db.close();
    //});