/* global emit */
import PouchDB from 'pouchdb-browser'

const db = new PouchDB('map-series-gg')
export const indexName = 'index'

const ddoc = {
  _id: `_design/${indexName}`,
  views: {
    by_resource: {
      map: function mapFunction (doc) {
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
