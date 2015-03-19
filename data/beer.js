Beers = new Mongo.Collection("beers");

Meteor.startup(function () {
  if (Beers.find().count() === 0) {
    Beers.insert({
      "name":"Leffe",
      "description":"Au top !",
      rate: {
        draft : 8,
        bottle : 7
      },
      "color":"YELLOW",
      "countryCode":"BE",
      "opinions":[]
    });
  }
});
