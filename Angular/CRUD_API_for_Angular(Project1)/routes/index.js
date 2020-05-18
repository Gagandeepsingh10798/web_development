try{

var express = require('express');
var router = express.Router();
var authController = require('../controllers/auth')
var homeController = require('../controllers/home.controller')

router
    .route('/home')
    .get(homeController.show_one_product);

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