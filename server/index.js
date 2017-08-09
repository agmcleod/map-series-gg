const express = require('express')
const app = express()
const path = require('path')

const logger = require('morgan')

app.use(express.static(path.join(__dirname, '..', 'public')))
app.use(logger('dev'))
app.use('/', require('./routes/series'))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    if (req.headersSent) {
      return next(err)
    }
    res.status(err.status || 500).json({
      message: err.message,
      error: err
    })
  })
}

const port = 8200
app.listen(port, function () {
  console.log(`Server listening on ${port}`)
})
