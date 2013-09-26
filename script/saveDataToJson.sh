#!/bin/bash

HOST="http://localhost:9200/bb"
USER_PASS="-u user:pass"

echo "Save wine into wine_save.json"
curl $USER_PASS -XGET $HOST'/wine/_search' > wine_save.json
echo ""

echo "Save beer into beer_save.json"
curl $USER_PASS -XGET $HOST'/beer/_search' > beer_save.json
echo ""
