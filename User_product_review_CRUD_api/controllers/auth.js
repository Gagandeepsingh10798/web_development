try{

const Bcrypt = require("bcryptjs");
var db = require('../models/user');
var jwt = require('jsonwebtoken');
var config = require('../bin/config.json');
var static = require('../static')
exports.register = (req,res)=>{

  var content = req.body
  db.findOne({email: content.email}, function (err, docs) {
  if(docs !== null){
    res.send({"success":false,"status":static.status.ERROR,"message":static.message.auth.register[400],"data":{}})
     
  }
  else{
    var obj = new db({
      f_name: content.f_name,
      l_name: content.l_name,
      email: content.email,
      password: Bcrypt.hashSync(content.password, 10)
    })
    obj.save((err,data)=>{
      if(!err){res.send({"success":true,"status":static.status.CREATED,"message":static.message.auth.register[201],"data":obj})}
      else{res.send({"success":false,"status":static.status.ERROR,"message":err['errors']['l_name']['message'],"data":obj})}
    })
  }
})

}


exports.login = (req,res)=>{
  var content = req.body
  db.findOne({email: content.email}, function (err, docs) {
    if(docs === null){
      res.send({"success":false,"status":static.status.ERROR,"message":static.message.auth.login[400],"data":content})
    }
    else{
      if(!Bcrypt.compareSync(content.password, docs.password)){
        res.send({"success":false,"status":static.status.ERROR,"message":static.message.auth.login[400],"data":content})
       
      }
      else{
        var token = jwt.sign(
          {"_id":docs._id,"email":docs.email,"password":docs.password,"f_name":docs.f_name,"l_name":docs.l_name}
          ,config[0].s_key,{expiresIn: 12000});
        res.send({"success":true,"status":static.status.OK,"message":static.message.auth.login[200],"data":token})
      }
     
    }
  })

}
}
catch(err){
  console.log(err)
}