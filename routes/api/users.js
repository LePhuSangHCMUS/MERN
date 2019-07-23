var express = require('express');
var router = express.Router();
const usersController=require('../../controllers/users')

//@route GET api/post/test
//@desc Test post router
//@Access Public
router.get('/test',usersController.test );
module.exports = router;