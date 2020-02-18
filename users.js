const services = require('./services')

module.exports = {

requestHandler : function(req,res) {
    var _method = req.method
    path = req.url;

    switch(path){
        case '/users': if(_method == 'GET'){
                                        var users = services.getUsers()
                                        if(users !== false ){
                                            services.resWithData(users,res)
                                        }
                                        else{
                                            services.resWithDerror(res,400,'Database Error')
                                        }
                                    }
                  if(_method == 'POST'){
                                        services.addUser(req,res);
                                    }         
        }
    }

}