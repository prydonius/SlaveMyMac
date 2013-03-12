class SlaveMyMac.Models.MPlayerX extends Backbone.Model

  urlRoot: 'http://192.168.0.13:3000/api/mplayerx'

  sync: (method, model, options) ->
    options = options || {}
    options.url = "http://192.168.0.13:3000/api/mplayerx"

    Backbone.sync(method, model, options)