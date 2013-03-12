window.SlaveMyMac =
  Models: {}
  Collections: {}
  Views: {}
  Routers: {}
  init: ->
    new SlaveMyMac.Routers.ApplicationRouter()
    Backbone.history.start(pushState: false)

$ ->
  SlaveMyMac.init()