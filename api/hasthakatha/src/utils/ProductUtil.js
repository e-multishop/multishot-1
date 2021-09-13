const atob = require('atob');
module.exports = class ProductUtil {
    static getTotalAvailable(data) {
        if (data === 0) {
            return 0;
        }
        return data ? parseInt(data) : -1;
    }
    static getProductDescription(data) {
        return data ? atob(data) : '';
    }
    static getProductPrice(data) {
        if (data === 0) {
            return 0;
        }
        return data ? data : -1;
    }
}