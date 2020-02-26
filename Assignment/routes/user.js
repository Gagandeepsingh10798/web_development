const userController = require('../controllers/user') 

module.exports = function(router) {


router.get('/user', function (req, res) {
    if(req.headers.token){
        userController.get_user(req,res)
    }
    else{
        userController.users(req,res)
    }
    
})
  
  
router.delete('/user', function (req, res) {
    userController.delete_user(req,res)
})


router.put('/user', function (req, res) {
    userController.update_user(req,res)
})
  
  
}
