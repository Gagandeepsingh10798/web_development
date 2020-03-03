try{
const db  = require('./db'); 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var productSchema = db.Schema({
  p_name: {type:String,required:true,trim:true},
  p_desc: {type:String,required:true,trim:true},
  p_image:{type:String,required:true},
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  reviews: {type: Array}
});


productSchema.set('toJSON', {
  transform: function(doc, ret, opt) {
      delete ret['reviews']
      return ret
  }
})
// compile schema to model
module.exports = db.model('Product', productSchema); }
catch(err){
  console.log(err)
}