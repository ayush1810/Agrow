const mongoose = require('mongoose');
mongoose.set('debug',true);
const bcrypt = require('bcrypt');
const Item = require('./Item.js');

const SellerSchema = new mongoose.Schema({
    name:{
      type: String,
      trim: true,
      required: `Enter a valid Seller name`
    },
    profile:{
      type: String,
      default: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&h=171&w=200'
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
    }],
    wallet: {
      type: Number,
      default: 0.00 
    }
});

SellerSchema.statics.authenticate = function (email, password, callback) {
    Seller.findOne({ email: email })
      .exec(function (error, user) {
        if (error) {
          return callback(error);
        } else if (!user) {
          var err = new Error('User not found.');
          err.status = 401;
          return callback(err);
        }
        bcrypt.compare(password, user.password).then(function (result){
          if (result == true) {
            return callback(null, user);
          } else {
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