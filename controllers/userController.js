/**
 * CS602 Term Project ShopXpress
 * @author:         Ritesh Gandhi
 * @description:    Controller Class for User
 * @version:        1 
 */

const shared = require('../shared');
const userAPI = require('../models/API/userAPI');

/**
 * Method to render View to add new Customer
 * @param {HTTP request} req 
 * @param {HTTP response} res 
 * @param {next route} next 
 */
const showCreateUser = (req, res, next) => {
    let alert_warning = req.flash('error')[0];
    res.render('user/register', { title: "Register", alert_warning: alert_warning, noMessages: !alert_warning });
};

/**
 * Private method to save customer information to database
 * @param {HTTP request} req 
 * @param {HTTP response} res 
 * @param {next route} next 
 */
const create = (req, res, next) => {
    userAPI.create(req.body.firstName, req.body.lastName, req.body.userName, req.body.password, (err) => {
		if (err) {
            shared.logFlashError(req, `Unable to register user. Error: ${err.message}`);
            res.redirect('/user/create');
		} else {
            showSignin(req, res, next);
		}
    });
};

const showSignin = (req, res, next) => {
    let success = req.flash('success')[0];
    let failure = req.flash('error')[0];
    res.render('user/signin', { title: "User Sign in", alert_success: success, alert_warning: failure, noMessages: (!success && !failure) });
};

const signIn = (req, res, next) => {
    let userName = req.body.userName;
    let password = req.body.password;

    userAPI.findOne(userName, password, (err, user) => {
        if (err) {
            shared.logFlashError(req, `Unable to sign in. Error: ${err.message}`);
            res.redirect('/user/signin');
        } else {
            shared.connectUserSession(req, user);
            if (shared.isforceSignIn(req)) {
                req.session.forceSignIn = null;
                res.redirect('/cart/view');
            } else {
                shared.redirectHome(res);
            }
        }
    });
};

const signOut = (req, res, next) => {
    shared.disconnectUserSession(req);
    shared.redirectHome(res);
};

/**
 * Method to list all Customers
 * @param {HTTP request} req 
 * @param {HTTP response} res 
 * @param {next route} next 
 */
const userManager = (req, res, next) => {
    userAPI.findAll((err, users) => {
        if (err) {
            shared.showError(res, err.message);
        } else {
            res.render('admin/customerList', { title: "Customers", customerList: users });
        }
    });
};


// module exports
module.exports = {
    userManager,
    showCreateUser,
	create,
    showSignin,
    signIn,
    signOut
}