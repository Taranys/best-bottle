if (Meteor.isClient) {
  Template.navbar.helpers({
    jumbo: true
  });

  Template.navbar.rendered = function () {
//    setTimeout(function () {
      //      this.$('#login-dropdown-list').addClass('list-unstyled');
      //
      //      this.$('.btn-Google')
      //        .addClass('btn-primary')
      //      .removeClass('btn-Google')
      //        //        .css('margin-top', '0px')
      //        .text('')
      //        .append('<i class="fa fa-user fa-fw"></i>')
      //        .parent().removeClass('navbar-form');
      //    }, 500);
  };
}
