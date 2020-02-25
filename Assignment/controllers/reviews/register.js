var express = require('express');
var services = require('./register_services')
var router = express.Router();




router.post('/', function (req, res) {
    services.register(req,res)
})
  
  

  
module.exports = router;
