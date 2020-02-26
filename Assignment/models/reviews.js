const db  = require('./db'); 
const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Schema = db.Schema({
  review_message: {type:String,require:true,trim:true},
  review_date: {type:Date,require:true,trim:true,default: Date.now},
  p_id: { type: Schema.Types.ObjectId, ref: 'Product'}
});

// compile schema to model
module.exports = db.model('Review', Schema);