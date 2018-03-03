const express = require('express')

const app = express()

const router = express.Router()

router.use('/login', (req, res) => {
  res.json({ ok: true })
})

// notes for setting up actual endpoints here

/**
 * http://docs.couchdb.org/en/latest/intro/security.html
 * curl -X PUT http://localhost:5984/_users/org.couchdb.user:jan \
     -H "Accept: application/json" \
     -H "Content-Type: application/json" \
     -d '{"name": "jan", "password": "apple", "roles": [], "type": "user"}'
 */

app.use('*', require('body-parser').json())
app.use('/', router)
app.listen(8200, () => {
  console.log('Started express server')
})
