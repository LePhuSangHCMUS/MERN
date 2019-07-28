var express = require('express');
var router = express.Router();
const usersController = require('../../controllers/users')
//Passport
const passport = require('passport')


//@route POST api/users/register
//@desc Test post router
//@Access Public
router.post('/register', usersController.postRegister);


//@route POST api/users/login
//@desc  Login User/Returning JWT Token 
//@Access Public
router.post('/login', usersController.postLogin);


//@route POST api/users/current
//@desc  LReturn current user 
//@Access Private
//truoc khi la gi tren them middlw ware passport nua la xong
router.get('/current',
//Tac dung doc cokkie hoac session va phan gia de sever doi chieu voi du lieu
    passport.authenticate('jwt', { session: false }),
    usersController.getCurrent
)
module.exports = router;