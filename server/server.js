var express = require('express');
var path = require('path')
var React = require('react');
var request = require('request');
var bodyparser = require('body-parser');
var _ = require('underscore')

var app = express();
var db = require('mongoskin').db('mongodb://heroku_app31904821:ouldm56b1i98br7lfm5f009olh@ds053370.mongolab.com:53370/heroku_app31904821'); 

app.set('views', path.join(__dirname, 'templates'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});

///////////SOCKET /////////////////
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {

  socket.emit('selfId', socket.id);

  socket.on('joined', function(){
    console.log('socket id:', socket.id, ' connected');
  })

  socket.on('disconnect', function () {
    console.log('socket id:', socket.id, ' disconnected');
  });

  app.on('queue update', function(queue){
    socket.emit('queueUpdate', queue)
  })

  app.on('load video', function(video){
    socket.emit('loadVideo', video)
  })

  app.on('new video', function(video){
    socket.emit('newVideo', video)
  })


});


///////////////////////
//////////////////// SERVER ROUTES /////////////////



app.get('/', function (req, res) {
  db.collection('rooms').findOne({name:'taiga'}, function(err, result) {
    var first = result.queue.length > 0 ? result.queue[0] : null
    console.log(first);
    db.collection('rooms').update({name:'taiga'}, {$set:{current:first}}, function(err, response){
      if(err) {
        console.log(err)
        return res.status(500).send('Error saving to queue')
      }
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
