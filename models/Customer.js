const mongoose = require('mongoose');
mongoose.set('debug',true);
const bcrypt = require('bcrypt');
const Item = require('./Item.js');

const CustomerSchema = new mongoose.Schema({
    role:{
        type: String,
        default: 'customer'    
    },
    name:{
        type: String,
        trim: true,
        required: `Please enter a name`
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
    bids: [{
      type: mongoose.Schema.Types.ObjectId,
      ref : 'Item'
    }]
});

CustomerSchema.statics.authenticate = function (email, password, callback) {
    Customer.findOne({ email: email })
      .exec(function (error, user) {
        if (error) {
          return callback(error);
        } else if (!user) {
          var err = new Error('User not found.');
          err.status = 401;
          return callback(err);
        }
        bcrypt.compare(password, user.password, function (err, result) {
          if (result === true) {
            return callback(null, user);
          } else {
            return callback();
          }
        });
      });
};

CustomerSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
});

var Customer = mongoose.model('Customer',CustomerSchema);
module.exports = Customer;