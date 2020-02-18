const fs = require('fs');


exports.getUser = function(req,res){
    var id = Number(req.url.match(/(\d+)/)[0])
    var users = this.getUsers();
    setTimeout(function(){
    var ind=[]
    for(x of users){ind.push(x.id);}
    if(ind.indexOf(id) !== -1){
        res.writeHead(200,'OK');
        res.write(JSON.stringify(users[ind.indexOf(id)]));
        res.end();
    }
    else{
        res.writeHead(400,'ERROR');
        res.write('ID not Exist');
        res.end();
    }
    },200);
}


exports.deleteUser = function(req,res){
    var content;
    var id = Number(req.url.match(/(\d+)/)[0]) 
    var users = this.getUsers();
    setTimeout(function(){
    if(users!==false){

        var ind=[]
        var email = []
        for(x of users){ind.push(x.id);email.push(x.email)}
        if(ind.indexOf(id)=== -1){
        res.writeHead(400,'ERROR');
        res.write('ID not Exist');
        res.end();}
        else{
            users.splice(ind.indexOf(id), 1 );
            if(users.length >0){
                fs.writeFileSync('student.json',JSON.stringify(users,null,2));
            }
            else{
                fs.writeFileSync('student.json','');
            }
            res.writeHead(200,'OK');
            res.write('User Deleted');
            res.end();
            
        }
    }
    else{
        res.writeHead(400,'ERROR');
        res.write('Database Error');
        res.end();   
    }},200);
    
}





exports.updateUser = function(req,res){
    var content;
    var id = Number(req.url.match(/(\d+)/)[0]) 
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
        if(ind.indexOf(id)=== -1){
        res.writeHead(400,'ERROR');
        res.write('ID not Exist');
        res.end();}
        else{
            if(email.indexOf(content.email) !== -1 && email.indexOf(content.email) !== ind.indexOf(id)){
                res.writeHead(400,'ERROR');
                res.write('Email already Exist');
                res.end();}
            else{
                content.id = id;
                users.splice(ind.indexOf(id),1,content);
                fs.writeFileSync('student.json',JSON.stringify(users,null,2));
                res.writeHead(200,'OK');
                res.write('User Updated Successfully');
                res.end();
            }
            
        }
    }
    else{
        res.writeHead(400,'ERROR');
        res.write('Database Error');
        res.end();   
    }},200);
    
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
            fs.writeFileSync('student.json',JSON.stringify(users,null,2));
            res.writeHead(200,'OK');
            res.write('User Added Successfully');
            res.end();
        }
    }
    else{
        console.log(content);
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