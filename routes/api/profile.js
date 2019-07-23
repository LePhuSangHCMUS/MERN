var express = require('express');
var router = express.Router();
const profileController=require('../../controllers/profile')

/* GET home page. */
router.get('/test',profileController.test );
module.exports = router;