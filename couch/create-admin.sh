#!/bin/sh

echo "Creating $HOST databases"
# curl -X PUT http://$HOST/database
curl -X PUT http://$HOST/_users
curl -X PUT http://$HOST/_replicator
curl -X PUT http://$HOST/_global_changes
echo "Creating admin"
curl -X PUT http://$HOST/_node/nonode@nohost/_config/admins/$COUCH_ADMIN -d '"'${COUCH_ADMIN_PASSWORD}'"'
echo "Locking down users db"
curl -X PUT http://$COUCH_ADMIN:$COUCH_ADMIN_PASSWORD@$HOST/_users/_security -d '{"admins":{"roles":["_admin"]},"members":{"roles":["_admin"]}}'
