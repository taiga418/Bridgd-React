var express = require('express');
var path = require('path')
var bodyparser = require('body-parser');

var db = require('./lib/db-config')

var app = express();

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

var io = require('socket.io').listen(server);

require('./lib/sockets.js')(app, io)
require('./routes/lobby-routes')(app, db, io)
require('./routes/queue-routes')(app, db, io)


module.exports = app;

