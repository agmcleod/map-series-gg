const express = require('express')
const config = require('config')
const rp = require('request-promise-native')

const app = express()

const router = express.Router()

const {
  couch_db: couchDb
} = config

router.post('/login', (req, res) => {
  const { username, password } = req.body
  const uri = `http://${couchDb.username}:${couchDb.password}@${v.host}:${couchDb.port}/${username}`
  rp(uri).then((response) => {
    res.json(response.body)
  }).catch((err) => {
    if (err.status === 404) {
      rp({ uri, method: 'PUT' }).then(() => {

      })
    } else {
      res.status(500).json({
        error: err.message
      })
    }
  })
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
