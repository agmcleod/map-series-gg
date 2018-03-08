const express = require('express')
const logger = require('logger')
const rp = require('request-promise-native')
const { getURIBase } = require('./config')
const { createUser, giveAccessToUser } = require('./users')

const app = express()

const router = express.Router()

router.post('/register', (req, res) => {
  const { username, password } = req.body
  const uri = `${getURIBase()}/${username}`
  rp(uri).then(() => {
    logger.info(`Username already taken: ${username}`)
    res.status(400).json({
      message: 'Username already taken'
    })
  }).catch((err) => {
    if (err.status === 404) {
      rp({ uri, method: 'PUT' }).then(() => {
        return createUser(username, password)
      }).then(() => {
        return giveAccessToUser(username)
      }).catch((err) => {
        logger.error(`Failed to create database for user: ${username}`)
        res.status(500).json({
          error: err.message
        })
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
