const db  = require('./database'); 


var Schema = db.Schema({
  f_name: String,
  l_name: String,
  email: String,
  password:String,
  address:String,
  city:String,
  state:String,
  zipcode:String,
  country:String

});

// compile schema to model
var formData = db.model('formData', Schema, 'users');









exports.addUser = (req,res)=>{

  var content;
  content = req.body;
  setTimeout(() => {
    // a document instance
  var data = new formData(content);



  data.findOne({email: content.email}, function (err, docs) {
    if(err){
      data.save(function (err, data) {
        if (err) return console.error(err);
        res.send('data added successfully');
      });
        
    }
    else{
      res.send("email Already exist");
    }
  },200);
  
},200);}




exports.getUsers = (res)=>{
  
  setTimeout(() => {

  var ids; 
  formData.find(function (err, data) {
    if (err) return console.error(err);
    ids =  data;
  });
  setTimeout(() => {
    res.send(ids);},200);
  },200);
  
}