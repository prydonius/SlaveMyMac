(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  SlaveMyMac.Views.MPlayerXView = (function(_super) {

    __extends(MPlayerXView, _super);

    function MPlayerXView() {
      return MPlayerXView.__super__.constructor.apply(this, arguments);
    }

    MPlayerXView.prototype.template = new EJS({
      url: 'scripts/templates/mplayerx.ejs'
    });

    MPlayerXView.prototype.events = {
      'click .btn': 'update'
    };

    MPlayerXView.prototype.initialize = function() {
      this.model.on('change:currentState', this.togglePlayPauseButton, this);
      return this.model.fetch();
    };

    MPlayerXView.prototype.render = function() {
      $(this.el).html(this.template.render({
        itunes: this.model.toJSON()
      }));
      return this;
    };

    MPlayerXView.prototype.togglePlayPauseButton = function() {
      var icon;
      icon = this.model.get('currentState') === 'Playing' ? 'icon-pause' : 'icon-play';
      return this.$('#mplayerx-playpause i').removeClass('icon-play icon-pause').addClass(icon);
    };

    MPlayerXView.prototype.update = function(e) {
      var nextState;
      nextState = $(e.currentTarget).data('nextstate');
      if (nextState === 'playpause') {
        nextState = this.model.get('currentState') === 'Playing' ? 'pause' : 'play';
      }
      this.model.set('nextState', nextState);
      return this.model.save();
    };

    MPlayerXView.prototype.close = function() {
      this.model.off;
      return $(this.el).remove();
    };

    return MPlayerXView;

  })(Backbone.View);

}).call(this);
