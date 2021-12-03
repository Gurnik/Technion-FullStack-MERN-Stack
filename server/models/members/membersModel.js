const mongoose = require('mongoose');

let MembersSchema = new mongoose.Schema({
    full_name : String,
    email: String,
    city: String
});

const membersModel = mongoose.model('members', MembersSchema);

module.exports = membersModel;