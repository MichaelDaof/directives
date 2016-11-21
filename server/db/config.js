var mongoose = require('mongoose')

var uri = process.env.MONGODB_URI || 'mongodb://localhost/directives'

module.exports = mongoose.connect(uri, function (err, db){
  if (err){
    throw new Error('Database failed to connect. Check if server is running.', err)
  } else {
    console.log("Connection to MongoDB established: ", uri)
  }
})
