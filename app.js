/*jshint esversion:6*/
const path = require('path'),
      express = require('express'),
      session = require('express-session'),
      mongoose = require('mongoose'),
      passport = require('passport'),
      bodyParser = require('body-parser');
const routes = require('./routes/index');

const app = express();
require('dotenv').config({path: 'variable.env'});

app.set('port', process.env.PORT || 8888);
let db;
mongoose.connect(process.env.DATABASE).then(connection => {
      mongoose.Promise = global.Promise;
      db = connection;
      console.log("Connection established");
      }).catch(error => {
      console.log('Mongoose ERROR:', error);
    });

app.use(session({
      secret: 'work hard',
      resave: true,
      saveUninitialized: true,
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(passport.initialize());
// app.use(passport.session());
app.use('/', routes);

const server = app.listen(app.get('port'),()=>{
      console.log(`Express running -> PORT ${server.address().port}`);
});
module.exports = app;
