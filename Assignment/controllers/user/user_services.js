const Bcrypt = require("bcryptjs");
var db = require('../../models/schemas/user_schema')
var db_product = require('../../models/schemas/product_schema')

exports.register = (req,res)=>{

  var content = JSON.parse(req.body.toString())

  db.findOne({email: content.email}, function (err, docs) {
  if(docs !== null){
    res.send('email already used')
     
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
      if(!err){res.send('user registered')}
      else{res.send(err)}
    })
  }
})

}






exports.delete_user = (req,res)=>{
    
    var u_id = req.params.u_id;
    
    db.deleteOne({_id: u_id},function (err, doc) {
           if (doc.deletedCount === 0) {

        res.send("user not exist");

    } else {
       res.send("user deleted");

    }
    
})}




exports.update_user = (req,res)=>{
    
    var u_id = req.params.u_id;
    var content = JSON.parse(req.body.toString())
    db.findOneAndUpdate({_id: u_id},content,{new: true},function (err, doc) {
           if (doc === null) {

        res.send("user not exist");

    } else {
       res.send("user updated");

    }
      });
      
   }
   
   
   
   
   
   

exports.get_user = (req,res)=>{
    
    var u_id = req.params.u_id;
    db.findOne({_id: u_id},function (err, data) {
    if (data === null) {

        res.send("user not exist");

    } else {
      db_product.find({obj_id: u_id},function(err,docss){
        if(!err){
          var z = []
          for(k of docss){
          var keys =['_id','p_id'],value = [k['_id'],k['p_id']] ,obj={}
          keys.forEach(function (k, i) {
            obj[k] = value[i];
        })
        z.push(obj)
      }
          data.products = z
          res.send(data)
        }
        else{
          res.send(data)
        }
      })
       

    }
  });
      
   }