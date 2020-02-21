var db_product= require('../../models/schemas/product_schema')
var db_user= require('../../models/schemas/user_schema')
var db_review= require('../../models/schemas/review_schema')






exports.create_product = (req,res)=>{

var u_id = req.params.u_id

var content = JSON.parse(req.body.toString())


db_product.findOne({p_id: content.p_id}, function (err, docs) {
    if(docs === null || docs === undefined){
db_user.findOne({ _id: u_id}, function (err, docs) {
  if(docs !== null && docs !== undefined){

    db_review.find({product_id: content.p_id},function(err, docs) {
    if(docs.length){
    var obj = new db_product({
      p_id: content.p_id,
      p_name: content.p_name,
      p_desc: content.p_desc,
      p_image:content.p_image,
      obj_id: req.params.u_id,
      reviews: docs
    })

    obj.save((err,data)=>{
      if(!err){res.send('product entered')}
      else{res.send(err)}
    })}
    else{
        var obj = new db_product({
      p_id: content.p_id,
      p_name: content.p_name,
      p_desc: content.p_desc,
      p_image:content.p_image,
      obj_id: req.params.u_id,
      reviews: []
    })

    obj.save((err,data)=>{
      if(!err){res.send('product entered')}
      else{res.send(err)}
    })
    }
      
  })}
  else{
    res.send("user not exist");
  }
})
    }
    else{
        res.send('product id already exist')
    }

})
}






exports.delete_product = (req,res)=>{
    
    var u_id = req.params.id
    db_product.deleteOne({p_id: u_id},function (err, doc) {
           if (doc.deletedCount === 0) {

        res.send("product not exist");

    } else {
       res.send("product deleted");

    }
})}





exports.update_product = (req,res)=>{
    
    var pro_id = req.params.id
    var content = JSON.parse(req.body.toString())
    db_product.findOneAndUpdate({p_id: pro_id },content,{new: true},function (err, doc) {
           if (doc === null) {

        res.send("product not exist");

    } else {
       res.send("product updated");

    }
})}




exports.show_user_products = (req,res)=>{
    
    var u_id = req.params.id
    db_product.find({obj_id : u_id},function(err,doc){
       if(doc.length){
           res.send(doc)
       }       
       else{
           res.send('no product for uthis user id')
       }
    })
    
}







