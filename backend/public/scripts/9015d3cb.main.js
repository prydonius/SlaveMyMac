(function() {

  window.SlaveMyMac = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function() {
      new SlaveMyMac.Routers.ApplicationRouter();
      return Backbone.history.start({
        pushState: false
      });
    }
  };

  $(function() {
    return SlaveMyMac.init();
  });

}).call(this);
