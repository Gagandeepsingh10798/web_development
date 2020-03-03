try{

const express = require('express');
var router = express.Router();

const userController = require('../controllers/users.controller') 



router.get('/', function (req, res) {
  
        userController.get_user(req,res)

    
})

router.get('/all', function (req, res) {
   
        userController.users(req,res)
    
})
  
  
router.delete('/', function (req, res) {
    userController.delete_user(req,res)
})


router.put('/', function (req, res) {
    userController.update_user(req,res)
})
  
  


module.exports = router
}
catch(err){
  console.log(err)
}