const usersModel = require('./usersModel');

exports.getAllUsers = () => {
    return new Promise((resolve, reject) => {
        usersModel.find({}, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    })
}

exports.getUser = (username, password) => {
    return new Promise(async (resolve, reject) => {
        const user = await usersModel.findOne({username : username, password : password}).exec();
        if(user)
        {
            resolve({full_name : user.full_name});
        }
        else
        {
            reject({message : 'User Not Found'});
        }
    });
}

exports.addUser = (obj) => {
    return new Promise((resolve, reject) => {
        let user = new usersModel({
            full_name : obj.full_name,
            username : obj.username,
            password : obj.password,
        });

        user.save(function (err) {
            if (err) {
                reject(err)
            }
            else {
                resolve('Created');
            }
        })
    })
}