
//=======================MONGOOSE=================
var mongoose = require('mongoose');
module.exports = function mongooseConnect() {
    return mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
}