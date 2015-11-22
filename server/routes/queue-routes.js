var _ = require('underscore')
var auth = require('../auth/auth')

module.exports = function(app, db, io){
  
  app.get('/room/:name', auth.authenticate, function (req, res) {
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

  app.get('/queue', function(req, res){
    db.collection('rooms').findOne({name:'taiga'}, function(err, result) {
      res.send(result);
    })
  })

  //mobile hits to update player with new video
  app.post('/load', function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    var video = req.body
    app.emit('load video', video)
  })

  app.post('/enqueue', function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   
    var video = req.body
    var newQ;
    db.collection('rooms').findOne({name:'taiga'}, function(err, room) {
      if(err) return res.status(500).send('Error finding queue')
      newQ = room.queue;
      var dupes =_.filter(newQ, function(obj) {
        return obj.id.videoId == video.id.videoId
      });
      if(dupes.length > 0) return res.status(500).send('Dupe')

      newQ.push(video);
      db.collection('rooms').update({name:'taiga'}, {$set:{queue:newQ}}, function(err, response){
        if(err) return res.status(500).send('Error saving to queue')
        app.emit('queue update', newQ)
        res.status(200).send({queue: newQ});
      })
    })
  })

  app.post('/delete/:id', function(req, res){
    var video = req.params.id
    var newQ;
    db.collection('rooms').findOne({name:'taiga'}, function(err, room) {
      if(err) return res.status(500).send('Error finding queue')
      newQ = _.reject(room.queue, function(obj) {
        return obj.id.videoId == video
      });
     
      db.collection('rooms').update({name:'taiga'}, {$set:{queue:newQ}}, function(err, response){
        if(err) {
          console.log(err)
          return res.status(500).send('Error saving to queue')
        }
        console.log(response)
        app.emit('queue update', newQ)
        res.status(200).send({queue: newQ});
      })
    })
  })

  //tell the mobile app that the player is playing a new video
  app.post('/update', function(req, res){
    var video = req.body
    db.collection('rooms').update({name:'taiga'}, {$set:{current:video}}, function(err, response){
        if(err) {
          console.log(err)
          return res.status(500).send('Error saving to queue')
        }
        console.log(response)
        app.emit('new video', video)
        res.status(200).send({video: video})
    })
  })
}