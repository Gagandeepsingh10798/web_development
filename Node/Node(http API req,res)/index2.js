const http = require('http');
const fs = require('fs');
const port = 3000;
var _url,_method;








//  Functions
function getUsers(callback){
    var _users = [ ];
    var users;
    fs.readFile('index.json',function(err,data){
    if(!err){
        users = data.toString();
        callback(users,function ind(indexes,callback){
            for(var i=0;i<indexes.length;i++){
                if(i==(indexes.length-1)){_users.push(JSON.parse(users.slice(indexes[i],users.length)))}
                else{_users.push(JSON.parse(users.slice(indexes[i],indexes[i+1])))}
            }
            callback(_users)
        });
    }
    else{
        console.log('database error');
    }

});
   
    return _users;
    };






function _userId(_users,chunk){
    var ids = [];
    var emails = [];
    for(x of _users){
        ids.push(x.id);
        emails.push(x.email);
    }
    setTimeout(function () {
    if(ids.indexOf(chunk.id) !== -1 || emails.indexOf(chunk.email) !== -1){

        console.log('id or email already exist');

    } else{

       _users.push(chunk);

    }},100);
}




function updateUser(_users,chunk){
    var ids = [];
    var emails = [];
    for(x of _users){
        ids.push(x.id);
        emails.push(x.email);
    }
    setTimeout(function () {
        if(ids.indexOf(chunk.id) !== -1){
            if(emails.indexOf(chunk.email) !== -1 && emails.indexOf(chunk.email) !== ids.indexOf(chunk.id)){
                console.log('email already exist');
            }
            else{
            _users.splice(ids.indexOf(chunk.id),1,chunk);}
    
        } else{function ind(indexes){
            for(var i=0;i<indexes.length;i++){
                if(i==(indexes.length-1)){_users.push(JSON.parse(users.slice(indexes[i],users.length)))}
                else{_users.push(JSON.parse(users.slice(indexes[i],indexes[i+1])))}
            }
            show(_users);
            function show(_users){
                console.log(_users);
            }
        }
    
            console.log('id not exist');
    
        }},100);
}

function deleteUser(_users,chunk){
    var ids = [];
    for(x of _users){
        ids.push(x.id);
    }
    setTimeout(function () {
        if(ids.indexOf(chunk.id) !== -1){
    
            console.log('id not exist');
    
        } else{
    
            _users.splice(ids.indexOf(chunk.id), 1 );
    
        }},100);
}


function writeUsers(_users){
        fs.writeFile('index.json','',function(err,data){
            if(err){
                console.log(err);
            }});
        for(x of _users){
            fs.appendFile('index.json',JSON.stringify(x)+'\n',function(err,data){
            if(err){
                console.log(err);
            }});}};
//  Functions



// get users in _users

var _users = getUsers(function net(users,callback){
    indexes = [];
    for (var i = 0; i < users.length; i++) {
        var x = users.charAt(i);
        if(x=='{'){
            indexes.push(i);
        }
    }
    callback(indexes,function show(_users){
        console.log(_users);
    });
        });

// get users in _users










const server = http.createServer((req, res) => {
  _method = req.method;
  _url = req.url;
  console.log(_method);
  console.log(_url);
  






// ADD USER

    if(_method == 'POST' && _url=='/users'){
        req.on('data',(chunk)=>{
            var chunk = JSON.parse(chunk.toString());
            _userId(_users,chunk);
        });
        setTimeout(function () {
        writeUsers(_users);},200);
    };

// ADD USER



// DELETE USER

    if(_method == 'DELETE' && _url=='/users'){
        req.on('data',(chunk)=>{
            var chunk = parseInt(chunk.toString());
            deleteUser(_users,chunk);
        });
        setTimeout(function () {
            writeUsers(_users);},200);
    }

// DELETE USER




// UPDATE USER

if(_method == 'PUT' && _url=='/users'){
    req.on('data',(chunk)=>{
        var chunk = JSON.parse(chunk.toString());
        updateUser(_users,chunk);
    });
    setTimeout(function () {
        writeUsers(_users);},200);
}

// UPDATE USER





// SHOW USER

if(_method == 'GET' && typeof _url == '/users'){
    for(x of _users){
        if(_users.indexOf(x.id) !== -1){

        }
    }
}

// SHOW USER

















  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
});

server.listen(port, () => {
  console.log('server runnibg at 3000');
});