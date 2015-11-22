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

  //use api key???
  app.post('/lobby/create', function(req, res){
    var room = req.body
    console.log('room', room);
    res.status(200).send('niceeee');
  })
}


