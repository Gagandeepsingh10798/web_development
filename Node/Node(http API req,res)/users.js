const services = require('./services')

module.exports = {

requestHandler : function(req,res) {
    var _method = req.method
    var _url = req.url;
    if(_method == 'GET' && _url === '/users'){var users = services.getUsers()
                            if(users !== false ){services.resWithData(users,res)}
                            else{services.resWithDerror(res,400,'Database Error')}
                        }
    if(_method == 'POST' && _url === '/users'){services.addUser(req,res);}    
    if(_method == 'PUT' && _url.replace(/[0-9]/g, '') === '/users/id='){services.updateUser(req,res);}         
    if(_method == 'DELETE' && _url.replace(/[0-9]/g, '') === '/users/id='){services.deleteUser(req,res);}
    if(_method == 'GET' && _url.replace(/[0-9]/g, '') === '/users/id='){services.getUser(req,res);}
    }

}