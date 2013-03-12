(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  SlaveMyMac.Views.FilesView = (function(_super) {

    __extends(FilesView, _super);

    function FilesView() {
      return FilesView.__super__.constructor.apply(this, arguments);
    }

    FilesView.prototype.template = new EJS({
      url: '/scripts/templates/files.ejs'
    });

    FilesView.prototype.file = new EJS({
      url: '/scripts/templates/files/file.ejs'
    });

    FilesView.prototype.events = {
      'click .type-directory': 'navigate',
      'click .type-file': 'open',
      'click .type-back': 'back'
    };

    FilesView.prototype.initialize = function() {
      this.collection.on('reset', this.enlist, this);
      this.collection.fetch();
      return this.currentPath = '/';
    };

    FilesView.prototype.render = function() {
      $(this.el).html(this.template.render());
      return this;
    };

    FilesView.prototype.enlist = function(collection) {
      var file, _i, _len, _ref, _results;
      this.$('#current-path').text(this.currentPath);
      this.$('ul#file-list').empty();
      if (this.currentPath !== '/') {
        this.$('ul#file-list').append('<li><a class="type-back" href="#">..</a></li>');
      }
      _ref = collection.models;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        file = _ref[_i];
        _results.push(this.$('ul#file-list').append(this.file.render(file.toJSON())));
      }
      return _results;
    };

    FilesView.prototype.navigate = function(e) {
      var id, model;
      e.preventDefault();
      id = e.target.id;
      model = this.collection.get(id);
      model.getContents();
      return this.currentPath = model.get('path');
    };

    FilesView.prototype.open = function(e) {
      var id, model;
      e.preventDefault();
      id = e.target.id;
      model = this.collection.get(id);
      return model.save();
    };

    FilesView.prototype.back = function(e) {
      var array, path;
      e.preventDefault();
      array = this.currentPath.split('/');
      array.pop();
      array.pop();
      path = array.join('/') + '/';
      this.collection.fetch({
        data: {
          path: path
        }
      });
      return this.currentPath = path;
    };

    FilesView.prototype.close = function() {
      this.collection.off;
      return $(this.el).remove();
    };

    return FilesView;

  })(Backbone.View);

}).call(this);
