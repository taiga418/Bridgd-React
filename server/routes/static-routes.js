
module.exports = function(app, db, io){
  
  app.get('/lobby', function(req, res){
    res.render('lobby.html')
  })


  app.get('/room/:name', function (req, res) {
    var name = req.params.name;
    db.collection('rooms').findOne({name: name}, function(err, result) {
      var first = result.queue.length > 0 ? result.queue[0] : null
      db.collection('rooms').update({name: name}, {$set:{current:first}}, function(err, response){
        if(err) {
          console.log(err)
          return res.status(500).send('Error saving to queue')
        }
        app.emit('new video', first)
        res.render('index.html', {queue:result});
      })
    })
  })

}


