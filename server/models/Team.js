var db = require('../db/config')

var TeamSchema = new db.Schema({
  teamName: {
    type: String
  }
})

var Team = db.model('team', TeamSchema)

module.exports = Team
