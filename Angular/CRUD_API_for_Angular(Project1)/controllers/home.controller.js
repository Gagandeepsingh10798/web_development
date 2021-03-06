try{

var db_product= require('../models/products')
var db_user= require('../models/user')
var jwt = require('jsonwebtoken')
var db_review = require('../models/reviews')
var Product = require('../models/products')
var static = require('../static')

exports.create_product = (req,res)=>{
var u_id;
jwt.verify(req.headers.token,'supersecret',function(err,data){
  if(!err){
      u_id = data._id
  }
})

var content = req.body



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
        res.send({"success":true,"status":static.status.CREATED,"message":static.message.products.register[201],"data":data})}
      else{res.send(err)}
    })
 }
  else{
    res.send({"success":false,"status":static.status.ERROR,"message":static.message.products.register[400],"data":[]});
  }
})
}






exports.delete_product = (req,res)=>{
    
    var u_id = req.params.id
    db_product.deleteOne({_id: u_id},function (err, doc) {
           if (doc.deletedCount === 0) {

        res.send({"success":false,"status":static.status.ERROR,"message":static.message.products.delete[400],"data":u_id});

    } else {
       res.send({"success":true,"status":static.status.OK,"message":static.message.products.delete[200],"data":u_id});

    }
})}





exports.update_product = (req,res)=>{
    
    var pro_id = req.params.id
    var content = req.body
    db_product.findOneAndUpdate({_id: pro_id },content,{new: true},function (err, doc) {
           if (doc === null) {

        res.send({"success":false,"status":static.status.ERROR,"message":static.message.products.update[400],"data":content});

    } else {
       res.send({"success":true,"status":static.status.OK,"message":static.message.products.update[200],"data":doc});

    }
})}




exports.show_product = (req,res)=>{
    
    Product.
      find({}).
      populate('user').
      exec(function (err, doc) {
        res.send({"success":true,"status":static.status.OK,"message":static.message.products.get_all[200],"data":doc});
      });
}



exports.show_one_product = (req,res)=>{
    
  var id = req.params.id
  Product.
    find({}).
    populate('user').
    exec(function (err, docs) {
        // var zu;
        // for (zu = 0; zu < docs.length; zu++) {
            // doc = docs[zu]
      // if(doc!==null && doc!==undefined ){
        // db_review.find({p_id: doc['p_id']},function(err,docss){
            
          // if(docss.length){
            // var z = []
            // for(k of docss){
                // k = JSON.parse(JSON.stringify(k))
            // var keys =['_id','review_id','review_message','review_date'],value = [k['_id'],k['review_id'],k['review_message'],k['review_date']] 
            // var obj={}
            // keys.forEach(function (k, i) {
              // obj[k] = value[i];
         
          // })
        // z.push(obj)}
            // doc.reviews = z
            // console.log("ander vala",docs)
            // // console.log(docs[0])
            // // console.log(docs[0].reviews)
            // // res.send({"success":true,"status":static.status.OK,"message":static.message.products.get[200],"data":doc})
          // }
          // // else{
            // // // res.send({"success":true,"status":static.status.OK,"message":static.message.products.get[200],"data":doc})
            // // continue;
          // // }
        // })
       // }       
       // // else{
           // // // res.send({"success":false,"status":static.status.ERROR,"message":static.message.products.get[400],"data":[]})
           // // continue;
       // // }
        // }
        
        // setInterval(function() {
        // res.send({"success":true,"status":static.status.OK,"message":static.message.products.get[200],"data":docs})},10000);
        res.send({"success":true,"status":static.status.OK,"message":static.message.products.get[200],"data":docs})
    });

}
}
catch(err){
  console.log(err)
}