const CategorySql = require('./../sql/CategorySql');
const Category = require('./../models/Category');
module.exports = class HasthaBean {
    categoryList;
    constructor(con) {
        this.con = con;
        this.categoryList = [];
    }

    initialize() {
        // initialize category bean
        const categorySql = new CategorySql();
        const getQuery = categorySql.get();
        this.con.query(getQuery, (err, result) => {
            result.forEach(r => {
                const category = new Category(r.cid, r.name, r.description);
                this.categoryList.push(category);
            })
        });
    }

    getCategoryList() {
        return this.categoryList;
    }
}