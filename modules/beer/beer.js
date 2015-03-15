if (Meteor.isClient) {
  Template.beerList.helpers({
    beerType : function() {
      return CST.BEER.types;
    },
    beers: function getAllBeers() {
      return Beers.find();
    }
  })
}
