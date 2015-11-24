var auth = require('../auth/auth')

module.exports = function(app, db, io){
  
  app.get('/lobby', function(req, res){
    res.render('lobby.html')
  })

  app.post('/login', function(req,res){
    var name = req.body.name;
    var password = req.body.password;

    auth.login(name, password, function(err, response){
      if(err) return res.status(err.status).send(err.err)
      res.cookie("authorization", response)
      //res.redirect("/room/" + name)
      res.json({success: true});
    })
  })

  app.post('/signout', function(req,res){
    res.clearCookie('authorization')
    res.redirect('/lobby')
  })

  //use api key???
  app.post('/lobby/create', function(req, res){
    var room = req.body
    db.collection('rooms').insert(room, function(err, resp){
      if(err) return res.status(500).send("Error creating room")
      res.status(200).send(room);
    })
  })

  // app.post('/room/create', roomSearchByName, function(req,res) {
  //   //need to varify new room
  //   if (req.room) return res.status(403).send('room exists');
  //   var newRoom = new Room();
  //   newRoom.name = req.headers.name;
  //   newRoom.currentIndex = 0;
  //   newRoom.save(function(err, data) {
  //     if (err) return res.status(500).send('there was an error');
  //     app.emit('createRoom', data._id);
  //     res.json({name: data.name, id: data._id});
  //   });
  // });
}


