try{

const express = require('express');
var router = express.Router();
var static = require('../static')
const userController = require('../controllers/users.controller') 



router.get('/', function (req, res) {
  
        userController.get_user(req,res)

    
})

router.get('/all', function (req, res) {
   
        userController.users(req,res)
    
})

router.get('/get/:id', function (req, res) {
   
  userController.get_userr(req,res)

})

  
  
router.delete('/delete/:id', function (req, res) {
    userController.delete_user(req,res)
})


router.put('/', static.validations.auth,function (req, res) {
    userController.update_user(req,res)
})

router.put('/:id', static.validations.auth,function (req, res) {
  userController.update_userr(req,res)
})
  
  


module.exports = router
}
catch(err){
  console.log(err)
}