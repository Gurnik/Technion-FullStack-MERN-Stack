const mongoose = require('mongoose');

let SubscribtionsSchema = new mongoose.Schema({
    movieID : String,
    memberID : String,
    date : String
});

const subscribtionsModel = mongoose.model('subscribtions', SubscribtionsSchema);

module.exports = subscribtionsModel;