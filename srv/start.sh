#!/bin/sh

java -cp "target/restx/classes:target/dependency/*" -Drestx.app.package=fr\taranys\bestbottle $VM_OPTIONS  fr\taranys\bestbottle.AppServer
