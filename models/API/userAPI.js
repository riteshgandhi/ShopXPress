/**
 * CS602 Term Project ShopXpress
 * @author:         Ritesh Gandhi
 * @description:    User APIs
 * @version:        1 
 */

const userModel = require('../dbhelpers/mongodb-connect').getUserModel();

const create = (firstName, lastName, userName, password, callback) => {
    let user = new userModel({
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        password: password
    });
	user.save((err) => {
        callback(err);
	});
};

const getByID = (id, callback) => {
    userModel.findById(id, (err, user) => {
        if (!err) {
            if (!user){
                err = new Error('User not found');
            }
        }
        callback(err, user);
    });
};

const findOne = (userName, password, callback) => {
    userModel.findOne({userName: userName, password: password}, (err, user) => {
        if (err) {
            callback(err, null);
        }
        if (!user){
            err = new Error('User not found');
            callback(err, null);
        } else {
            callback(null, user);
        }
    });
};

const findAll = (callback) => {
	userModel.find({ userName: { $ne:"xpcadmin" }}, (err, users) => {
        if (err) {
            callback(err, null);
        } else {
            let results = users.map((user) => {
                return {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    userName: user.userName,
                    password: user.password
                }
            });
            callback(null, results);
        }
	});
};

module.exports = {
    create,
    findOne,
    findAll,
    getByID
}