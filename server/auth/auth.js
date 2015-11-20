var jwt    = require('jsonwebtoken');
var secret = 'appSecret';
var db = require('../lib/db-config')

exports.login = function(name, password, next){

  db.collection('rooms').findOne({name: name}, function(err, result) {
    if(err) return next({status: 500, err: err})

    if(password == result.password){
      //expires in 30 days
      var token = jwt.sign(user, secret, {algorithm: 'RS256', expiresInMinutes: 60 * 24 * 30});
      next(null, token);
    }else{
      next({status:401, err:'wrong password'})
    }
  })
}