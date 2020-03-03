try{

var db = require('../models/user')
var jwt = require('jsonwebtoken')
var static = require('../static')
exports.users = (req,res)=>{
  
 db.find({},function(err,data){

  if(!err){
 res.send({"success":true,"status":static.status.OK,"message":static.message.user.get_all[200],"data":data})
  }
  else{
    res.send({"success":false,"status":static.status.ERROR,"message":static.message.user.get_all[400],"data":[]})
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

       res.send({"success":false,"status":static.status.ERROR,"message":static.message.user.delete[400],"data":[]});

   } else {
      res.send({"success":true,"status":static.status.OK,"message":static.message.user.delete[200],"data":crisp});

   }
   
}) }}




exports.update_user = (req,res)=>{
    
  var u_id;
  jwt.verify(req.headers.token, 'supersecret', function(err, decoded){
    if(!err){
        u_id = decoded._id
    } 
      })
    var content = req.body
    db.findOneAndUpdate({_id: u_id},content,{new: true},function (err, doc) {
           if (doc === null) {

        res.send({"success":false,"status":static.status.ERROR,"message":static.message.user.update[400],"data":u_id});

    } else {
       res.send({"success":true,"status":static.status.OK,"message":static.message.user.update[200],"data":doc});

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

        res.send({"success":false,"status":static.status.ERROR,"message":static.message.user.get[400],"data":[]});

    } else {
      
          res.send({"success":true,"status":static.status.OK,"message":static.message.user.get[200],"data":data})
    }
  });
      
   }

  }
  catch(err){
    console.log(err)
  }