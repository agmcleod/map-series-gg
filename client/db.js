/* global emit, CONFIG */
import PouchDB from 'pouchdb-browser'
import { error } from './reducers/flash'
import { setConnected } from './reducers/pouch'
import { setLoggedIn, logout } from './reducers/login'

const db = new PouchDB('map-series-gg')
export const indexName = 'index'
const { couch_db: couchDb } = CONFIG

// TODO: Need more complicated state management here. A disconnect for example shouldn't de-auth the user, but simply turn off connected state for UI reasons.

export function connectToRemote (dispatch, username, password) {
  console.log(`Connecting to: ${couchDb.protocol}${username}:${password}@${couchDb.url}/${username}`)
  const remoteDb = new PouchDB(`${couchDb.protocol}${username}:${password}@${couchDb.url}/${username}`, { skip_setup: true })
  db.sync(remoteDb, { live: true, retry: true })
    .on('paused', () => {
      console.log('paused')
    })
    .on('denied', (err) => {
      console.error('denied', err)
      error(err.message)(dispatch)
      setConnected(false)(dispatch)
    })
    .on('active', () => {
      setConnected(true)(dispatch)
      setLoggedIn(username, password)
    })
    .on('error', (err) => {
      error(err.message)(dispatch)
      setConnected(false)(dispatch)
      logout()(dispatch)
    })
}

const ddoc = {
  _id: `_design/${indexName}`,
  views: {
    by_resource: {
      map: function (doc) {
        emit(doc.resource)
      }.toString()
    }
  }
}
// save it
db.put(ddoc).catch(function (err) {
  // view doc already created
  if (err.name !== 'conflict') {
    throw err
  }
})

export default db
