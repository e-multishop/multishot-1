module.exports = class Product {
    // pid;
    // sku;
    // status;
    // available;
    // category;
    // title;
    // price;
    // price_without_embroidary;
    // description;
    // note;
    // material;
    // total_available;
    // total_quantity;
    constructor(pid, sku, status, available, category, title, price, price_without_embroidary, description, note, material, total_available, total_quantity) {
        this.pid = pid;
        this.sku = sku;
        this.status = status;
        this.available = available;
        this.category = category;
        this.title = title;
        this.price = price;
        this.price_without_embroidary = price_without_embroidary;
        this.description = description;
        this.note = note;
        this.material = material;
        this.total_available = total_available;
        this.total_quantity = total_quantity;
    }
}
