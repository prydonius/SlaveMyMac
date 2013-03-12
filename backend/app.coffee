express = require 'express'
fs = require 'fs'
spawn = require('child_process').spawn
applescript = require('applescript')

app = express()
# Be able to parse POST data
app.use express.bodyParser()

# web client
app.use express.static(__dirname + '/public')

# Help with development in yeoman
app.all '*', (req, res, next) ->
  res.header 'Access-Control-Allow-Origin', '*'
  res.header 'Access-Control-Allow-Methods', 'HEAD, GET, POST, PUT, DELETE, OPTIONS'
  res.header 'Access-Control-Allow-Headers', 'Content-Type'
  if req.method.toLowerCase() == "options"
    res.send 200
  else
    next()

app.get '/api/files', (req, res) ->
  if req.param('path')
    path = req.param('path')
    # Add appropriate slash at the end if it doesn't already exist
    if not path.match(/\/$/)
      path = path + '/'
  else
    path = '/'

  fs.readdir path, (err, files) ->
    response = []
    for file, i in files
      if file.match(/^\./)
        continue
      stats = fs.statSync(path + file)
      dir = stats.isDirectory()
      full_path = path + file
      if dir
        full_path += '/'
      response.push
        id: i
        name: file
        path: full_path
        directory: dir
    res.send response

app.post '/api/file', (req, res) ->
  path = req.body.path
  fs.exists path, (exists) ->
    if exists
      spawn 'open', [path]
      res.send 200
    else
      res.send 404

app.get '/api/itunes/artwork', (req, res) ->
  # res.header 'Content-Type', 'image/jpeg'
  script = 'tell application "iTunes" to get data of artwork 1 of current track'
  applescript.execString script, (err, image_data) ->
    if err
      res.send 422, "Error connecting with iTunes"
    script2 = 'tell application "iTunes" to get format of artwork 1 of current track'
    applescript.execString script2, (err, rtn) ->
      if rtn == 'JPEG picture'
        res.type 'jpeg'
      else if rtn == '«class PNG »'
        res.type 'png'
      res.send image_data

  # res.send 200

itunes_data = """
  tell application "iTunes"

  return {(get name of current track), (get artist of current track), (get album of current track), (get player state)}

  end tell
"""

app.set 'itunes_data', itunes_data

app.get '/api/itunes', (req, res) ->
  applescript.execString app.get('itunes_data'), (err, data) ->
    if err || !(data?)
      res.send 422, "Error connecting with iTunes"
    else
      res.send
        name: data[0]
        artist: data[1]
        album: data[2]
        currentState: data[3]
        nextState: null

app.put '/api/itunes', (req, res) ->
  tell_app = 'tell application "iTunes"'
  switch req.body.nextState
    when "previous"
      script = "#{tell_app} to get previous track"
    when "next"
      script = "#{tell_app} to get next track"
    when "play"
      script = "#{tell_app} to play"
    when "pause"
      script = "#{tell_app} to pause"

  applescript.execString script, (err, data) ->
    if err
      res.send 422, "Error connecting with iTunes"
    else
      # res.send 200
      applescript.execString app.get('itunes_data'), (err, data) ->
        if err || !(data?)
          res.send 422, "Error connecting with iTunes"
        else
          res.send
            name: data[0]
            artist: data[1]
            album: data[2]
            currentState: data[3]
            nextState: null

mplayerx_data = """
  tell application "MPlayerX"

  return {(get current time), (get duration), (get playstatus)}

  end tell
"""

app.set 'mplayerx_data', mplayerx_data

app.get '/api/mplayerx', (req, res) ->
  applescript.execString app.get('mplayerx_data'), (err, data) ->
    if err || !(data?)
      res.send 422, "Error connecting with MPlayerX"
    else
      res.send
        currentTime: data[0]
        duration: data[1]
        currentState: data[2]
        nextState: null

app.put '/api/mplayerx', (req, res) ->
  tell_app = 'tell application "MPlayerX"'
  emulate_key = (code) ->
    """
    #{tell_app} to activate
    tell application "System Events" to key code #{code}
    """
  switch req.body.nextState
    when "play"
      script = "#{tell_app} to play"
    when "pause"
      script = "#{tell_app} to pause"
    when "stop"
      script = "#{tell_app} to stop"
    when "forward"
      script = "#{tell_app} to seekto (get current time) + 10"
    when "backward"
      script = "#{tell_app} to seekto (get current time) - 10"
    when "next"
      script = "#{tell_app} to goto next episode"
    when "previous"
      script = "#{tell_app} to goto previous episode"
    when "volup"
      script = emulate_key(24)
    when "voldown"
      script = emulate_key(27)
    when "mute"
      script = "#{tell_app} to mute"
    when "subs"
      script = emulate_key(1)
    when "fullscreen"
      script = emulate_key(3)
  applescript.execString script, (err, data) ->
    if err
      res.send 422, "Error connecting with MPlayerX"
    else
      applescript.execString app.get('mplayerx_data'), (err, data) ->
        if err || !(data?)
          res.send 422, "Error connecting with MPlayerX"
        else
          res.send
            currentTime: data[0]
            duration: data[1]
            currentState: data[2]
            nextState: null

app.listen 3000

console.log 'Web application running on port 3000'

spawn 'open', ['http://localhost:3000/']
