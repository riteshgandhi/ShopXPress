/**
 * CS602 Term Project ShopXpress
 * @author:         Ritesh Gandhi
 * @description:    Seeder class to insert required data
 * @version:        1 
 */

const productAPI = require('../models/API/productAPI');
const userAPI = require('../models/API/userAPI');

const createUsers = () => {
    userAPI.create('Admin', '', 'admin', 'admin', (err) => {
        if (!err) {
            console.log('added - user admin');
        } else {
            console.error(err.message);
        }
    });

    userAPI.create('Ritesh', 'Gandhi', 'riteshg', 'password', (err) => {
        if (!err) {
            console.log('added - user Ritesh Gandhi');
        } else {
            console.error(err.message);
        }
    });
}

const createProducts = () => {
    productAPI.add('NIKE Barcelona Home Messi Jersey 2017/2018 (Official Printing)', 
        'Barcelona Home Messi Jersey 2017 / 2018 (Official Printing)', '/public/images/products/messi-bar.jpg', 120, 100, (err) => {
            if (!err) {
                console.log('added - NIKE Barcelona Home Messi Jersey 2017/2018 (Official Printing)');
            } else {
                console.error(err.message);
            }
    });

    productAPI.add('NAT Juventus Home 7# Ronaldo Soccer Jersey New 2018/2019 Men\'s Jersey', 
        'NAT Juventus Home 7# Ronaldo Soccer Jersey New 2018/2019 Men\'s Jersey', '/public/images/products/juventus.jpg', 40, 100, (err) => {
            if (!err) {
                console.log('added - NAT Juventus Home 7# Ronaldo Soccer Jersey New 2018/2019 Men\'s Jersey');
            } else {
                console.error(err.message);
            }
        });

    productAPI.add('France National Team 10 MBAPPE Home Mens Soccer Jersey Color Blue', 
        'France National Team 10 MBAPPE Home Mens Soccer Jersey Color Blue', '/public/images/products/mbappe.jpg', 55.99, 100, (err) => {
            if (!err) {
                console.log('added - France National Team 10 MBAPPE Home Mens Soccer Jersey Color Blue');
            } else {
                console.error(err.message);
            }
        });

    productAPI.add('Messi #10 FC Barcelona 2017-2018 Youths Away Soccer Jersey & Socks Set', 
        'Messi #10 FC Barcelona 2017-2018 Youths Away Soccer Jersey & Socks Set', '/public/images/products/messi-bar1.jpg', 39.98, 100, (err) => {
            if (!err) {
                console.log('added - Messi #10 FC Barcelona 2017-2018 Youths Away Soccer Jersey & Socks Set');
            } else {
                console.error(err.message);
            }
        });

    productAPI.add('CR7 Cristiano Ronaldo #7 Jersey Gift Set Youth Real Black Dragon Jersey', 
        'CR7 Cristiano Ronaldo #7 Jersey Gift Set Youth Real Black Dragon Jersey', '/public/images/products/rma.jpg', 39.98, 100, (err) => {
            if (!err) {
                console.log('added - CR7 Cristiano Ronaldo #7 Jersey Gift Set Youth Real Black Dragon Jersey');
            } else {
                console.error(err.message);
            }
        });
};

module.exports = {
    createProducts,
    createUsers
}

createUsers()
createProducts();
