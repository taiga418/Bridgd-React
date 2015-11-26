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

  app.post('/enqueue/:name', auth.authenticate, function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    var name = req.params.name;

    var video = req.body
    var newQ;
    db.collection('rooms').findOne({name: name}, function(err, room) {
      if(err) return res.status(500).send('Error finding queue')
      newQ = room.queue;
      var dupes =_.filter(newQ, function(obj) {
        return obj.id.videoId == video.id.videoId
      });
      if(dupes.length > 0) return res.status(500).send('Dupe')

      newQ.push(video);
      if(newQ.length == 1){
      db.collection('rooms').update({name: name}, {$set:{queue:newQ, current: newQ[0]}}, function(err, response){
          if(err) return res.status(500).send('Error saving to queue')
          app.emit('queue update', newQ)
          console.log('new', newQ)
          res.status(200).send({queue: newQ});
        })
      }else{
        db.collection('rooms').update({name: name}, {$set:{queue:newQ}}, function(err, response){
          if(err) return res.status(500).send('Error saving to queue')
          app.emit('queue update', newQ)
          console.log('new', newQ)
          res.status(200).send({queue: newQ});
        })
      }
     
    })
  })

  app.post('/delete/:name/:id', auth.authenticate, function(req, res){
    var name = req.params.name;
    var video = req.params.id
    var newQ;
    db.collection('rooms').findOne({name:name}, function(err, room) {
      if(err) return res.status(500).send('Error finding queue')
      newQ = _.reject(room.queue, function(obj) {
        return obj.id.videoId == video
      });
     
      db.collection('rooms').update({name:name}, {$set:{queue:newQ}}, function(err, response){
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
  app.post('/update/:name', auth.authenticate, function(req, res){
    var name = req.params.name;

    var video = req.body
    db.collection('rooms').update({name:name}, {$set:{current:video}}, function(err, response){
        if(err) {
          console.log(err)
          return res.status(500).send('Error saving to queue')
        }
        console.log(response)
        app.emit('new video', video)
        res.status(200).send({video: video})
    })
  })

  //mobile only
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

  
}