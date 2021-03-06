var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var config = require('./config');
var authenticate = require('./authenticate');

// connect to mongoose db
var mongoose = require('mongoose');
    
mongoose.connect(config.mongoUrl);
var db = mongoose.connection;

db.once('open', function () {
    console.log('Successfully connected to server!\n');
});

// importing all the routers
var userRouter = require('./routes/users.js');
var dishRouter = require('./routes/dishRouter.js');
var leaderRouter = require('./routes/leaderRouter.js');
var promoRouter = require('./routes/promoRouter.js');
var favoriteRouter = require('./routes/favoriteRouter.js');

var app = express();

// Secure traffic only
app.all('*', function (req, res, next) {
    if (req.secure) {
        return next();
    }
    res.redirect('https://' + req.hostname + ':' + app.get('secPort') + req.url);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(passport.initialize());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', userRouter);
app.use('/dishes', dishRouter);
app.use('/leaders', leaderRouter);
app.use('/promotions', promoRouter);
app.use('/favorites', favoriteRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});


module.exports = app;
