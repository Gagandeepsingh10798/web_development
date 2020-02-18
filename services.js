const fs = require('fs');


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

                        
exports.addUser = function(req,res){
    var content;
    var users = this.getUsers();
    content = req.on('data',function(chunk){
        content = JSON.parse(chunk.toString());
        return content;
    })
    setTimeout(function(){
    if(users!==false){

        var ind=[]
        var email = []
        for(x of users){ind.push(x.id);email.push(x.email)}
        if(ind.indexOf(content.id)!== -1 || email.indexOf(content.email)!== -1 ){
        res.writeHead(400,'ERROR');
        res.write('ID or Email Already Exist');
        res.end();}
        else{
            console.log(content);
            users.push(content);
            fs.writeFileSync('student.json',JSON.stringify(users));
            res.writeHead(200,'OK');
            res.write('User Added Successfully');
            res.end();
        }
    }
    else{
        fs.writeFileSync('student.json',JSON.stringify([content]));
        res.writeHead(200,'OK');
        res.write('User Added Successfully');
        res.end();   
    }},200);
    
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