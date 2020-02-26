var db_product= require('../models/products')
var db_user= require('../models/user')
var jwt = require('jsonwebtoken')
var db_review = require('../models/reviews')
var Product = require('../models/products')


exports.create_product = (req,res)=>{
var u_id;
jwt.verify(req.headers.token,'supersecret',function(err,data){
  if(!err){
      u_id = data._id
  }
})

var content = JSON.parse(req.body.toString())



db_user.findOne({ _id: u_id}, function (err, docs) {
  if(docs !== null && docs !== undefined){


      var obj = new Product({
      p_id: content.p_id,
      p_name: content.p_name,
      p_desc: content.p_desc,
      p_image:content.p_image,
      user: u_id,
      reviews:[]

    })

    obj.save((err,data)=>{
      if(!err){
        res.send({"success":true,"status":200,"message":'product registered',"data":data})}
      else{res.send(err)}
    })
 }
  else{
    res.send({"success":false,"status":400,"message":'user not exist',"data":[]});
  }
})
}






exports.delete_product = (req,res)=>{
    
    var u_id = req.params.id
    db_product.deleteOne({_id: u_id},function (err, doc) {
           if (doc.deletedCount === 0) {

        res.send({"success":false,"status":400,"message":'product not exist',"data":u_id});

    } else {
       res.send({"success":true,"status":200,"message":'product deleted',"data":u_id});

    }
})}





exports.update_product = (req,res)=>{
    
    var pro_id = req.params.id
    var content = JSON.parse(req.body.toString())
    db_product.findOneAndUpdate({_id: pro_id },content,{new: true},function (err, doc) {
           if (doc === null) {

        res.send({"success":false,"status":400,"message":'product not exist',"data":content});

    } else {
       res.send({"success":true,"status":200,"message":'product updated',"data":doc});

    }
})}




exports.show_product = (req,res)=>{
    
    Product.
      find({}).
      populate('user').
      exec(function (err, doc) {
        res.send({"success":true,"status":200,"message":'product got',"data":doc});
      });
}



exports.show_one_product = (req,res)=>{
    
  var id = req.params.id
  Product.
    find({_id : id}).
    populate('user').
    exec(function (err, doc) {
      if(doc!==null && doc!==undefined ){
        db_review.find({p_id: doc['_id']},function(err,docss){
          if(docss.length){
            var z = []
            for(k of docss){
            var keys =['_id','review_id','review_message'],value = [k['_id'],k['review_id'],k['review_message']] ,obj={}
            keys.forEach(function (k, i) {
              obj[k] = value[i];
          })
        z.push(obj)}
            doc.reviews = z
            res.send({"success":true,"status":200,"message":'product got',"data":doc})
          }
          else{
            res.send({"success":true,"status":200,"message":'product got',"data":doc})
          }
        })
       }       
       else{
           res.send({"success":false,"status":400,"message":'no any product for this id',"data":[]})
       }
    });

}
