export default class ProductUtil {
    static updateProductData(productData) {
        if (productData) {
            productData.forEach(p => {
                if (p.description) {
                    p.description = atob(p.description);
                }
            })
        }
    }
}