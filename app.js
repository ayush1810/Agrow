/*jshint esversion:6*/
const path = require('path'),
      express = require('express'),
      bodyParser = require('body-parser');
const routes = require('./routes/index');

const app = express();
require('dotenv').config({path: 'variable.env'});
// app.set('views',path.join(__dirname,'views'));
// app.set('view engine','pug');

app.set('port', process.env.PORT || 8888);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', routes);

module.exports = app;
