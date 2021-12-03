const mongoose = require('mongoose');

let MoviesSchema = new mongoose.Schema({
    name : String,
    premiered : String,
    year_premiered : String,
    genres : [String],
    image_url : String
});

const moviesModel = mongoose.model('movies', MoviesSchema);

module.exports = moviesModel;