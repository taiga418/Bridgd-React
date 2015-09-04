var express = require('express');
var path = require('path')
var React = require('react');
var request = require('request');

var LandingPage = require('../client/components/index.js');
//var MainPage = require('../client/components/main.js');

var app = express();
app.set('views', path.join(__dirname, 'templates'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'public')));
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});


app.get('/', function (req, res) {
  //var reactHtml = React.renderToString(<LandingPage />);
  request.get("https://www.youtube.com/iframe_api", function(err, resp, body){
    if(err){
      return console.log(err)
    }
    //res.render('index.html', {reactOutPut: reactHtml, iFrameApi: body});
    res.render('index.html', {iFrameApi: body});
  })

  
})

// app.get('/home', function (req, res) {
//   var reactHtml = React.renderToString(<MainPage />);
//   res.render('index.html', {reactOutPut: reactHtml});
// })