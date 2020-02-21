const db  = require('../db'); 


var Schema = db.Schema({
  f_name: {type:String,require:true,trim:true},
  l_name: {type:String,require:true,trim:true},
  email: {type:String,require:true,trim:true},
  password:{type:String,require:true,trim:true},
  products:{type:Array}
});

// compile schema to model
module.exports = db.model('formData', Schema, 'users');