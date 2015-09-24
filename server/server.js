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


//////////////////// SERVER ROUTES /////////////////



app.get('/', function (req, res) {
  db.collection('rooms').findOne({name:'taiga'}, function(err, result) {
    res.render('index.html', {queue:result});
  })
})

app.post('/enqueue', function(req, res){
  var video = req.body
  var newQ;
  db.collection('rooms').findOne({name:'taiga'}, function(err, room) {
    if(err) return res.status(500).send('Error finding queue')
    newQ = room.queue;
    newQ.push(video);
    db.collection('rooms').update({name:'taiga'}, {$set:{queue:newQ}}, function(err, response){
      if(err) return res.status(500).send('Error saving to queue')
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
      res.status(200).send({queue: newQ});
    })
  })
})
