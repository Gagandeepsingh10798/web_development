const bodyParser = require('body-parser');
const user = require('./controllers/user/user');
const login = require('./controllers/login/login');
const product = require('./controllers/products/product');
const review = require('./controllers/reviews/review');
module.exports = function(app) {


    app.use(bodyParser.text())

    app.use('/api/user',user);
    app.use('/api/auth',login);
    app.use('/api/product',product);
    app.use('/api/review',review);

    //invalid url
    app.all('*', function(req, res) {
        res.send("invalid url " + String(req.url));
      });

}


