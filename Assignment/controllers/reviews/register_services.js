const Bcrypt = require("bcryptjs");
var db = require('../../models/schemas/user_schema')
var db_product = require('../../models/schemas/product_schema')

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
      if(!err){res.send({"success":true,"status":200,"message":'user registered',"data":content})}
      else{res.send({"success":false,"status":400,"message":err,"data":content})}
    })
  }
})

}



