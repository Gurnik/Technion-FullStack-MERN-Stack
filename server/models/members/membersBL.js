const MembersModel = require('./membersModel');

exports.getAllMembers = () => {
    return new Promise((resolve, reject) => {
        MembersModel.find({}, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    })
}

exports.getMember = (id) => {
    return new Promise((resolve, reject) => {
        MembersModel.findById(id, function (err, data) {
            if (err) {
                reject(err)
            }
            else {
                resolve(data);
            }
        });
    })
}

exports.addMember = (obj) => {
    return new Promise((resolve, reject) => {
        let member = new MembersModel({
            full_name : obj.full_name,
            email : obj.email,
            city : obj.city
        });

        member.save(function (err) {
            if (err) {
                reject(err)
            }
            else {
                resolve('Created');
            }
        })
    })
}

exports.updateMember = (id, obj) => {
    return new Promise((resolve, reject) => {
        MembersModel.findByIdAndUpdate(id,
            {
                full_name : obj.full_name,
                email : obj.email,
                city : obj.city
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

exports.deleteMember = (id) => {
    return new Promise((resolve, reject) => {
        MembersModel.findByIdAndDelete(id, function (err) {
            if (err) {
                reject(err)
            }
            else {
                resolve('Deleted');
            }
        })
    })
}