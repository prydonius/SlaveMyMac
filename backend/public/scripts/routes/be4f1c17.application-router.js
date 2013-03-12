(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  SlaveMyMac.Routers.ApplicationRouter = (function(_super) {

    __extends(ApplicationRouter, _super);

    function ApplicationRouter() {
      return ApplicationRouter.__super__.constructor.apply(this, arguments);
    }

    ApplicationRouter.prototype.routes = {
      '': 'index',
      'files': 'files',
      'itunes': 'itunes',
      'mplayerx': 'mplayerx',
      '*notFound': 'notFound'
    };

    ApplicationRouter.prototype.initialize = function() {
      return this.currentView = null;
    };

    ApplicationRouter.prototype.index = function() {
      var view;
      view = new SlaveMyMac.Views.ApplicationView();
      return this.showView(view);
    };

    ApplicationRouter.prototype.files = function() {
      var collection, view;
      collection = new SlaveMyMac.Collections.Files();
      view = new SlaveMyMac.Views.FilesView({
        collection: collection
      });
      return this.showView(view);
    };

    ApplicationRouter.prototype.itunes = function() {
      var model, view;
      model = new SlaveMyMac.Models.iTunes({
        id: 0
      });
      view = new SlaveMyMac.Views.iTunesView({
        model: model
      });
      return this.showView(view);
    };

    ApplicationRouter.prototype.mplayerx = function() {
      var model, view;
      model = new SlaveMyMac.Models.MPlayerX({
        id: 0
      });
      view = new SlaveMyMac.Views.MPlayerXView({
        model: model
      });
      return this.showView(view);
    };

    ApplicationRouter.prototype.notFound = function() {
      return alert("wtf");
    };

    ApplicationRouter.prototype.showView = function(view) {
      if (this.currentView != null) {
        if (this.currentView.close != null) {
          this.currentView.close();
        }
      }
      this.currentView = view;
      this.currentView.render();
      return $('#content').html(view.el);
    };

    return ApplicationRouter;

  })(Backbone.Router);

}).call(this);
