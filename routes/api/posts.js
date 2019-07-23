var express = require('express');
var router = express.Router();
const PostsController=require('../../controllers/posts')

/* GET home page. */
router.get('/test',PostsController.test );
module.exports = router;