var auth = require('../auth/auth')

module.exports = function(app, db, io){

  app.get('/lobby', function(req, res){
    res.render('index.html', {queue:{ queue: [] }})
  })

  app.post('/login', function(req,res){
    var name = req.body.name.toLowerCase();
    var password = req.body.password;
    auth.login(name, password, function(err, response){
      if(err) return res.status(401).json({message: 'Invalid credentials'})
      res.cookie("authorization", response)
      res.json({name:name})

    })
  })

  app.post('/signout', function(req,res){
    res.clearCookie('authorization')
    res.json({success:true})
  })

  //TODO: use api key???
  app.post('/lobby/create', function(req, res){
    var room = req.body
    room.queue = [];
    db.collection('rooms').findOne({name: room.name}, function(err, result) {
      if(err) return res.status(500).json({err:'creation error'})
      if(result){
        return res.status(403).json({duplicate: true})
      }
      db.collection('rooms').insert(room, function(err, resp){
        if(err) return res.status(500).json({err:'creation error'});
         auth.login(room.name, room.password, function(err, response){
          if(err) return res.status(401)({err:'login error'})
          res.cookie("authorization", response)
          res.status(200).json(room)
        })
      })
    })

  })
}
