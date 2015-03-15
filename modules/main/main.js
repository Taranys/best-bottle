if (Meteor.isClient) {
  Template.mainPage.helpers({
    data: [{
      title: 'Bouteilles',
      links: [{
        link: '/beers',
        img: 'images/icons/beer.png',
        label: 'Bières'
      }, {
        link: '/wines',
        img: 'images/icons/wine.png',
        label: 'Vins et champagnes'
      }, {
        link: '/cocktails',
        img: 'images/icons/cocktails.png',
        label: 'Cocktails'
      }, {
        link: '/spirits',
        img: 'images/icons/spirit.png',
        label: 'Spiritueux'
      }]
    }, {
      title: 'Repas',
      links: [{
        link: '/appetizers',
        img: 'images/icons/appetizers.png',
        label: 'Apéro'
      }, {
        link: '/starters',
        img: 'images/icons/starter.png',
        label: 'Entré'
      }, {
        link: '/foods',
        img: 'images/icons/food.png',
        label: 'Plat'
      }, {
        link: '/desserts',
        img: 'images/icons/dessert.png',
        label: 'Dessert'
      }]
    }]
  });
}
