module.exports = class AddtocartSql {
    // Add_to_cart;
    constructor(add_to_cart) {
        this.add_to_cart = add_to_cart;
    }
    get() {
     //   return "select * from add_to_cart where uid='"+uid+"';";
        return `select * from add_to_cart where uid = '${this.add_to_cart.uid}';`;
    }
    put() {

    }
    post() {

    }
    delete() {

    }
}