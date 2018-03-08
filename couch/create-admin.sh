#!/bin/sh

echo "Creating $HOST/database"
curl -X PUT $HOST/database
echo "Creating admin"
curl -X PUT $HOST/_node/nonode@nohost/_config/admins/$COUCH_ADMIN -d '"'${COUCH_ADMIN_PASSWORD}'"'
