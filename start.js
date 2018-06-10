const mongoose = require('mongoose'),
      path = require('path');  
const app = require('./app');
require('dotenv').config({path: 'variable.env'});

let db;
mongoose.connect(process.env.DATABASE).then(connection => {
  mongoose.Promise = global.Promise;
  console.log("Connection established");
  db = connection;
  }).catch(error => {
  console.log('ERROR:', error);
});

const server = app.listen(app.get('port'),()=>{
    console.log(`Express running -> PORT ${server.address().port}`);
});