const config = require('config')

const { couch_db: couchDb } = config

function getURIBase () {
  return `http://${couchDb.username}:${couchDb.password}@${couchDb.host}:${couchDb.port}`
}

module.exports = {
  getURIBase
}
