const express = require('express')

const app = express()

const router = express.Router()

router.use('/login', (req, res) => {
  res.json({ ok: true })
})

app.use('*', require('body-parser').json())
app.use('/', router)
app.listen(8200, () => {
  console.log('Started express server')
})
