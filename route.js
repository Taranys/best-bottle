Router.configure({
  layoutTemplate: 'MainLayout'
});

Router.route('/', function () {
  this.render('mainPage');
});

Router.route('/beers', function () {
  this.render('beerList');
});

Router.route('/beers/:_id', function () {
  var beer = Beers.findOne({
    _id: this.params._id
  });
  this.render('beerList', {
    data: beer
  });
});

//Router.route('/files/:filename', function () {
//  this.response.end('hi from the server\n');
//}, {
//  where: 'server'
//});
//
//Router.route('/restful', {
//    where: 'server'
//  })
//  .get(function () {
//    this.response.end('get request\n');
//  })
//  .post(function () {
//    this.response.end('post request\n');
//  });
