const rp = require('request-promise-native')
const { getURIBase } = require('./couch')

function createUser (username, password) {
  const uri = `${getURIBase()}/_users/org.couchdb.user:${username}`
  console.log({ uri })
  return rp({
    uri,
    method: 'PUT',
    body: {
      name: username,
      password,
      roles: [],
      type: 'user'
    },
    json: true
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
    },
    json: true
  })
}

module.exports = {
  createUser,
  giveAccessToUser
}
