/**
 * CS602 Term Project ShopXpress
 * @author:         Ritesh Gandhi
 * @description:    Helper methods for Handlebars
 * @version:        1 
 */

const shared = require('./shared');
module.exports = {
    applyNumberFormat: (data) => {
        return shared.formatAmount(data);
    }
}