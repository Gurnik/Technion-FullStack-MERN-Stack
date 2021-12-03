const moviesModel = require('./moviesModel');

exports.getAllMovies = () => {
    return new Promise((resolve, reject) => {
        moviesModel.find({}, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    })
}

exports.getMovie = (id) => {
    return new Promise((resolve, reject) => {
        moviesModel.findById(id, function (err, data) {
            if (err) {
                reject(err)
            }
            else {
                resolve(data);
            }
        });
    })
}

exports.addMovie = (obj) => {
    return new Promise((resolve, reject) => {
        let movie = new moviesModel({
            name : obj.name,
            premiered : obj.premiered,
            year_premiered : obj.premiered.slice(0, 4),
            genres : String(obj.genres).replace(" ", "").split(","),
            image_url : obj.image_url
        });

        movie.save(function (err) {
            if (err) {
                reject(err)
            }
            else {
                resolve('Created');
            }
        })
    })
}

exports.updateMovie = (id, obj) => {
    return new Promise((resolve, reject) => { 
        moviesModel.findByIdAndUpdate(id,
            {
                name : obj.name,
                premiered : obj.premiered,
                year_premiered : obj.premiered.slice(0, 4),
                genres : obj.genres.replace(" ", "").split(","),
                image_url : obj.image_url
            }, function (err) {
            if (err) {
                reject(err)
            }
            else {
                resolve('Updated');
            }
        })
    })
}

exports.deleteMovie = (id) => {
    return new Promise((resolve, reject) => {
        moviesModel.findByIdAndDelete(id, function (err) {
            if (err) {
                reject(err)
            }
            else {
                resolve('Deleted');
            }
        })
    })
}