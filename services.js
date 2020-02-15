const fs = require('fs');

exports.addUser = function(req){
    var users = this.getUsers()
    if(users !== false){
        req.on('data',(chunk)=>{
            chunk = JSON.parse(chunk.toString())
            users = this._userId(users,chunk);
            });
            // if(users === false){
            //     users = 'id or email already exist';
            // }
            // });
        // setTimeout(function () {
        //     if(typeof users !== String){
        //         fs.writeFileSync('student.json',JSON.stringify(users));
        //         setTimeout(function () {return true},200); 
        //     }
        //     else{
        //         return users;
        //     }
                           
        //     },100);
    }
    else
    {
        var users=[];
        req.on('data',(chunk)=>{
            chunk = JSON.parse(chunk.toString())
            users = _userId(users,chunk).then(function(x) {
                return x;
              });;
            setTimeout(function () {console.log(users.toArray())},500);
        });
            // if(users === false){
            //     users = 'id or email already exist';
            // }
            // });
        // setTimeout(function () {
        //     if(typeof users !== String){
        //         fs.writeFileSync('student.json',JSON.stringify(users));
        //         setTimeout(function () {return true},200); 
        //     }
        //     else{
        //         return users;
        //     }
                           
        //     },100);
        
    }

}




exports.getUsers = function(){
    var users = fs.readFileSync('student.json').toString();
                if(users.length > 0)
                {
                    return JSON.parse(users);
                }
                else
                {
                    return false;
                }
                            }



_userId = function(users,chunk){
    var ids = [];
    var emails = [];
    if(users.length > 0){
    for(x of users){
        ids.push(x.id);
        emails.push(x.email);
    }
    }
    if(ids.indexOf(chunk.id) !== -1 || emails.indexOf(chunk.email) !== -1){
        return false;
    } else{
        users = users.concat(chunk)
        var promise = new Promise(function(resolve, reject) {
            setTimeout(function() {
              resolve(users);
            });
          });
        return promise;
         
    }
}



exports.resWithData = function(users,res)
{
    res.writeHead(200,'OK',{'Content-Type':'application/json'});
    res.write(JSON.stringify(users));
    res.end()
}


exports.resWithDerror = function(res,status,message)
{
    res.writeHead(status,'ERROR',{'Content-Type':'text/plain'});
    res.end(message);
}


exports.resWithMessage = function(res,status,message)
{
    res.writeHead(status,{'Content-Type':'text/plain'});
    res.end(message)
}