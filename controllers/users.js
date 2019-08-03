const User = require('../models/User');
//Validatot
const validateRegisterInput = require('../validation/register')
const validateLoginInput = require('../validation/login')
//Tu dong sinh ra avatar dua vao email tim kiem tren mang
var gravatar = require('gravatar');
//hash password user bcryptjs
const bcryptjs = require('bcryptjs')

//Generate JWT Token
const jwt = require('jsonwebtoken');
//Passport
const passport = require('passport')
//@route POST api/users/register
//@desc Test post router
//@Access Public

module.exports.getCurrent = (req, res, next) => {
    //Moi lan request qua passport thi neu xac minh thanh cong thi user duoc gan vao req,user
    // res.json({user:req.user});
    //Chi gui mot so thong tin can thiet
    res.json({
        id: req.user._id,
        email: req.user.email,
        avatar: req.user.avatar
    })
}
module.exports.postRegister = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    //validation
    //Dung destructuring
    let { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({ email: email })
        .then(user => {
            //Status 4XX Client Side Error 
            //401:Not Authenticated
            //403: Not authorized
            if (user) {
                errors.email = 'Email already exists'
                res.status(400).json(errors)
            }
            else {
                const avatar='https://png.pngtree.com/svg/20161027/631929649c.svg'
                //Create new user
                const newUser = new User({
                    name: name,
                    email: email,
                    avatar: avatar,
                    password: password
                })
                //Hash password use bcryptjs
                bcryptjs.genSalt(10, (err, salt) => {
                    bcryptjs.hash(password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        //Gan lai password sau khi hash roi luu vao database
                        newUser.save()
                            .then(user => {
                                console.log('Create New User')
                                res.json({ createUser: true, user })
                            })
                            .catch(err => {
                                console.log(err)
                            })

                    })
                })

            }
        })
}

//@route POST api/users/login
//@desc  Login User/Returning JWT Token 
//@Access Public

module.exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    //validation LOGIN
    let { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    // Find User Email
    User.findOne({ email: email })
        .then(user => {
            //If not found
            if (!user) {
                errors.email='User not found'
                return res.status(404).json(errors);
            }
            //Find Check Password
            else {
                bcryptjs.compare(password, user.password)
                    .then(isMatch => {
                        if (isMatch) {
                            // res.json('Login Success');
                            //User Match

                            //TOKEN gom : Header - Payload - SecretKey
                            //Header :khai báo rằng đối tượng được mã hóa là 1 JWT (để phân biệt với JWS hay JWE), và chữ ký của nó sử dụng thuật toán mã hóa HMAC SHA-256.
                            //Payload : Thông tin truyền đi có thể là mô tả của 1 thực thể 

                            const payload = {
                                id: user._id,
                                name: user.name,
                                avatar: user.avatar
                            }
                            //Secret: Do minh tu dat dat o bien moi truong ENV
                            const SECRETKEY = process.env.SECRETKEY;

                            //Signature Token :  Ma Hoa Header+ Payload + Secret de tao ra token nen token cua thong tin nguoi dung duy nhat
                            //Gui token nay xuong client luu o cookie hoac localStoreage tuy
                            jwt.sign(payload, SECRETKEY, { expiresIn: "600000" }, (err, token) => {
                                //Pahi co tu khoa Bearer
                                res.json({ success: true, token: 'Bearer ' + token })//nguoi cam phieu bearer
                            })//600000 ms - 10phut



                        }
                        else {
                            errors.password='Password incorect'

                            res.status(400).json(errors);

                        }
                    })

            }
        })
}


