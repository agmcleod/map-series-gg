const rp = require('request-promise-native')
const { getURIBase } = require('./config')

function createUser (username, password) {
  const uri = `${getURIBase()}/_users/org.couchdb.user:${username}`
  return rp({
    uri,
    method: 'PUT',
    body: {
      name: username,
      password,
      roles: [],
      type: 'user'
    }
  })
}

function giveAccessToUser (username) {
  const uri = `${getURIBase()}/${username}/_security`
  return rp({
    uri,
    method: 'PUT',
    body: {
      admins: {
        names: [],
        roles: []
      },
      members: {
        names: [username],
        roles: []
      }
    }
  })
}

module.exports = {
  createUser,
  giveAccessToUser
}
