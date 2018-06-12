const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SellerSchema = new mongoose.Schema({
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
    location: String,   
});

SellerSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
});

module.exports = mongoose.model('Seller',SellerSchema);