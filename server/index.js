var express = require('express');
var app = express();
var path = require('path');

var logger = require('morgan');

app.use(express.static(path.join(__dirname, "..", "public")));
app.use(logger('dev'));
app.use('/', require('./routes/series'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    if (req.headersSent) {
      next(err);
    }
    res.status(err.status || 500).json({
      message: err.message,
      error: err
    });
  });
}

var port = 8200;
app.listen(port, function () {
  console.log('Server listening on ' + port);
});
