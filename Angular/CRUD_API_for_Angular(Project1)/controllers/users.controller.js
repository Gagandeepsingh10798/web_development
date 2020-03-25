try{
const Bcrypt = require("bcryptjs");
var db = require('../models/user')
var jwt = require('jsonwebtoken')
var static = require('../static')
const { check, validationResult } = require('express-validator');


var validator = (req)=>{
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    var keys = [];
    for(var k in req.body) keys.push(k);
    var vars = [];
    for(var k of errors.errors){ 
        vars.push(keys.includes(k.param))
    }
    if(vars.includes(true))
    {
    var msg = {
                  "msg":errors.errors[vars.indexOf(true)].msg,
                  "data":{
                            "value":errors.errors[0].value,
                            "param":errors.errors[0].param
                         }
              };
    return msg;}
    else{
      return false;
    }
  }
  else{
    return false;
  }
}


exports.users = (req,res)=>{
var u_id;
  jwt.verify(req.headers.token, 'supersecret', function(err, decoded){
    if(!err){
        u_id = decoded._id
    } 
      })
 db.find({ _id: { $ne: u_id } },function(err,data){

  if(!err){
 res.send({"success":true,"status":static.status.OK,"message":static.message.user.get_all[200],"data":data})
  }
  else{
    res.send({"success":false,"status":static.status.ERROR,"message":static.message.user.get_all[400],"data":[]})
  }

 })}

exports.delete_user = (req,res)=>{
    
  var u_id = req.params.id
  
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
  var val = validator(req)
  if( val != false){
    res.send({"success":false,"status":static.status.ERROR,"message":val.msg,"data":val.data})
  }
  else{
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
  }
   
   
   
  
  exports.update_userr = (req,res)=>{
    
    var u_id = req.params.id;
      var content = req.body
      db.find({ email: content.email },function(err,data){
      
        if(data.length == 0){

          db.findOneAndUpdate({_id: u_id},content,{new: true},function (err, doc) {
            if (doc === null) {
 
         res.send({"success":false,"status":static.status.ERROR,"message":static.message.user.update[400],"data":u_id});
 
     } else {
        res.send({"success":true,"status":static.status.OK,"message":static.message.user.update[200],"data":doc});
 
     }
       });
         
        }
        else{
          

          res.send({"success":false,"status":static.status.ERROR,"message":'email already exist ',"data":data})
          
  
        }
      
       })
      
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


   exports.get_userr = (req,res)=>{
    var u_id = req.params.id;
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