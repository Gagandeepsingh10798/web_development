var db = require('../models/user')
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
  jwt.verify(req.headers.token, 'supersecret', function(err, decoded){
    if(!err){
        u_id = decoded._id
    } 
      })
  
    if(u_id){
        var crisp;
        db.findOne({_id: u_id},function (err, data) {
          if (data === null) {
      
              crisp = [];
      
          } else {
            
             crisp = data;
          }
        });
        db.deleteOne({_id: u_id},function (err, doc) {
          if (doc.deletedCount === 0) {

       res.send({"success":false,"status":400,"message":'user not exist',"data":[]});

   } else {
      res.send({"success":true,"status":200,"message":'user deleted',"data":crisp});

   }
   
}) }}




exports.update_user = (req,res)=>{
    
  var u_id;
  jwt.verify(req.headers.token, 'supersecret', function(err, decoded){
    if(!err){
        u_id = decoded._id
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
  jwt.verify(req.headers.token, 'supersecret', function(err, decoded){
    if(!err){
        u_id = decoded._id
    } 
      })
    db.findOne({_id: u_id},function (err, data) {
    if (data === null) {

        res.send({"success":false,"status":400,"message":'user not exist',"data":[]});

    } else {
      
          res.send({"success":true,"status":200,"message":'get user',"data":data})
    }
  });
      
   }