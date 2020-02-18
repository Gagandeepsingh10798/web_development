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
    content = JSON.parse(req.body);
    setTimeout(function(){
    if(users!==false){
        console.log(content);
        var ind=[]
        var email = []
        for(x of users){ind.push(x.id);email.push(x.email)}
        if(ind.indexOf(content.id)!== -1 || email.indexOf(content.email)!== -1 ){
        res.send('ID or Email Already Exist');}
        else{
            console.log(content);
            users.push(content);
            fs.writeFileSync('student.json',JSON.stringify(users,null,2));
            res.send('User Added Successfully');
        }
    }
    else{
        console.log(content);
        fs.writeFileSync('student.json',JSON.stringify([content]));
        res.send('User Added Successfully');
    }},200);
    
}





exports.deleteUser = function(req,res){
    var content;
    var id = Number(req.params.uid)
    var users = this.getUsers();
    setTimeout(function(){
    if(users!==false){

        var ind=[]
        var email = []
        for(x of users){ind.push(x.id);email.push(x.email)}
        if(ind.indexOf(id)=== -1){
        res.send('ID not Exist');}
        else{
            users.splice(ind.indexOf(id), 1 );
            if(users.length >0){
                fs.writeFileSync('student.json',JSON.stringify(users,null,2));
            }
            else{
                fs.writeFileSync('student.json','');
            }
            res.send('User Deleted');
            
        }
    }
    else{
        res.send('Database Error');  
    }},200);
    
}






exports.updateUser = function(req,res){
    var content;
    var id = Number(req.params.uid)
    var users = this.getUsers();
    content = JSON.parse(req.body);
    setTimeout(function(){
    if(users!==false){

        var ind=[]
        var email = []
        for(x of users){ind.push(x.id);email.push(x.email)}
        if(ind.indexOf(id)=== -1){
        res.send('ID not Exist');}
        else{
            if(email.indexOf(content.email) !== -1 && email.indexOf(content.email) !== ind.indexOf(id)){
                res.send('Email already Exist');}
            else{
                content.id = id;
                users.splice(ind.indexOf(id),1,content);
                fs.writeFileSync('student.json',JSON.stringify(users,null,2));
                res.send('User Updated Successfully');
            }
            
        }
    }
    else{
        res.send('Database Error');
    }},200);
    
}





exports.getUser = function(req,res){
    var id = Number(req.params.uid)
    var users = this.getUsers();
    setTimeout(function(){
    var ind=[]
    for(x of users){ind.push(x.id);}
    if(ind.indexOf(id) !== -1){
        res.send(JSON.stringify(users[ind.indexOf(id)]));
    }
    else{
        res.send('ID not Exist');
       
    }
    },200);
}
