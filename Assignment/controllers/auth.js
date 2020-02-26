const Bcrypt = require("bcryptjs");
var db = require('../models/user');
var jwt = require('jsonwebtoken');
var config = require('../config/config.json');

exports.register = (req,res)=>{

  var content = JSON.parse(req.body.toString())

  db.findOne({email: content.email}, function (err, docs) {
  if(docs !== null){
    res.send({"success":false,"status":400,"message":'user already exist',"data":{}})
     
  }
  else{
    var obj = new db({
      f_name: content.f_name,
      l_name: content.l_name,
      email: content.email,
      password: Bcrypt.hashSync(content.password, 10),
      products:[]
    })
    obj.save((err,data)=>{
      if(!err){res.send({"success":true,"status":200,"message":'user registered',"data":obj})}
      else{res.send({"success":false,"status":400,"message":err,"data":obj})}
    })
  }
})

}


exports.tokenizer = (req,res)=>{
  var content = JSON.parse(req.body.toString())
  db.findOne({email: content.email}, function (err, docs) {
    if(docs === null){
      res.send({"success":false,"status":400,"message":'invalid credentials',"data":content})
    }
    else{
      if(!Bcrypt.compareSync(content.password, docs.password)){
        res.send({"success":false,"status":400,"message":'invalid credentials',"data":content})
       
      }
      else{
        var token = jwt.sign(
          {"_id":docs._id,"email":docs.email,"password":docs.password,"f_name":docs.f_name,"l_name":docs.l_name}
          ,config[0].s_key,{expiresIn: 12000});
        res.send({"success":true,"status":200,"message":"token generated","data":token})
      }
     
    }
  })

}