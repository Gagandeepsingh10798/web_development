const db  = require('../db'); 
const mongoose = require('mongoose');

var Schema = db.Schema({
  p_id: {type:String,require:true,trim:true},
  p_name: {type:String,require:true,trim:true},
  p_desc: {type:String,require:true,trim:true},
  p_image:{type:String,require:true},
  obj_id: {type:String,require:true,trim:true},
  reviews:{ type: Array}
});

// compile schema to model
module.exports = db.model('productData', Schema, 'products');