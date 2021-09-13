module.exports = class CategorySql {
    category;
    constructor(category) {
        this.category = category;
    }
    get() {
        return 'Select * from category';
    }
    put() {

    }
    post() {

    }
    delete() {

    }
}