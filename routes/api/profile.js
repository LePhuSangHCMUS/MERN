var express = require('express');
var router = express.Router();
const profileController = require('../../controllers/profile');
const passport = require('passport')

//@route GET api/profile/
//@desc  Return Profile  user 
//@Access Private
//truoc khi la gi tren them middlw ware passport nua la xongrouter.get('/',
router.get('/', passport.authenticate('jwt', { session: false }),
    profileController.getProfile);
//@route POST api/profile/create
//@desc   Create Profile  user 
//@Access Private
router.post('/create',
    passport.authenticate('jwt', { session: false }),
    profileController.postProfile
);
//@route POST api/profile/create
//@desc  Update or Create Profile  user 
//@Access Private
router.post('/update',
    passport.authenticate('jwt', { session: false }),
    profileController.postUpdateProfile
);
//================GIONG MANG XA HOI FACEBOOK LAY THEO ID VA TEN
//@route GET api/profile/handle/:handle (Handle nhu ten duy nhat tren url)
//@desc  Return Profile handle
//@Access Public
router.get('/handle/:handle', profileController.getHandleProfile);


//@route GET api/profile/user/:userId (Handle nhu ten duy nhat tren url)
//@desc  Return Profile handle
//@Access Public
router.get('/user/:userId', profileController.getIdProfile);

//@route GET api/profile/all lay tat ca profile cua moi nguoi
//@desc  Return Profile all
//@Access Public
router.get('/all', profileController.getAllProfile);
//==============================ADD EXPERIENCE========================
//@route POST api/profile/experience 
//@desc  Add experience
//@Access Private
router.post('/experience',
    passport.authenticate('jwt', { session: false }),
    profileController.postAddExperience
);
router.post('/education',
    passport.authenticate('jwt', { session: false }),
    profileController.postAddEducation
);
//===============================DELETE EXPERIENCE AND EDUCATION
//@route DELTE api/profile/experience /:expId or eduId
//@desc  Add experience
//@Access Private
router.delete('/experience/:expId',
    passport.authenticate('jwt', { session: false }),
    profileController.deleteExperience
);
router.delete('/education/:eduId',
    passport.authenticate('jwt', { session: false }),
    profileController.deleteEducation
);

//=============================API DELETE PROFILE AND USER==================
//@route DELTE api/profile/
//@desc  Add experience
//@Access Private
router.delete('/',
    passport.authenticate('jwt', { session: false }),
    profileController.deleteProfile
);





module.exports = router;