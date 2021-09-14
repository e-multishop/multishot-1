module.exports = class ProductSql {
    // product;
    constructor(product) {
        this.product = product;
    }
    get() {

    }

    post() {
        return `INSERT INTO product(pid,category,title,price,price_without_embroidary,description,note,material,total_available,total_quantity,available,sku,status)VALUES(NULL,'${this.product.category}','${this.product.title}','${this.product.price}','${this.product.price_without_embroidary}','${this.product.description}','${this.product.note}','${this.product.material}','${this.product.total_available}','${this.product.total_quantity}','${this.product.available}','${this.product.sku}','${this.product.status}');`;
    }

    put() {

    }

    delete() {

    }
}