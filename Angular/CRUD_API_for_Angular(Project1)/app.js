try{
var express = require('express');
const bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var static = require('./static')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var reviewsRouter = require('./routes/reviews');
var cors = require('cors');
var app = express();
app.use(cors())
app.use(bodyParser.json())

app.use('/api/auth',static.validations.auth,indexRouter);




const checkAuth = (req,res,next)=>{
  if(!req.headers.token){
      res.send({"success":false,"status":static.status.UN_AUTHORIZED,"message":static.message.app.checkAuth,"data":{}})
  }
  else{
      jwt.verify(req.headers.token, 'supersecret', function(err, decoded){
      if(!err){

          next();
      } 
      else {
          res.send({"success":false,"status":static.status.UN_AUTHORIZED,"message":static.message.app.checkAuth,"data":{}});
      }
        })}}   

app.use(checkAuth)
app.use('/api/users',usersRouter);

app.use('/api/products',productsRouter);
app.use('/api/reviews',reviewsRouter);

//invalid url
app.all('*', function(req, res) {
  
    res.send({"success":false,"status":static.status.NOT_FOUND,"message":static.message.app.invalid + String(req.url),"data":{}});
  });

module.exports = app;

}
catch(err){
  console.log(err)
}