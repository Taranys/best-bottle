best-bottle
===========

A little soft to share with some friends all our best bottles of beers and wines (and more maybe :)

Installation of ElasticSearch
-----------------------------

* Download Elastic search on the official website (v0.90.x)
* Unzip
* Install plugins
  - Plugin HEAD to manage date : 
    bin/plugin --install mobz/elasticsearch-head
  - Plugin INQUISIOR polyfractal/elasticsearch-inquisitor to manage indexation : 
    bin/plugin --install polyfractal/elasticsearch-inquisitor
  - Plugin JETTY to manage rights (check configuration to enable it) : 
    bin/plugin --install sonian/elasticsearch-jetty

* Send those request to prepare schema :
Beer
```
POST http://localhost:9200/bb/beer/_mapping
{
    "beer": {
        "properties": {
            "name": {
                "type": "string"
            },
            "country": {
                "type": "string",
                "index": "not_analyzed"
            },
            "description": {
                "type": "string"
            },
            "picture": {
                "type" : "binary",
                "index": "not_analyzed"
            }
        }
    }
}
```

Comment
```
POST http://localhost:9200/bb/comment/_mapping
{
    "comment": {
        "properties": {
            "rating": {
                "type": "integer"
            },
            "description": {
                "type": "string"
            },
            "place": {
                "type": "string"
            },
            "drink": {
                "properties": {
                    "cost": {
                        "type": "float"
                    },
                    "container": {
                        "type": "string",
                        "index": "not_analyzed"
                    }
                }
            },
            "link": {
                "type": "string",
                "index": "not_analyzed"
            }
        }
    }
}
```

Run application
---------------

* Run Elastic-search
* Configure web server :
  - Create a new site and bind it on the web directory
  - Configure a proxy to map elastic search on /api

Example with NGinx configuration file :
```
worker_processes  1;

error_log  logs/error.log;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    sendfile        on;

    server {
        listen       80;
        server_name  localhost;

		location / {
		    index  index.html index.htm;
            root   C:/Perso/dev/best-bottle/web;
		}

		location /api {
            proxy_pass http://localhost:9200;
			rewrite /api/(.*) /$1  break;
			proxy_redirect off;

			proxy_set_header  X-Real-IP  $remote_addr;
			proxy_set_header  X-Forwarded-For $proxy_add_x_forwarded_for;
			proxy_set_header  Host $http_host;
		}

    }
}
```