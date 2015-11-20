var auth = require('../auth/auth')

module.exports = function(app, db, io){
  
  app.get('/lobby', function(req, res){
    res.render('lobby.html')
  })

  app.post('/login', function(req,res){
    var name = req.body.username;
    var password = req.body.password;

    auth.login(name, password, function(err, response){
      if(err) return res.status(err.status).send(err.err)
      res.cookie("authorization", response)
      res.json({success: true});
    })
  })
}


