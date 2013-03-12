(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  SlaveMyMac.Collections.Files = (function(_super) {

    __extends(Files, _super);

    function Files() {
      return Files.__super__.constructor.apply(this, arguments);
    }

    Files.prototype.url = 'http://192.168.0.13:3000/api/files';

    Files.prototype.model = SlaveMyMac.Models.File;

    return Files;

  })(Backbone.Collection);

}).call(this);
