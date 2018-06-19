const mongoose = require('mongoose');
mongoose.set('debug',true);
const bcrypt = require('bcrypt');
const Item = require('./Item.js');

const SellerSchema = new mongoose.Schema({
    role:{
      type: String,
      default: 'seller'
    },
    name:{
      type: String,
      trim: true,
      required: `Enter a valid Seller name`
    },
    email: {
      type: String,
      required: 'Enter an email address',
    },
    password: {
      type: String,
      required: true
    },
    state: {
      type : String,
    },
    city: String,   
    items: [{
      type: mongoose.Schema.Types.ObjectId,
      ref : 'Item'
    }]
});

SellerSchema.statics.authenticate = function (email, password, callback) {
    Seller.findOne({ email: email })
      .exec(function (error, user) {
        if (error) {
          console.log("Line 39"+error);
          return callback(error);
        } else if (!user) {
          console.log("Line 42 "+error);
          var err = new Error('User not found.');
          err.status = 401;
          return callback(err);
        }
        bcrypt.compare(password, user.password).then(function (result){
          console.log("e "+password+" r "+user.password);
          if (result == true) {
            console.log("Passwords match");
            return callback(null, user);
          } else {
            console.log("Passwords do NOT match");
            return callback();
          }
        });
      });
};

SellerSchema.pre('save', function (next) {
  var user = this;
  if (!user.isModified('password')) return next();
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

var Seller = mongoose.model('Seller',SellerSchema);
module.exports = Seller;