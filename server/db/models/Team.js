var mongoose = require('mongoose')

var TeamSchema = new mongoose.Schema({
  teamName: {
    type: String
  }
})

module.exports = mongoose.model('Team', TeamSchema)
