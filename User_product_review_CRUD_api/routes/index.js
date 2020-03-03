try{

var express = require('express');
var router = express.Router();
var authController = require('../controllers/auth')

router
    .route('/register')
    .post(authController.register);



router
    .route('/login')
    .post(authController.login);


module.exports = router;
}
catch(err){
  console.log(err)
}