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


    
  formData.findOne({email: data.email}, function (err, docs) {
      console.log(docs)
    if(docs === null){
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
    res.send("all users are :  <br>"+ ids);},200);
  },200);
  
}




exports.updateUser = (req,res)=>{

  var content;
  content = req.body;
  setTimeout(() => {
    // a document instance

      formData.findOneAndUpdate({email: content.email},content,{new: true},function (err, doc) {
           if (doc === null) {

        res.send("email not exist");

    } else {
       res.send("user updated");

    }
      });
    
      

  
},200);}








exports.deleteUser = (req,res)=>{

  var content;
  content = req.body
  
  setTimeout(() => {
    // a document instance

      formData.deleteOne({email: content.email},function (err, doc) {
          console.log(doc);
           if (doc.deletedCount === 0) {

        res.send("email not exist");

    } else {
       res.send("user deleted");

    }
      });
    
      

  
},200);}