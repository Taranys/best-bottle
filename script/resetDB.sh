#!/bin/bash

HOST="http://localhost:9200/bb"
USER_PASS="-u user:pass"

echo "Delete beer mapping"
curl $USER_PASS -XDELETE $HOST'/beer/_mapping'
echo ""

echo "Create beer mapping"
curl $USER_PASS -XPUT $HOST'/beer/_mapping'  -d '
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
            "rating": {
                "type": "float"
            },
            "drink": {
                "properties": {
                    "price": {
                        "type": "float"
                    },
                    "container": {
                        "type": "string",
                        "index": "not_analyzed"
                    }
                }
            },
            "picture": {
                "properties": {
                    "contentType": {
                        "type": "string",
                        "index": "not_analyzed"
                    },
                    "base64": {
                        "type" : "binary",
                        "index": "not_analyzed"
                    }
                }
            },
            "comments": {
                "properties": {
                    "username" : {
                        "type": "string"
                    },
                    "date" : {
                        "type": "date"
                    },
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
                            "price": {
                                "type": "float"
                            },
                            "container": {
                                "type": "string",
                                "index": "not_analyzed"
                            }
                        }
                    }
                }
            }
        }
    }
}
'
echo ""

echo "Delete wine mapping"
curl $USER_PASS -XDELETE $HOST'/wine/_mapping'
echo ""

echo "Create wine mapping"
curl $USER_PASS -XPUT $HOST'/wine/_mapping'  -d '
{
    "wine": {
        "properties": {
            "name": {
                "type": "string"
            },
            "type": {
                            "type": "string",
                            "index": "not_analyzed"
                        },
            "location": {
                "type": "string",
                "index": "not_analyzed"
            },
            "description": {
                "type": "string"
            },
            "vineyard": {
                "type": "string"
            },
            "rating": {
                "type": "float"
            },
            "drink": {
                "properties": {
                    "price": {
                        "type": "float"
                    },
                    "container": {
                        "type": "string",
                        "index": "not_analyzed"
                    }
                }
            },
            "picture": {
                "properties": {
                    "contentType": {
                        "type": "string",
                        "index": "not_analyzed"
                    },
                    "base64": {
                        "type" : "binary",
                        "index": "not_analyzed"
                    }
                }
            },
            "comments": {
                "properties": {
                    "username" : {
                        "type": "string"
                    },
                    "date" : {
                        "type": "date"
                    },
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
                            "price": {
                                "type": "float"
                            },
                            "container": {
                                "type": "string",
                                "index": "not_analyzed"
                            }
                        }
                    }
                }
            }
        }
    }
}
'
echo ""

echo "Create constant values"
curl $USER_PASS -XPOST $HOST'/constant/data_fr'  -d '
{
    "beer": {
        "drink": {
            "container" : ["Pression (Demi)", "Pression (Pinte)", "Pression (Chevalier)", "Bouteille (25cl)", "Bouteille (33cl)"]
        }
    },
    "wine": {
        "type": ["Blanc", "Rose", "Rouge", "Champagne"],
        "drink": {
            "container" : ["Verre (Restaurant/Bar)", "Bouteille (Restaurant)", "Bouteille (Magasin)", "Bouteille (Producteur)"]
        }
    },
    "liquor": {
        "type": ["Vodka", "Whisky", "Tequila", "Rhum"],
        "drink": {
            "container" : ["Shoot (Maison)", "Shoot (Restaurant/Bar)", "Bouteille (Restaurant)", "Bouteille (Magasin)"]
        }
    },
    "cocktail": {
        "drink": {
            "container" : ["Shoot", "Verre", "Pichet (1L)", "Pichet (1,5L)"]
        }
    }
}
'
echo ""

echo "Create images"
curl $USER_PASS -XPOST $HOST'/constant/images'  -d '
{
    "images": {
        "empty_image": {
            "contentType" : "image/png",
            "base64" : "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"
        }
    }
}
'
echo ""