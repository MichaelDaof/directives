var mongoose = require('mongoose')

var uri = process.env.MONGODB_URI || 'mongodb://localhost/directives'

module.exports = mongoose.connect(uri, function (){
  console.log("Connection to MongoDB established: ", uri)
})
