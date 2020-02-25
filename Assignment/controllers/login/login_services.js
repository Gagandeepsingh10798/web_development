const Bcrypt = require("bcryptjs");
var db = require('../../models/schemas/user_schema')
var jwt = require('jsonwebtoken')
var config = require('../../config/config.json')

exports.log_in = (req,res)=>{
  //jwt token authenticity


      
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
          console.log(Bcrypt.compare(content.password, docs.password))
          res.send({"success":true,"status":200,"message":"user login","data":content});
        }
       
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