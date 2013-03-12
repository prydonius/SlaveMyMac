class SlaveMyMac.Views.ApplicationView extends Backbone.View

  template: new EJS(url: '/scripts/templates/application.ejs')

  render: ->
    $(@el).html(@template.render())
    this

  close: ->
    $(@el).remove()