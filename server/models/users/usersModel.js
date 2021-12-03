const mongoose = require('mongoose');

let UsersSchema = new mongoose.Schema({
    full_name : String,
    username : String,
    password : String
});

const usersModel = mongoose.model('users', UsersSchema);

module.exports = usersModel;