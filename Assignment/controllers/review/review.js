var express = require('express');
var services = require('./review_services')
var router = express.Router();

router.post('/:p_id', function (req, res) {
services.create_review(req,res);
})
  
router.get('/:p_id', function (req, res) {
  services.show_product_reviews(req,res);
})

router.get('/delete/:p_id/:id', function (req, res) {
  services.delete_review(req,res);
})

router.get('/update/:p_id/:id', function (req, res) {
  services.update_review(req,res);
})
module.exports = router;
