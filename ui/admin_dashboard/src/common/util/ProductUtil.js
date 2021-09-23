export default class ProductUtil {
    static updateProductData(productData) {
        if (productData) {
            productData.forEach(p => {
                if (p.description) {
                    try {
                        p.description = atob(p.description);
                    } catch {
                        console.error('error on product description data')
                    }
                }
            })
        }
    }
}