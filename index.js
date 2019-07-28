const express = require('express');
const app = express();
require('dotenv').config()
//==========================APP================
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
//ROUTER
const usersRouter = require('./routes/api/users')
const profileRouter = require('./routes/api/profile')
const postsRouter = require('./routes/api/posts')
///
//============================================
//PASSPORT
const passport = require('passport');
//=======================================================
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
///Connnect DB First
const connectMongooseDB = require('./utils/connectMongoose');
connectMongooseDB()
    .then(() => {
        console.log("Mongo Connected");
    })
    .catch(err => {
        console.log(err)
    });
//===============PASSPORT
//Passport Middlware
app.use(passport.initialize());
//Passport Config (Local- Google - Facebook
require('./config/passport')(passport);


//API
app.use('/api/users', usersRouter)
app.use('/api/profile', profileRouter)
app.use('/api/posts', postsRouter)


///Connect server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("SERVER RUNNING ON PORT : ", PORT)
});