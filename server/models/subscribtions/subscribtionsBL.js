const moviesBL = require('../movies/moviesBL');
const membersBL = require('../members/membersBL');
const subscribtionsModel = require('./subscribtionsModel');

exports.getAllSubscribtions = () => {
    return new Promise((resolve, reject) => {
        subscribtionsModel.find({}, async function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                const subscribtionsWithMemberName = await data.map(async (subscriber) => {
                    const member = await membersBL.getMember(subscriber.memberID);
                    const memberResponse = {
                        ...subscriber._doc,
                        full_name : member._doc.full_name,
                        email : member._doc.email,
                        city : member._doc.city
                    };
                   
                    const movie = await moviesBL.getMovie(subscriber._doc.movieID);
                   
                    const combinedResponse = {
                        ...memberResponse,
                        name : movie._doc.name,
                        year_premiered : movie._doc.year_premiered,
                        image_url : movie._doc.image_url
                    };
                   
                    return combinedResponse;
                });
              
                Promise.all(subscribtionsWithMemberName).then((values) => {
                    resolve(values);
                });
            }
        });
    })
}

exports.addSubscribtion = (obj) => {
    return new Promise((resolve, reject) => {
        let subscribtion = new subscribtionsModel({
            movieID : obj.movieID,
            memberID : obj.memberID,
            date : obj.date
        });

        subscribtion.save(function (err) {
            if (err) {
                reject(err)
            }
            else {
                resolve('Created');
            }
        })
    })
}

exports.deleteSubscribtion = (id) => {
    return new Promise((resolve, reject) => {
        subscribtionsModel.findByIdAndDelete(id, function (err) {
            if (err) {
                reject(err)
            }
            else {
                resolve('Deleted');
            }
        })
    })
}