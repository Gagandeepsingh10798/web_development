const Bcrypt = require("bcryptjs");
var db = require('../../models/schemas/user_schema')
var jwt = require('jsonwebtoken')
var config = require('../../config/config.json')

exports.log_in = (req,res,token)=>{
  //jwt token authenticity
  jwt.verify(token, 'supersecret', function(err, decoded){
    if(!err){

      
      var content = JSON.parse(req.body.toString())

      if(decoded.email === content.email){

      db.findOne({email: content.email}, function (err, docs) {
      if(docs === null){
        res.send('wrong email')
      }
      else{
        if(!Bcrypt.compareSync(content.password, docs.password)){
          res.send("wrong password")
         
        }
        else{
          console.log(Bcrypt.compare(content.password, docs.password))
          res.send("user login");
        }
       
      }
    })

  }
  else{

  res.send('wrong token sent')
  }


    } else {
      res.send('unauthorized access');
    }
  })


}



exports.tokenizer = (req,res)=>{
  var content = JSON.parse(req.body.toString())

  db.findOne({email: content.email}, function (err, docs) {
    if(docs === null){
      res.send('wrong email')
    }
    else{
      if(!Bcrypt.compareSync(content.password, docs.password)){
        res.send("wrong password")
       
      }
      else{
        console.log(Bcrypt.compare(content.password, docs.password))
        var token = jwt.sign(
          {"_id":docs._id,"email":docs.email,"password":docs.password,"f_name":docs.f_name,"l_name":docs.l_name}
          ,config[0].s_key,{expiresIn: 120});
        res.send(token)
      }
     
    }
  })

}