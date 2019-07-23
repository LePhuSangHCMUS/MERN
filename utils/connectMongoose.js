const MONGODB_URI = 'mongodb+srv://lephusangus:Nu06081995@cluster0-ydggi.mongodb.net/mern?retryWrites=true&w=majority';

//=======================MONGOOSE=================
var mongoose = require('mongoose');
module.exports = function mongooseConnect() {
    return mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
}