# Map Series GG

This is a small tool I made for myself for keeping track of map vetoes in starcraft 2 tournaments. I wanted something more convenient than opening up notepad.

Furthermore it's been my testbed for trying out offline storage & sync capabilities.

## Docker in progress

I'm currently working on a couchdb setup with docker as the backend data for the pouchdb data.

```
# Start up the container
docker-compose up -d
# Run the setup script
docker-compose exec couch bash './create-admin.sh'
# Install the node dependencies. The server will be running, so you'll need to restart that too.
docker-compose exec server sh -c "yarn"
docker-compose restart server
```

When needing to rebuild due to Dockerfile changes:

```
docker-compose build
```

Add dependencies via:

```
docker-compose exec server sh -c "yarn add knex"
```

After building or adding dependencies, re-copy the yarn.lock:

```
docker run mapseriesgg_server cat /app/yarn.lock > server/yarn.lock
```

### Need to:

* Figure out couchdb database creation and user assignment
* How to do this for user sign ups (also setup user sign ups)
* Connect couchdb for a given user to pouch
