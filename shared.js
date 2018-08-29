/**
 * CS602 Term Project ShopXpress
 * @author:         Ritesh Gandhi
 * @description:    Shared methods
 * @version:        1 
 */

 const cart = require('./models/schemas/shoppingCart');

const formatAmount = (data) => {
    return (data ? (data.toLocaleString('it-IT', {style: 'currency', currency: 'USD'})) : "0").trim();    
};

const getCurrentCart = (req) => {
    return new cart(req.session.currentCart ? req.session.currentCart : {}); 
};

const clearCart = (req) => {
    req.session.currentCart = null;
};

const connectUserSession = (req, user) => {
    req.session.currentUser = user;
    if ((req.session.currentUser.userName).toLocaleLowerCase() === "admin"){
        req.session.isAdminUser = true;
    }
};

const disconnectUserSession = (req) => {
    req.session.destroy();
};

const isforceSignIn = (req) => {
    return (req.session ? (req.session.forceSignIn ? true : false) : false);
};

const logFlashError = (req, message) => {
    req.flash('error', message);
};

const logFlashSuccess = (req, message) => {
    req.flash('success', message);
};

const redirectHome = (res) => {
    res.redirect('/');
}

const showIndex = (req, res, products) => {
    let success = req.flash('success')[0];
    let failure = req.flash('error')[0];
    res.render('index', { title: "Index", productList: products, alert_success: success, alert_warning: failure, noMessages: (!success && !failure) });
};

const showError = (res, errMessage) => {
    res.render('others/error', { errorMessage: errMessage });
};

const show404 = (res) => {
    return res.render('others/404');
}

module.exports = {
    formatAmount,
    clearCart,
    connectUserSession,
    disconnectUserSession,
    isforceSignIn,
    getCurrentCart,
    showError,
    show404,
    showIndex,
    logFlashError,
    logFlashSuccess,
    redirectHome
};