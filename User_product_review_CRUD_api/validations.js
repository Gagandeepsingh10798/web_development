var st = {
  "status": {
              "OK":200,
              "CREATED":201,
              "UN_AUTHORIZED":401,
              "NOT_FOUND":404,
              "ERROR":400
  },
  "message":{
             "app":{
                      "checkAuth":"unauthorized access",
                      "invalid":"invalid url "
             },
             "auth":{
                      "register":{
                                    "400":"user already exist",
                                    "201":"user registered"
                                 },

                      "login":{
                                  "400":"invalid credentials",
                                  "200":"token generated"

                              }
                    },
            
             "user":{
                      "get_all":{
                              "200":"all users",
                              "400":"no any user"
                            },
                      "delete":{
                              "200":"user deleted",
                              "400":"user not exist"
                            },
                      "update":{
                              "200":"user updated",
                              "400":"user not exist"
                            },
                      "get":{
                              "200":"get user",
                              "400":"user not exist"
                            }
                    },
              "products":{
                      "register":{
                              "201":"product registered",
                              "400":"user not exist"
                            },
                      "delete":{
                              "200":"product deleted",
                              "400":"product not exist"
                            },
                      "update":{
                              "200":"product updated",
                              "400":"product not exist"
                            },
                      "get":{
                              "200":"product got",
                              "400":"no any product for this id"
                            },
                      "get_all":{
                              "200":"product got",
                              "400":"no any product"
                            }
                    },
              "review":{
                      "register":{
                              "201":"review added",
                              "400":{ "1":"review not added",
                                      "2":"product not exist"}
                                    },
                      "delete":{
                              "200":"review deleted",
                              "400":"product review or review id not exist"
                            },
                      "update":{
                              "200":"review updated",
                              "400":"product review or review id not exist"
                            },
                      "get":{
                              "200":"review updated",
                              "400":"no review for this user product"
                            }
                  
                    }
  },
  "validations":{
                        "auth":[
                                        check('email').isEmail(),
                                        check('f_name').isLength({ min: 3 }),
                                        check('l_name').isLength({ min: 3 }),
                                        check('password').isLength({ min: 9 }),

                               ]
                        
  }
}

module.exports = st