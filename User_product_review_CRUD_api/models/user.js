try{const db  = require('./db'); 


var userSchema = db.Schema({
  f_name: {type:String,required:true,trim:true},
  l_name: {type:String,required:true,trim:true},
  email: {type:String,required:true,trim:true},
  password:{type:String,required:true,trim:true,}
});


userSchema.set('toJSON', {
  transform: function(doc, ret, opt) {
      // delete ret['password']
      return ret
  }
})


// compile schema to model
module.exports = db.model('User', userSchema); }
catch(err){
  console.log(err)
}