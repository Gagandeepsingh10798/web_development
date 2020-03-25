try{const express = require('express');
var router = express.Router();

var productController = require('../controllers/products.controller')


router.post('/', function (req, res) {
productController.create_product(req,res);
})
  
  
router.put('/:id', function (req, res) {
  productController.update_product(req,res);
})
  
router.delete('/:id', function (req, res) {
  productController.delete_product(req,res);
})
  
  
router.get('/:id', function (req, res) {
    productController.show_one_product(req,res);
  

})


router.get('/all/get', function (req, res) {
  productController.show_product(req,res);


})
  
module.exports = router;
}
catch(err){
  console.log(err)
}