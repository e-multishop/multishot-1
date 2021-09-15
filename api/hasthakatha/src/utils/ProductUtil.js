const btoa = require('btoa');
module.exports = class ProductUtil {
    static getTotalAvailable(data) {
        if (data === 0) {
            return 0;
        }
        return data ? parseInt(data) : -1;
    }
    static getProductDescription(data) {
        return data ? btoa(data) : '';
    }
    static getProductPrice(data) {
        if (data === 0) {
            return 0;
        }
        return data ? data : -1;
    }
}