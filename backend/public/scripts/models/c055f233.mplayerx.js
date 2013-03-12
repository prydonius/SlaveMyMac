(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  SlaveMyMac.Models.MPlayerX = (function(_super) {

    __extends(MPlayerX, _super);

    function MPlayerX() {
      return MPlayerX.__super__.constructor.apply(this, arguments);
    }

    MPlayerX.prototype.urlRoot = 'http://192.168.0.13:3000/api/mplayerx';

    MPlayerX.prototype.sync = function(method, model, options) {
      options = options || {};
      options.url = "http://192.168.0.13:3000/api/mplayerx";
      return Backbone.sync(method, model, options);
    };

    return MPlayerX;

  })(Backbone.Model);

}).call(this);
