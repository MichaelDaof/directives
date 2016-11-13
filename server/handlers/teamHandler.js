var Team = require('../models/Team')

module.exports.enter = function (req, res){
  var reqTeam = {
    teamName: req.params.team
  }
  Team.findOne(reqTeam, function (err, team){
    if (err){
      console.error('something went wrong with Team query API: ', err)
    } else {
      if (!team){
        Team.create(reqTeam, function (err, team){
          team.save(function (err, team){
            console.log("Document: ", team)
            res.send(team)
          })
        })
      } else {
        res.send(team)
      }
    }
  })
}
