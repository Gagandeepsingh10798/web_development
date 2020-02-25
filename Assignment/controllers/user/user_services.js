const Bcrypt = require("bcryptjs");
var db = require('../../models/schemas/user_schema')
var db_product = require('../../models/schemas/product_schema')

var jwt = require('jsonwebtoken')

exports.users = (req,res)=>{
    

  
 db.find({},function(err,data){

  if(!err){
 res.send({"success":true,"status":200,"message":'all users',"data":data})
  }
  else{
    res.send({"success":false,"status":400,"message":'no any user',"data":[]})
  }

 })}

exports.delete_user = (req,res)=>{
    
  var u_id;
  jwt.verify(req.headers.token,'supersecret',function(err,data){
    if(!err){
        u_id = data._id
        db.deleteOne({_id: u_id},function (err, doc) {
          if (doc.deletedCount === 0) {

       res.send({"success":false,"status":400,"message":'user not exist',"data":data});

   } else {
      res.send({"success":true,"status":200,"message":'user deleted',"data":data});

   }
   
}) }})}




exports.update_user = (req,res)=>{
    
  var u_id;
  jwt.verify(req.headers.token,'supersecret',function(err,data){
    if(!err){
        u_id = data._id
    }
  })
    var content = JSON.parse(req.body.toString())
    db.findOneAndUpdate({_id: u_id},content,{new: true},function (err, doc) {
           if (doc === null) {

        res.send({"success":false,"status":400,"message":'user not exist',"data":u_id});

    } else {
       res.send({"success":true,"status":200,"message":'user updated',"data":doc});

    }
      });
      
   }
   
   
   
   
   
   

exports.get_user = (req,res)=>{
    
  var u_id;
  jwt.verify(req.headers.token,'supersecret',function(err,data){
    if(!err){
        u_id = data._id
    }
  })
    db.findOne({_id: u_id},function (err, data) {
    if (data === null) {

        res.send({"success":false,"status":400,"message":'user not exist',"data":u_id});

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
          res.send({"success":true,"status":200,"message":'get user',"data":data})
        }
        else{
          res.send({"success":true,"status":200,"message":'get user',"data":data})
        }
      })
       

    }
  });
      
   }