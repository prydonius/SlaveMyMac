class SlaveMyMac.Models.File extends Backbone.Model

  getContents: ->
    if @get('directory')
      @collection.fetch({ data: { path: @get('path') } })

  sync: (method, model, options) ->
    options = options || {}
    if method.toLowerCase() == 'update'
      options.url = 'http://192.168.0.13:3000/api/file'
      method = 'create'
      
    Backbone.sync method, model, options