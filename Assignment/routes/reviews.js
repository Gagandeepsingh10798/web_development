const reviewController = require('../controllers/reviews')
module.exports = (router)=>{
router.post('/reviews/:p_id', function (req, res) {
  reviewController.create_review(req,res);
})
  
router.get('/reviews/:p_id', function (req, res) {
  reviewController.show_product_reviews(req,res);
})

router.delete('/reviews/:id', function (req, res) {
  reviewController.delete_review(req,res);
})

router.put('/reviews/:id', function (req, res) {
  reviewController.update_review(req,res);
})
}
