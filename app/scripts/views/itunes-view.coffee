class SlaveMyMac.Views.iTunesView extends Backbone.View

  template: new EJS(url: 'scripts/templates/itunes.ejs')

  events:
    'click #itunes-song-prev': 'prev'
    'click #itunes-song-next': 'next'
    'click #itunes-play-pause': 'togglePlayPause'

  initialize: ->
    @model.on 'change:album', @render, this
    @model.on 'change:name', @refresh, this
    @model.on 'change:currentState', @togglePlayPauseButton, this
    @model.fetch()
    @poll = setInterval (=> @model.fetch()), 1000

  render: ->
    $(@el).html(@template.render(itunes: @model.toJSON()))
    this

  refresh: ->
    $('#itunes-song-name').text(@model.get('name'))
    $('#itunes-song-artist').text(@model.get('artist'))
    $('#itunes-song-album').text(@model.get('album'))

  togglePlayPauseButton: ->
    icon = if @model.get('currentState') == 'playing' then 'icon-pause' else 'icon-play'
    @$('#itunes-play-pause > i').removeClass('icon-play icon-pause').addClass(icon)

  prev: ->
    @model.set 'nextState', 'previous', silent: true
    @model.save({}, silent: true)

  next: ->
    @model.set 'nextState', 'next', silent: true
    @model.save({}, silent: true)

  togglePlayPause: ->
    nextState = if @model.get('currentState') == 'playing' then 'pause' else 'play'
    @model.set 'nextState', nextState, silent: true
    @model.save({}, silent: true)

  close: ->
    clearInterval @poll
    @model.off
    $(@el).remove()

