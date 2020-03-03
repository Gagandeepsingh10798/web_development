try{
var db = require('../models/reviews')
var db_product = require('../models/products')
var static = require('../static')

exports.create_review = (req,res)=>{

    var content = req.body
    db_product.findOne({_id: req.params.p_id},function(err,docs){
    if(docs!== null){
    var obj = new db({
  review_message: content.review_message,
  p_id: req.params.p_id
})
    obj.save((err,data)=>{
      if(!err){res.send({"success":true,"status":static.status.CREATED,"message":static.message.review.register[201],"data":data})}
      else{res.send({"success":false,"status":static.status.ERROR,"message":static.message.review.register[400][1],"data":[]})}
    })
    }
    else{
        res.send({"success":false,"status":static.status.ERROR,"message":static.message.review.register[400][2],"data":[]})
    }
  })
  
}

exports.update_review = (req,res)=>{
    
    var content = req.body
    
    formData.findOneAndUpdate({_id:req.params.id},content,{new: true},function (err, doc) {
           if (doc === null) {

        res.send({"success":false,"status":static.status.ERROR,"message":static.message.review.update[400],"data":[]});

    } else {
       res.send({"success":true,"status":static.status.OK,"message":static.message.review.update[200],"data":doc});
    }
    
})}

exports.delete_review = (req,res)=>{
    
    db.deleteOne({_id:req.params.id},function (err, doc) {
           if (doc.deletedCount === 0) {

        res.send({"success":false,"status":static.status.ERROR,"message":static.message.review.delete[400],"data":[]});

    } else {
       res.send({"success":true,"status":static.status.OK,"message":static.message.review.delete[200],"data":doc});

    }
    
})}



exports.show_product_reviews = (req,res)=>{
    
    var id = req.params.p_id
    db.find({p_id : id}).populate('p_id').
    exec(function (err, doc) {
        if(doc.length){
            res.send({"success":true,"status":static.status.OK,"message":static.message.review.get[200],"data":doc})
        }       
        else{
            res.send({"success":false,"status":static.status.ERROR,"message":static.message.review.get[400],"data":[]})
        }
      });
       
    
    
}
}
catch(err){
  console.log(err)
}