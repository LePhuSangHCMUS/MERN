const Profile = require('../models/Profile');
const User = require('../models/User');
const validateProfileInput = require("../validation/profile")
const validateExperienceInput = require("../validation/experience")
const validateEducationInput = require("../validation/education")
const ObjectID = require('mongodb').ObjectID;


module.exports.getProfile = (req, res, next) => {
    //Sau khi qua passport thi se luu user vao req.user de biet them doc config/passort
    user = req.user;
    let errors = {};
    Profile.findOne({ userId: user._id })
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user';
                return res.status(404).json(errors)
            }
            res.json(profile)
        })
        .catch(err => res.status(404).json(err))
}
module.exports.postProfile = (req, res, next) => {
    //Sau khi qua passport thi se luu user vao req.user de biet them doc config/passort
    const user = req.user;
    //Get fields
    const profileFields = {};
    //cai nay chac chan phai co
    profileFields.userId = user._id;
    //Kiem tr cac truong nhap o form co co hay khong
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername) profileFields.githubusername = req.body.githubusername;
    ///Skill - Split into array - exists 
    if (req.body.skills.length !== 0) {
        profileFields.skills = req.body.skills.split(',');
    }
    //SOCIAL
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.twitter) profileFields.social.twitter = req.body.youtube;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.youtube;


    ///VALIDATOR
    //Khai bao erros va isValid dung destructuring
    let { errors, isValid } = validateProfileInput({ ...profileFields });
    //Neu co loi tuc isValid==false (khong rong) thi tra ve loi
    if (!isValid) {
        return res.status(400).json(errors);
    }







    //Education and Expirence de nguoi dung updata sau chi can nhung cai thong tin ca nhan dau tien thoi
    Profile.findOne({ userId: user._id })
        .then(profile => {
            //Profile already exists==> Update profile
            if (profile) {
                // Update profile
                console.log(profileFields)
                Profile.findOneAndUpdate({ userId: user._id }, { $set: profileFields }, { new: true })
                    .then(profileUpdate => {
                        res.json({ msg: 'Profile already updated', profileUpdate })
                    })
            }
            //Create
            else {
                //Check if handle exists
                Profile.findOne({ handle: profileFields.handle })
                    .then(profile => {
                        if (profile) {
                            errors.handle = 'That handle aleadey exists'
                            rs.status(400).json(errors)
                        }
                        //Create profile
                        else {
                            new Profile(profileFields)
                                .save()
                                .then(profile => {
                                    res.json(profile);
                                })
                        }
                    })
            }
        })

}
module.exports.getHandleProfile = (req, res, next) => {
    let errors = {};
    Profile.findOne({ handle: req.params.handle })
        //Lay luon thong tin ma useId references,phan [] la muon lay nhung gi
        .populate('userId', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'there is no profile for this user handle';
                return res.status(404).json(errors)
            }
            res.status(200).json(profile)
        })
}
module.exports.getIdProfile = (req, res, next) => {
    let errors = {};
    Profile.findOne({ userId: req.params.userId })
        //Lay luon thong tin ma useId references,phan [] la muon lay nhung gi
        .populate('userId', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'there is no profile for this user handle';
                return res.status(404).json(errors)
            }
            res.status(200).json(profile)
        })
        .catch(err => {
            //Truong hop id khong cast thanh HEX 24 ki tuj cung bi loi 
            errors.noprofile = 'there is no profile for this user handle';
            return res.status(404).json(errors)
        })
}
module.exports.getAllProfile = (req, res, next) => {
    let errors = {};
    Profile.find()
        //Lay luon thong tin ma useId references,phan [] la muon lay nhung gi
        .populate('userId', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'there is no profile for this user handle';
                return res.status(404).json(errors)
            }
            res.status(200).json(profile)
        })
        .catch(err => {
            //Truong hop id khong cast thanh HEX 24 ki tuj cung bi loi 
            errors.noprofile = 'there is no profile for this user handle';
            return res.status(404).json(errors)
        })
}


module.exports.postAddExperience = (req, res, next) => {
    const user = req.user;
    ///Check validation
    const { errors, isValid } = validateExperienceInput(req.body);
    if (!isValid) {
        return res.status(404).json({ errors });
    }
    Profile.findOne({ userId: user._id })
        .then(profile => {
            const newExp = {
                title: req.body.title,
                company: req.body.company,
                location: req.body.location,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
            }
            profile.experience.unshift(newExp);//Tren len dau con push tren vao cuoi
            profile.save()
                .then(newExp => {
                    res.json({ msg: 'Create Experience sussecc', newExp });
                })
                .catch(err => {
                    console.log(err)
                    errors.noexperience = 'Not add Eperience';
                    res.status(404).json(errors);
                })
        })
}

module.exports.postAddEducation = (req, res, next) => {
    const user = req.user;
    ///Check validation
    const { errors, isValid } = validateEducationInput(req.body);
    if (!isValid) {
        return res.status(404).json({ errors });
    }
    Profile.findOne({ userId: user._id })
        .then(profile => {
            //Neu la undefied se khong them hoac them gia tri mac dinh
            const newEdu = {
                school: req.body.school,
                degree: req.body.degree,
                fieldofstudy: req.body.fieldofstudy,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
            }
            profile.education.unshift(newEdu);//Tren len dau con push tren vao cuoi
            profile.save()
                .then(newEdu => {
                    res.json({ msg: 'Create Experience sussecc', newEdu });
                })
                .catch(err => {
                    console.log(err)
                    errors.noexperience = 'Not add Education';
                    res.status(404).json(errors);
                })
        })
}
module.exports.deleteExperience = (req, res, next) => {
    const expId = req.params.expId;
    const user = req.user;
    console.log(user)
    Profile.findOne({ userId: user._id })
        .then(profile => {
            const newExp = profile.experience.filter(ex => {
                return ex._id != expId//Dau != vi no la doi tuong ne khong so sanh kieu kia duoc
            })

            profile.experience = newExp;
            profile.save()
                .then(newProfile => {
                    res.send({ msg: 'delete Experience success', newProfile })
                })
        })
        .catch(err => {
            res.send({ msg: 'delete is wrong' })

        })

}
module.exports.deleteEducation = (req, res, next) => {
    const eduId = req.params.eduId;
    const user = req.user;
    console.log(user)
    Profile.findOne({ userId: user._id })
        .then(profile => {
            const newEdu = profile.education.filter(edu => {
                return edu._id != eduId//Dau != vi no la doi tuong ne khong so sanh kieu kia duoc
            })

            profile.education = newEdu;
            profile.save()
                .then(newProfile => {
                    res.send({ msg: 'delete Educaton success', newProfile })
                })
        })
        .catch(err => {
            res.send({ msg: 'Delete Educaton is wrong' })

        })
}

module.exports.deleteProfile = (req, res, next) => {
    const user = req.user;

    Profile.findOneAndDelete({ userId: user._id })
        .then(result => {
            User.findOneAndDelete({ _id: user._id })
                .then(result => {
                    res.json({msg:'Delete Profile AND User Success'})
                })
        })
}