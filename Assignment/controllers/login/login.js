var express = require('express');
var services = require('./login_services')
var router = express.Router();
var jwt = require('jsonwebtoken')



router.post('/login', function (req, res) {

  
  var tokens = JSON.parse(req.body.toString()).token
  if(tokens===undefined){
    tokens = ' '
  }

  //jwt token creation
  var token = jwt.sign({email:JSON.parse(req.body.toString()).email},tokens,{expiresIn: 120});
    services.log_in(req,res,token)
})
  
  
module.exports = router;
