var express = require('express');
var services = require('./user_services')
var router = express.Router();




router.post('/', function (req, res) {
    services.register(req,res)
})
  
  
router.get('/delete/:u_id', function (req, res) {
    services.delete_user(req,res)
})


router.post('/update/:u_id', function (req, res) {
    services.update_user(req,res)
})
  
  

router.get('/:u_id', function (req, res) {
    services.get_user(req,res)
})
  
module.exports = router;
