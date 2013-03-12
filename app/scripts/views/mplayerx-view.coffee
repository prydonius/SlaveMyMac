class SlaveMyMac.Views.MPlayerXView extends Backbone.View

  template: new EJS(url: 'scripts/templates/mplayerx.ejs')

  events:
    'click .btn': 'update'

  initialize: ->
    @model.on 'change:currentState', @togglePlayPauseButton, this
    @model.fetch()
    # @poll = setInterval (=> @model.fetch()), 1000

  render: ->
    $(@el).html(@template.render(itunes: @model.toJSON()))
    this

  togglePlayPauseButton: ->
    icon = if @model.get('currentState') == 'Playing' then 'icon-pause' else 'icon-play'
    @$('#mplayerx-playpause i').removeClass('icon-play icon-pause').addClass(icon)

  update: (e) ->
    nextState = $(e.currentTarget).data('nextstate')
    if nextState == 'playpause'
      nextState = if @model.get('currentState') == 'Playing' then 'pause' else 'play'
    @model.set 'nextState', nextState
    @model.save()


  close: ->
    # clearInterval @poll
    @model.off
    $(@el).remove()

