var Team = require('../db/models/Team')

module.exports = {
  enter: function enter(req, res){
    var reqTeam = {
      teamName: req.params.team
    }
    Team.findOne(reqTeam, function (err, team){
      if (err){
        console.error("Team lookup faild: ", err)
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
  } // enter

}
