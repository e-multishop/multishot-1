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
    static readImages(result) {
        const resultConverted = [];
        if (result && result.length > 0) {
            result.forEach(r => {
                const outputData = r;
                if (outputData.image_data && outputData.image_data.buffer) {
                    const bufferData = Buffer.from(outputData.image_data, 'binary');
                    const image_data = bufferData.toString();
                    resultConverted.push({image_data});
                }
            })
        }
        return resultConverted;
    }
}