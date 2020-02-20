const bodyParser = require('body-parser');
const services = require('./Services');




module.exports = function(app) {

    app.use(bodyParser.urlencoded({ extended: true }))

    // get users from database
    app.get('/users', function (req, res) {
        
        services.getUsers(res);
    });
   // get users from database


    // add user to database
    app.post('/users', function (req, res) {
        
        services.addUser(req,res);
    });
   // add user to database
   
    app.all('*', function(req, res) {
        res.send("invalid url " + String(req.url));
      });

}


