/**
 * APP
 *
 * @author T.Shoji
 * @copyright 2012-2015 Nodecom Group,Ltd. All Rights Reserved.
 */

var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
// var logger       = require('./logger.js');
// var fs           = require('fs');
// var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var routes       = require('./routes');
var app          = express();

// create access log stream
// var als = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public/img', 'Thermite_icon48x48.png')));
// app.use(morgan('dev', {stream: als}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routing
require('./routes/route_bind')(app, routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
