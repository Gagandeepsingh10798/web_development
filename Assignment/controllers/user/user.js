var express = require('express');
var services = require('./user_services')
var router = express.Router();




router.get('/', function (req, res) {
    if(req.headers.token){
        services.get_user(req,res)
    }
    else{
        services.users(req,res)
    }
    
})
  
  
router.delete('/', function (req, res) {
    services.delete_user(req,res)
})


router.put('/', function (req, res) {
    services.update_user(req,res)
})
  
  
module.exports = router;
