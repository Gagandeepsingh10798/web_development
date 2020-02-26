var db = require('../models/reviews')
var db_product = require('../models/products')


exports.create_review = (req,res)=>{

    var content = JSON.parse(req.body.toString())
    db_product.findOne({_id: req.params.p_id},function(err,docs){
    if(docs!== null){
    var obj = new db({
  review_message: content.review_message,
  p_id: req.params.p_id
})
    obj.save((err,data)=>{
      if(!err){res.send({"success":true,"status":200,"message":"review added","data":data})}
      else{res.send({"success":false,"status":400,"message":"review not added","data":[]})}
    })
    }
    else{
        res.send({"success":false,"status":400,"message":"product not exist","data":[]})
    }
  })
  
}

exports.update_review = (req,res)=>{
    
    var content = JSON.parse(req.body.toString())
    
    formData.findOneAndUpdate({_id:req.params.id},content,{new: true},function (err, doc) {
           if (doc === null) {

        res.send({"success":false,"status":400,"message":"product review or review id not exist","data":[]});

    } else {
       res.send({"success":true,"status":200,"message":"review updated","data":doc});
    }
    
})}

exports.delete_review = (req,res)=>{
    
    db.deleteOne({_id:req.params.id},function (err, doc) {
           if (doc.deletedCount === 0) {

        res.send({"success":false,"status":400,"message":"product review or review id not exist","data":[]});

    } else {
       res.send({"success":true,"status":200,"message":"review deleted","data":doc});

    }
    
})}



exports.show_product_reviews = (req,res)=>{
    
    var id = req.params.p_id
    db.find({p_id : id}).populate('p_id').
    exec(function (err, doc) {
        if(doc.length){
            res.send({"success":true,"status":200,"message":"review updated","data":doc})
        }       
        else{
            res.send({"success":false,"status":400,"message":"no review for this user product","data":[]})
        }
      });
       
    
    
}
