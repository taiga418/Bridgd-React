var auth = require('../auth/auth')

module.exports = function(app, db, io){
  
  app.get('/lobby', function(req, res){
    res.render('lobby.html')
  })

  app.post('/login', function(req,res){
    var name = req.body.name.toLowerCase();
    var password = req.body.password;
    auth.login(name, password, function(err, response){
      if(err) return res.status(err.status).send(err.err)
      res.cookie("authorization", response)
      //res.redirect("/room/" + name)
      res.json({name: name});
    })
  })

  app.post('/signout', function(req,res){
    res.clearCookie('authorization')
    res.redirect('/lobby')
  })

  //use api key???
  app.post('/lobby/create', function(req, res){
    var room = req.body
    room.queue = [];
    db.collection('rooms').insert(room, function(err, resp){
      if(err) return res.status(500).send("Error creating room")
       auth.login(room.name, room.password, function(err, response){
        if(err) return res.status(err.status).send(err.err)
        res.cookie("authorization", response)
        res.status(200).send(room)
      })
    })
  })
}


