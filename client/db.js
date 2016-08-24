import PouchDB from 'pouchdb-browser';

const db = new PouchDB('map-series-gg');

export const index_name = 'index';

const ddoc = {
  _id: `_design/${index_name}`,
  views: {
    by_resource: {
      map: (function mapFunction (doc) {
        emit(doc.resource);
      }).toString()
    }
  }
};
// save it
db.put(ddoc).catch(function (err) {
  // view doc already created
  if (err.name !== 'conflict') {
    throw err;
  } else {
    console.log('index already found');
  }
}).then(() => console.log('index created'));

export default db;
