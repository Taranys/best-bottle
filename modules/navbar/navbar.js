if (Meteor.isClient) {
  Template.navbar.helpers({
    jumbo: true
  });

  Template.navbar.rendered = function () {
    setTimeout(function () {
      this.$('#login-dropdown-list').addClass('list-unstyled');

      this.$('#login-dropdown-list a')
        .addClass('btn btn-primary')
        .css('margin-top', '0px')
        .text('')
        .append('<i class="fa fa-user fa-fw"></i>');
    }, 500);
  };
}
