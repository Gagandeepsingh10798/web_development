const bodyParser = require('body-parser');
const user = require('./controllers/user/user');
const register = require('./controllers/register/register');
const login = require('./controllers/login/login');
const product = require('./controllers/products/product');
const review = require('./controllers/reviews/review');
var jwt = require('jsonwebtoken')
module.exports = function(app) {


    app.use(bodyParser.text())

    app.use('/api/auth/register',register);
    app.use('/api/auth',login);
    app.use('/api/user',user);

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

    app.use(checkAuth)
    app.use('/api/products',product);
    app.use('/api/review',review);

    //invalid url
    app.all('*', function(req, res) {
        res.send("invalid url " + String(req.url));
      });

}


