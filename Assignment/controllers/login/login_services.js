const Bcrypt = require("bcryptjs");
var db = require('../../models/schemas/user_schema')
var jwt = require('jsonwebtoken')


exports.log_in = (req,res,token)=>{


  //jwt token authenticity
  jwt.verify(token, 'supersecret', function(err, decoded){
    if(!err){
      
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
          res.send("user login");
        }
       
      }
    })




    } else {
      res.send('unauthorized access');
    }
  })


}