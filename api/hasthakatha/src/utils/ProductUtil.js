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
    static readImages(result, keyName) {
        const resultConverted = [];
        if (result && result.length > 0) {
            result.forEach(r => {
                const outputData = r;
                const key = keyName ? keyName : 'image_data';
                if (outputData[key] && outputData[key].buffer) {
                    const bufferData = Buffer.from(outputData[key], 'binary');
                    const image_data = bufferData.toString();
                    resultConverted.push({image_data});
                }
            })
        }
        return resultConverted;
    }
}