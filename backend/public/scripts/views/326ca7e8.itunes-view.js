(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  SlaveMyMac.Views.iTunesView = (function(_super) {

    __extends(iTunesView, _super);

    function iTunesView() {
      return iTunesView.__super__.constructor.apply(this, arguments);
    }

    iTunesView.prototype.template = new EJS({
      url: 'scripts/templates/itunes.ejs'
    });

    iTunesView.prototype.events = {
      'click #itunes-song-prev': 'prev',
      'click #itunes-song-next': 'next',
      'click #itunes-play-pause': 'togglePlayPause'
    };

    iTunesView.prototype.initialize = function() {
      var _this = this;
      this.model.on('change:album', this.render, this);
      this.model.on('change:name', this.refresh, this);
      this.model.on('change:currentState', this.togglePlayPauseButton, this);
      this.model.fetch();
      return this.poll = setInterval((function() {
        return _this.model.fetch();
      }), 1000);
    };

    iTunesView.prototype.render = function() {
      $(this.el).html(this.template.render({
        itunes: this.model.toJSON()
      }));
      return this;
    };

    iTunesView.prototype.refresh = function() {
      $('#itunes-song-name').text(this.model.get('name'));
      $('#itunes-song-artist').text(this.model.get('artist'));
      return $('#itunes-song-album').text(this.model.get('album'));
    };

    iTunesView.prototype.togglePlayPauseButton = function() {
      var icon;
      icon = this.model.get('currentState') === 'playing' ? 'icon-pause' : 'icon-play';
      return this.$('#itunes-play-pause > i').removeClass('icon-play icon-pause').addClass(icon);
    };

    iTunesView.prototype.prev = function() {
      this.model.set('nextState', 'previous', {
        silent: true
      });
      return this.model.save({}, {
        silent: true
      });
    };

    iTunesView.prototype.next = function() {
      this.model.set('nextState', 'next', {
        silent: true
      });
      return this.model.save({}, {
        silent: true
      });
    };

    iTunesView.prototype.togglePlayPause = function() {
      var nextState;
      nextState = this.model.get('currentState') === 'playing' ? 'pause' : 'play';
      this.model.set('nextState', nextState, {
        silent: true
      });
      return this.model.save({}, {
        silent: true
      });
    };

    iTunesView.prototype.close = function() {
      clearInterval(this.poll);
      this.model.off;
      return $(this.el).remove();
    };

    return iTunesView;

  })(Backbone.View);

}).call(this);
