var db = require('../config')

var TeamSchema = new db.Schema({
  teamName: {
    type: String
  }
})

module.exports = db.model('Team', TeamSchema)
