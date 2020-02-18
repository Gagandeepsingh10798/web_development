const services = require('./services')
const bodyParser = require('body-parser');

module.exports = function(app) {

    app.use(bodyParser.text());


    app.get('/users', function (req, res) {
        var users = services.getUsers()
        res.send(users)
    });
    app.post('/users', function (req, res) {
        services.addUser(req,res)
    });
    app.get('/users/:uid', function (req, res) {
        services.getUser(req,res)
    });

    app.put('/users/:uid', function (req, res) {
        services.updateUser(req,res)
    });

    app.delete('/users/:uid', function (req, res) {
        services.deleteUser(req,res)
    });

}


