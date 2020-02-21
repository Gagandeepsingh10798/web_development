var express = require('express');
var services = require('./product_services')
var router = express.Router();



router.post('/:u_id', function (req, res) {
services.create_product(req,res);
})
  
  
router.post('/update/:id', function (req, res) {
services.update_product(req,res);
})
  
router.get('/delete/:id', function (req, res) {
services.delete_product(req,res);
})
  
  
router.get('/:id', function (req, res) {
  services.show_user_products(req,res);
})
  
module.exports = router;
