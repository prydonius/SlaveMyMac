class SlaveMyMac.Routers.ApplicationRouter extends Backbone.Router
  
  routes:
    '': 'index'
    'files': 'files'
    'itunes': 'itunes'
    'mplayerx': 'mplayerx'
    '*notFound': 'notFound'

  initialize: ->
    @currentView = null

  index: ->
    view = new SlaveMyMac.Views.ApplicationView()
    @showView view

  files: ->
    collection = new SlaveMyMac.Collections.Files()
    view = new SlaveMyMac.Views.FilesView
      collection: collection
    @showView view

  itunes: ->
    model = new SlaveMyMac.Models.iTunes(id: 0)
    view = new SlaveMyMac.Views.iTunesView
      model: model
    @showView view

  mplayerx :->
    model = new SlaveMyMac.Models.MPlayerX(id: 0)
    view = new SlaveMyMac.Views.MPlayerXView
      model: model
    @showView view

  notFound: ->
    alert "wtf"

  showView: (view) ->
    if @currentView?
      if @currentView.close?
        @currentView.close()
    @currentView = view
    @currentView.render()
    $('#content').html(view.el)

