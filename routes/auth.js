const express                                  =require('express');
const  router                                  =express.Router();
const {signup,signin,signinrequired,signout}   =require('../controllers/auth')


//validators
const {userSignUpValidator,userSignInValidator}=require('../validators/auth');
const {runvalidation}                          =require('../validators/index');

router.post("/signup",userSignUpValidator,runvalidation,signup);
router.post("/signin",userSignInValidator,runvalidation,signin);
router.get("/signout",signout);

// router.get("/secret",requireSignin,(req,res)=>{
//     res.send('secret')
// })
// router.get('/info',signin)

module.exports = router;