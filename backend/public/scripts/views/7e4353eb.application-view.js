(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  SlaveMyMac.Views.ApplicationView = (function(_super) {

    __extends(ApplicationView, _super);

    function ApplicationView() {
      return ApplicationView.__super__.constructor.apply(this, arguments);
    }

    ApplicationView.prototype.template = new EJS({
      url: '/scripts/templates/application.ejs'
    });

    ApplicationView.prototype.render = function() {
      $(this.el).html(this.template.render());
      return this;
    };

    ApplicationView.prototype.close = function() {
      return $(this.el).remove();
    };

    return ApplicationView;

  })(Backbone.View);

}).call(this);
