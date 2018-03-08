#!/bin/sh

echo "Creating $HOST/database"
curl -X PUT $HOST/database
curl -X PUT $HOST/_users
curl -X PUT $HOST/_replicator
curl -X PUT $HOST/_global_changes
echo "Creating admin"
curl -X PUT $HOST/_node/nonode@nohost/_config/admins/$COUCH_ADMIN -d '"'${COUCH_ADMIN_PASSWORD}'"'
