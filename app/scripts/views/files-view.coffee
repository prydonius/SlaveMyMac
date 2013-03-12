class SlaveMyMac.Views.FilesView extends Backbone.View

  template: new EJS(url: '/scripts/templates/files.ejs')
  file: new EJS(url: '/scripts/templates/files/file.ejs')

  events:
    'click .type-directory': 'navigate'
    'click .type-file': 'open'
    'click .type-back': 'back'

  initialize: ->
    @collection.on 'reset', @enlist, this
    @collection.fetch()
    @currentPath = '/'

  render: ->
    $(@el).html(@template.render())
    this

  enlist: (collection) ->
    @$('#current-path').text(@currentPath)
    @$('ul#file-list').empty()
    unless @currentPath == '/'
      @$('ul#file-list').append('<li><a class="type-back" href="#">..</a></li>')
    for file in collection.models
      @$('ul#file-list').append(@file.render(file.toJSON()))

  navigate: (e) ->
    e.preventDefault()
    id = e.target.id
    model = @collection.get(id)
    model.getContents()
    @currentPath = model.get('path')

  open: (e) ->
    e.preventDefault()
    id = e.target.id
    model = @collection.get(id)
    model.save()

  back: (e) ->
    e.preventDefault()
    array = @currentPath.split('/')
    array.pop()
    array.pop()
    path = array.join('/') + '/'
    @collection.fetch
      data:
        path: path
    @currentPath = path

  close: ->
    @collection.off
    $(@el).remove()
