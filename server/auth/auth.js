var jwt    = require('jsonwebtoken');
var secret = 'appSecret';
var db = require('../lib/db-config')

exports.login = function(name, password, next){
  db.collection('rooms').findOne({name: name}, function(err, result) {
    if(err) return next({status: 500, err: err})
    if(result == null) return next({status: 401, err: 'invalid room name'})
    if(password == result.password){
      //expires in 30 days
    console.log('name', name)

      var token =  jwt.sign({name: name}, secret + name, {expiresInMinutes: 60 * 24 * 30});
      next(null, token);
    }else{
      next({status:401, err:'wrong password'})
    }
  })
}

//middleware function
exports.authenticate = function(req, res, next){
  var token = req.headers && req.headers['cookie']?  req.headers['cookie'].split('=')[2] : null
    var name = req.params.name;
    if (token) {
      jwt.verify(token, secret + name, function(err, decoded) { 
        if (err) {
          return res.redirect('/lobby')
        }
        next();
      });
    }else{
      return res.redirect('/lobby')
    }
}