const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const CategorySchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: `Enter a valid category name`
    },
    products: [{
        type: String,
    }]
});
module.exports = mongoose.model('Category',CategorySchema);