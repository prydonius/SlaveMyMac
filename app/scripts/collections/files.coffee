class SlaveMyMac.Collections.Files extends Backbone.Collection

  url: 'http://192.168.0.13:3000/api/files'
  model: SlaveMyMac.Models.File
