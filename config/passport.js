const User = require('../models/User');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRETKEY;
//Passport muc dich phan giai token de lay du lieu roi kiem tra trong database xem co user do khong roi cho pass
module.exports = (passport) => {
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        //Nam trong jwtpayload
        console.log(jwt_payload)
        User.findById(jwt_payload.id, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                //Luu user vao req.user
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        });
    }));
}
