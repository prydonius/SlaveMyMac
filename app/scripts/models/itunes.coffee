class SlaveMyMac.Models.iTunes extends Backbone.Model

  urlRoot: 'http://192.168.0.13:3000/api/itunes'

  sync: (method, model, options) ->
    options = options || {}
    options.url = "http://192.168.0.13:3000/api/itunes"

    Backbone.sync(method, model, options)