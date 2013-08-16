h1.best-bottle

A little soft to share with some friends all our best bottles of beers and wines (and more maybe :)

h2.Installation of ElasticSearch

* Download Elastic search on the official website (v0.90.x)
* Unzip
* Install plugins
  - Plugin HEAD to manage date : 
    bin/plugin --install mobz/elasticsearch-head
  - Plugin INQUISIOR polyfractal/elasticsearch-inquisitor to manage indexation : 
    bin/plugin --install polyfractal/elasticsearch-inquisitor
  - Plugin JETTY to manage rights (check configuration to enable it) : 
    bin/plugin --install sonian/elasticsearch-jetty

* Send those request to prepare schema

h2.Run application

TODO