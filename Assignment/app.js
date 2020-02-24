const bodyParser = require('body-parser');
const user = require('./controllers/user/user');
const login = require('./controllers/login/login');
const product = require('./controllers/products/product');
const review = require('./controllers/reviews/review');
module.exports = function(app) {


    app.use(bodyParser.text())

    app.use('/api/auth/register',user);
    app.use('/api/auth',login);


    const checkAuth = (req,res,next)=>{
        if(!req.headers.token){
          res.send('unauthorized user')
        }
        
          next();
    }
    app.use(checkAuth)
    app.use('/api/product',product);
    app.use('/api/review',review);

    //invalid url
    app.all('*', function(req, res) {
        res.send("invalid url " + String(req.url));
      });

}


