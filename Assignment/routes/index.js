var express = require('express');
var authController = require('../controllers/auth')
var router = express.Router();
const jwt = require('jsonwebtoken')

router
    .route('/auth/register')
    .post(authController.register);



router
    .route('/auth/login')
    .post(authController.tokenizer);

require('./user')(router)


const checkAuth = (req,res,next)=>{
    if(!req.headers.token){
        res.send('unauthorized user')
    }
    else{
        jwt.verify(req.headers.token, 'supersecret', function(err, decoded){
        if(!err){

            next();
        } 
        else {
            res.send('unauthorized access');
        }
          })}}   

router.use(checkAuth)



require('./products')(router)

require('./reviews')(router)

router.all('*', function(req, res) {
    res.send("invalid url " + String(req.url));
  })


module.exports = router;
