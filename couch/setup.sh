#!/bin/sh

echo "Requesting: $HOST/_config/admins/$COUCH_ADMIN -d '$COUCH_ADMIN_PASSWORD'"
curl -X PUT $HOST/_config/admins/$COUCH_ADMIN -d '$COUCH_ADMIN_PASSWORD'

exit 0
