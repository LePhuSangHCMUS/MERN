const express = require('express');
const app = express();
const usersRouter = require('./routes/api/users')
const profileRouter = require('./routes/api/profile')
const postsRouter = require('./routes/api/posts')


///Connnect DB
const connectMongooseDB = require('./utils/connectMongoose');
connectMongooseDB()
    .then(() => {
        console.log("Mongo Connected");
    })
    .catch(err => {
        console.log(err)
    });
///



app.get('/', (req, res, next) => {
    res.send('Hello World');
})
app.use('/api/users', usersRouter)
app.use('/api/profile', profileRouter)
app.use('/api/posts', postsRouter)


///Connect server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("SERVER RUNNING ON PORT : ", PORT)
});