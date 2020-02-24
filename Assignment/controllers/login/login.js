var express = require('express');
var services = require('./login_services')
var router = express.Router();
var jwt = require('jsonwebtoken')



router.post('/login', function (req, res) {

  if(req.headers.token){
    services.log_in(req,res,req.headers.token)
  }
  else{
    services.tokenizer(req,res)
  }
 
 
  
})
  



module.exports = router;
