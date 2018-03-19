const express = require('express')
const bodyParser = require('body-parser')
const logger = require('./logger')
const rp = require('request-promise-native')
const { getURIBase } = require('./couch')
const cors = require('cors')
const { createUser, giveAccessToUser } = require('./users')

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const router = express.Router()

router.post('/register', (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    console.log(req.body)
    res.status(400).json({
      message: 'Must provide a username & password'
    })
    return
  }
  const uri = `${getURIBase()}/${username}`
  rp(uri).then(() => {
    logger.info(`Username already taken: ${username}`)
    res.status(400).json({
      message: 'Username already taken'
    })
  }).catch((err) => {
    if (err.statusCode === 404) {
      rp({ uri, method: 'PUT' }).then(() => {
        logger.debug(`Creating user document: ${username}`)
        return createUser(username, password)
      }).then(() => {
        logger.debug('Giving them access to the db')
        return giveAccessToUser(username)
      }).then(() => {
        res.status(200).json({ 'ok': true })
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

app.use('/', router)
app.listen(8200, () => {
  console.log('Started express server')
})
