try{const express = require('express');
var router = express.Router();

const reviewController = require('../controllers/reviews.controller')

router.post('/:p_id', function (req, res) {
  reviewController.create_review(req,res);
})
  
router.get('/:p_id', function (req, res) {
  reviewController.show_product_reviews(req,res);
})

router.delete('/:id', function (req, res) {
  reviewController.delete_review(req,res);
})

router.put('/:id', function (req, res) {
  reviewController.update_review(req,res);
})
module.exports = router;
}
catch(err){
  console.log(err)
}